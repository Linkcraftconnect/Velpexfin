<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransferController extends Controller
{
    /**
     * Show the transfer form.
     */
    public function create(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        $customer = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$customer) {
            $request->session()->forget('customer_id');

            return redirect()->route('login');
        }

        return Inertia::render('Customers/Transfer', [
            'accounts' => [
                [
                    'type' => 'checking',
                    'label' => 'Checking Account',
                    'balance' => (float) $customer->balance,
                ],
                [
                    'type' => 'savings',
                    'label' => 'Savings Account',
                    'balance' => (float) $customer->savings_balance,
                ],
            ],
        ]);
    }

    /**
     * Process a customer-to-customer transfer.
     *
     * source_account:
     *   checking = sender->balance
     *   savings  = sender->savings_balance
     *
     * account_type:
     *   checking = recipient->balance
     *   savings  = recipient->savings_balance
     */
    public function store(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'source_account' => [
                'required',
                'in:checking,savings',
            ],

            'recipient_name' => [
                'required',
                'string',
                'max:255',
            ],

            'bank_name' => [
                'required',
                'string',
                'max:255',
            ],

            'routing_number' => [
                'required',
                'digits:9',
            ],

            'account_number' => [
                'required',
                'string',
                'max:255',
            ],

            'account_type' => [
                'required',
                'in:checking,savings',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'description' => [
                'nullable',
                'string',
                'max:500',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Comericafin destination only
        |--------------------------------------------------------------------------
        */

        if ($validated['bank_name'] !== 'Comericafin') {
            return back()->withErrors([
                'bank_name' =>
                    'This transfer destination requires a Transfer PIN.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Find sender
        |--------------------------------------------------------------------------
        */

        $sender = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$sender) {
            $request->session()->forget('customer_id');

            return redirect()->route('login');
        }

        /*
        |--------------------------------------------------------------------------
        | Find recipient
        |--------------------------------------------------------------------------
        */

        $recipient = User::where(
                'account_number',
                $validated['account_number']
            )
            ->where(
                'routing_number',
                $validated['routing_number']
            )
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$recipient) {
            return back()->withErrors([
                'account_number' =>
                    'The Comericafin account could not be found.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent self-transfer
        |--------------------------------------------------------------------------
        */

        if ((int) $sender->id === (int) $recipient->id) {
            return back()->withErrors([
                'account_number' =>
                    'You cannot transfer funds to your own account.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Verify recipient name
        |--------------------------------------------------------------------------
        */

        if (
            strcasecmp(
                trim($recipient->name),
                trim($validated['recipient_name'])
            ) !== 0
        ) {
            return back()->withErrors([
                'recipient_name' =>
                    'The recipient name does not match the Comericafin account.',
            ]);
        }

        $amount = (float) $validated['amount'];

        $sourceAccount = $validated['source_account'];
        $recipientAccount = $validated['account_type'];

        /*
        |--------------------------------------------------------------------------
        | Read ONLY the selected sender account
        |--------------------------------------------------------------------------
        */

        $senderBalance = $sourceAccount === 'checking'
            ? (float) $sender->balance
            : (float) $sender->savings_balance;

        if ($senderBalance < $amount) {
            $accountLabel = $sourceAccount === 'checking'
                ? 'checking'
                : 'savings';

            return back()->withErrors([
                'amount' =>
                    "Insufficient available balance in your {$accountLabel} account.",
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Complete transfer
        |--------------------------------------------------------------------------
        */

        $transfer = DB::transaction(function () use (
            $sender,
            $recipient,
            $amount,
            $sourceAccount,
            $recipientAccount,
            $validated
        ) {
            /*
            |--------------------------------------------------------------------------
            | Deduct from ONLY the selected sender account
            |--------------------------------------------------------------------------
            */

            if ($sourceAccount === 'checking') {
                $sender->balance = (float) $sender->balance - $amount;
            } else {
                $sender->savings_balance =
                    (float) $sender->savings_balance - $amount;
            }

            $sender->save();

            /*
            |--------------------------------------------------------------------------
            | Credit ONLY the selected recipient account
            |--------------------------------------------------------------------------
            */

            if ($recipientAccount === 'checking') {
                $recipient->balance =
                    (float) $recipient->balance + $amount;
            } else {
                $recipient->savings_balance =
                    (float) $recipient->savings_balance + $amount;
            }

            $recipient->save();

            /*
            |--------------------------------------------------------------------------
            | Record transaction
            |--------------------------------------------------------------------------
            */

            return Transfer::create([
                'sender_id' => $sender->id,
                'recipient_id' => $recipient->id,
                'amount' => $amount,
                'source_account' => $sourceAccount,
                'reference' => 'TRX-' . strtoupper(Str::random(12)),
                'status' => 'completed',
                'description' => $validated['description'] ?? null,
            ]);
        });

        return redirect()->route(
            'customer.transfer.complete',
            $transfer->id
        );
    }

    /**
     * Show completed transfer.
     */
    public function complete(Request $request, Transfer $transfer)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        /*
        |--------------------------------------------------------------------------
        | Only the sender can see this completion page
        |--------------------------------------------------------------------------
        */

        if ((int) $transfer->sender_id !== (int) $customerId) {
            abort(403);
        }

        $transfer->load([
            'sender',
            'recipient',
        ]);

        return Inertia::render('Customers/TransferComplete', [
            'transfer' => [
                'id' => $transfer->id,

                'recipient_name' =>
                    $transfer->recipient?->name,

                'recipient_account' =>
                    $transfer->recipient?->account_number,

                'bank_name' => 'Comericafin',

                'amount' => $transfer->amount,

                'source_account' =>
                    $transfer->source_account,

                'reference' =>
                    $transfer->reference,

                'status' =>
                    $transfer->status,

                'description' =>
                    $transfer->description,

                'created_at' =>
                    $transfer->created_at?->format(
                        'M d, Y h:i A'
                    ),
            ],
        ]);
    }
}