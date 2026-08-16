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
     * Show transfer form.
     */
    public function create(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        return Inertia::render('Customers/Transfer');
    }

    /**
     * Process Comericafin transfer.
     */
    public function store(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'recipient_name' => ['required', 'string', 'max:255'],
            'bank_name' => ['required', 'string', 'max:255'],
            'routing_number' => ['required', 'digits:9'],
            'account_number' => ['required', 'string', 'max:255'],
            'account_type' => ['required', 'in:checking,savings'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Only Comericafin transfers can continue
        |--------------------------------------------------------------------------
        */

        if ($validated['bank_name'] !== 'Comericafin') {
            return back()->withErrors([
                'bank_name' => 'This transfer destination requires a Transfer PIN.',
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
            return redirect()->route('login');
        }

        /*
        |--------------------------------------------------------------------------
        | Find recipient
        |--------------------------------------------------------------------------
        */

        $recipient = User::where('account_number', $validated['account_number'])
            ->where('routing_number', $validated['routing_number'])
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$recipient) {
            return back()->withErrors([
                'account_number' => 'The Comericafin account could not be found.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent sending to yourself
        |--------------------------------------------------------------------------
        */

        if ($sender->id === $recipient->id) {
            return back()->withErrors([
                'account_number' => 'You cannot transfer funds to your own account.',
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

        /*
        |--------------------------------------------------------------------------
        | Check balance
        |--------------------------------------------------------------------------
        */

        $amount = (float) $validated['amount'];

        if ((float) $sender->balance < $amount) {
            return back()->withErrors([
                'amount' => 'Insufficient available balance.',
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
            $validated
        ) {
            $sender->balance = (float) $sender->balance - $amount;
            $sender->save();

            $recipient->balance = (float) $recipient->balance + $amount;
            $recipient->save();

            return Transfer::create([
                'sender_id' => $sender->id,
                'recipient_id' => $recipient->id,
                'amount' => $amount,
                'reference' => 'TRX-' . strtoupper(Str::random(12)),
                'status' => 'completed',
                'description' => $validated['description'] ?? null,
            ]);
        });

        /*
        |--------------------------------------------------------------------------
        | Go to transfer completion screen
        |--------------------------------------------------------------------------
        */

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
        | Make sure this transfer belongs to the logged-in customer
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
                'recipient_name' => $transfer->recipient?->name,
                'recipient_account' => $transfer->recipient?->account_number,
                'bank_name' => 'Comericafin',
                'amount' => $transfer->amount,
                'reference' => $transfer->reference,
                'status' => $transfer->status,
                'description' => $transfer->description,
                'created_at' => $transfer->created_at?->format('M d, Y h:i A'),
            ],
        ]);
    }
}