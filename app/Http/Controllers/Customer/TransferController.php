<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
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
            return redirect()->route('customer.login');
        }

        $customer = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$customer) {
            $request->session()->forget('customer_id');

            return redirect()->route('customer.login');
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
                    'balance' => (float) ($customer->savings_balance ?? 0),
                ],
            ],

            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
            ],
        ]);
    }

    /**
     * Process a customer transfer.
     *
     * A valid 4-digit Transfer PIN is required.
     */
    public function store(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return back()->withErrors([
                'transfer_pin' =>
                    'Your customer session could not be verified. Please refresh this page and try again.',
            ]);
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

            'transfer_pin' => [
                'required',
                'digits:4',
            ],
        ], [
            'transfer_pin.required' =>
                'Your Transfer PIN is required to complete this transfer.',

            'transfer_pin.digits' =>
                'Your Transfer PIN must contain exactly 4 digits.',
        ]);

        $sender = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$sender) {
            return back()->withErrors([
                'transfer_pin' =>
                    'Your customer account could not be verified. Please refresh the page and try again.',
            ]);
        }

        if (empty($sender->transfer_pin)) {
            return back()->withErrors([
                'transfer_pin' =>
                    'A Transfer PIN has not been set for your account. Please contact Comericafin support.',
            ]);
        }

        try {
            $storedPin = Crypt::decryptString(
                $sender->transfer_pin
            );
        } catch (\Throwable $e) {
            return back()->withErrors([
                'transfer_pin' =>
                    'Your Transfer PIN could not be verified. Please contact Comericafin support.',
            ]);
        }

        if (!hash_equals(
            (string) $storedPin,
            (string) $validated['transfer_pin']
        )) {
            return back()->withErrors([
                'transfer_pin' =>
                    'The Transfer PIN you entered is incorrect.',
            ]);
        }

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
                    'The recipient account could not be found.',
            ]);
        }

        if ((int) $sender->id === (int) $recipient->id) {
            return back()->withErrors([
                'account_number' =>
                    'You cannot transfer funds to your own account.',
            ]);
        }

        if (
            strcasecmp(
                trim($recipient->name),
                trim($validated['recipient_name'])
            ) !== 0
        ) {
            return back()->withErrors([
                'recipient_name' =>
                    'The recipient name does not match the account.',
            ]);
        }

        $amount = (float) $validated['amount'];

        $sourceAccount = $validated['source_account'];

        $recipientAccount = $validated['account_type'];

        $senderBalance = $sourceAccount === 'checking'
            ? (float) $sender->balance
            : (float) ($sender->savings_balance ?? 0);

        if ($senderBalance < $amount) {
            $accountLabel = $sourceAccount === 'checking'
                ? 'checking'
                : 'savings';

            return back()->withErrors([
                'amount' =>
                    "Insufficient available balance in your {$accountLabel} account.",
            ]);
        }

        $transfer = DB::transaction(function () use (
            $sender,
            $recipient,
            $amount,
            $sourceAccount,
            $recipientAccount,
            $validated
        ) {
            if ($sourceAccount === 'checking') {
                $sender->balance =
                    (float) $sender->balance - $amount;
            } else {
                $sender->savings_balance =
                    (float) ($sender->savings_balance ?? 0) - $amount;
            }

            $sender->save();

            if ($recipientAccount === 'checking') {
                $recipient->balance =
                    (float) $recipient->balance + $amount;
            } else {
                $recipient->savings_balance =
                    (float) ($recipient->savings_balance ?? 0) + $amount;
            }

            $recipient->save();

            return Transfer::create([
                'sender_id' => $sender->id,

                'recipient_id' => $recipient->id,

                'amount' => $amount,

                'source_account' => $sourceAccount,

                'reference' =>
                    'TRX-' . strtoupper(Str::random(12)),

                'status' => 'completed',

                'description' =>
                    $validated['description'] ?? null,
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
    public function complete(
        Request $request,
        Transfer $transfer
    ) {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            abort(401, 'Customer session could not be verified.');
        }

        if ((int) $transfer->sender_id !== (int) $customerId) {
            abort(403);
        }

        $transfer->load([
            'sender',
            'recipient',
        ]);

        return Inertia::render(
            'Customers/TransferComplete',
            [
                'transfer' => [
                    'id' => $transfer->id,

                    'recipient_name' =>
                        $transfer->recipient?->name,

                    'recipient_account' =>
                        $transfer->recipient?->account_number,

                    'bank_name' =>
                        'Comericafin',

                    'amount' =>
                        $transfer->amount,

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
            ]
        );
    }
}