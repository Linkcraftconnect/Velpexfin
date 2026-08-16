<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        $customer = User::where('id', $customerId)
            ->where('role', 'customer')
            ->first();

        dd([
            'customer_id' => $customerId,
            'customer' => $customer?->toArray(),
            'all_transfers' => Transfer::latest()
                ->take(10)
                ->get()
                ->toArray(),
        ]);

        if (!$customer) {
            return redirect()->route('login');
        }

        /*
        |--------------------------------------------------------------------------
        | Recent Activity
        |--------------------------------------------------------------------------
        | Only get transfers where this customer is either:
        | - the sender
        | - or the recipient
        |--------------------------------------------------------------------------
        */

        $transactions = Transfer::with([
            'sender:id,name',
            'recipient:id,name',
        ])->where(function ($query) use ($customerId) {
            $query->where('sender_id', $customerId)
                  ->orWhere('recipient_id', $customerId);
        })->latest()->take(10)->get();dd([
            'customer_id' => $customerId,
            'transactions_found' => $transactions->count(),
            'transactions' => $transactions->toArray(),
        ]);

        return Inertia::render('Customers/Dashboard', [
            'user' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'account_number' => $customer->account_number,
                'routing_number' => $customer->routing_number,
                'balance' => $customer->balance,
                'savings_balance' => $customer->savings_balance,
                'profile_picture' => $customer->profile_picture,
            ],

            'transactions' => $transactions,
        ]);
    }
}