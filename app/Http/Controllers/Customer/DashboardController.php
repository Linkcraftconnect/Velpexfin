<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('customer.login');
        }

        // Always load fresh customer data directly from the database.
        $user = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$user) {
            $request->session()->forget('customer_id');

            return redirect()->route('customer.login');
        }

        // Get the most recent transfers for the dashboard.
        $transfers = Transfer::where(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                    ->orWhere('recipient_id', $user->id);
            })
            ->with([
                'sender:id,name',
                'recipient:id,name',
            ])
            ->latest()
            ->take(5)
            ->get();

        $transactions = $transfers->map(function ($transfer) use ($user) {
            $isCredit = (int) $transfer->recipient_id === (int) $user->id;

            return [
                'id' => $transfer->id,
                'type' => $isCredit ? 'credit' : 'debit',
                'amount' => (float) $transfer->amount,
                'status' => $transfer->status,
                'description' => $transfer->description,
                'reference' => $transfer->reference,
                'sender_name' => $transfer->sender?->name,
                'recipient_name' => $transfer->recipient?->name,
                'created_at' => $transfer->created_at,
            ];
        })->values();

        return Inertia::render('Customers/Dashboard', [
            // Fresh database values
            'user' => $user,

            // Fresh transaction data
            'transactions' => $transactions,
        ]);
    }
}