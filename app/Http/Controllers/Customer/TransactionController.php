<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        $transactions = Transfer::with(['sender', 'recipient'])
            ->where(function ($query) use ($customerId) {
                $query->where('sender_id', $customerId)
                    ->orWhere('recipient_id', $customerId);
            })
            ->latest()
            ->get();

        return Inertia::render('Customers/Transactions', [
            'transactions' => $transactions,
            'customerId' => $customerId,
        ]);
    }
}