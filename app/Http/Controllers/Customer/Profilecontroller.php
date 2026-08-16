<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('login');
        }

        $customer = User::where('id', $customerId)
            ->where('role', 'customer')
            ->first();

        if (!$customer) {
            $request->session()->forget('customer_id');

            return redirect()->route('login');
        }

        return Inertia::render('Customers/Profile', [
            'user' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'account_number' => $customer->account_number,
                'routing_number' => $customer->routing_number,
                'balance' => $customer->balance,
                'savings_balance' => $customer->savings_balance,
                'status' => $customer->status,
                'role' => $customer->role,
                'profile_picture' => $customer->profile_picture,
            ],
        ]);
    }
}