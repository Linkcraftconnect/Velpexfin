<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Super Administrator
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'super_admin') {

            $statistics = [
                'customers' => User::where('role', 'customer')->count(),

                'administrators' => User::where(
                    'role',
                    'administrator'
                )->count(),

                'balance' => User::where(
                    'role',
                    'customer'
                )->sum('balance'),

                'transactions' => class_exists(
                    \App\Models\Transaction::class
                )
                    ? \App\Models\Transaction::count()
                    : 0,
            ];

        } else {

            /*
            |--------------------------------------------------------------------------
            | Regular Administrator
            |--------------------------------------------------------------------------
            |
            | Only customers belonging to this administrator are counted.
            | Administrator count is hidden.
            |
            */

            $customersQuery = User::where('role', 'customer')
                ->where('admin_id', $user->id);

            $transactionCount = 0;

            if (class_exists(\App\Models\Transaction::class)) {

                $transactionCount = \App\Models\Transaction::where(
                    function ($query) use ($user) {

                        $query->whereHas(
                            'sender',
                            function ($q) use ($user) {
                                $q->where('admin_id', $user->id);
                            }
                        )->orWhereHas(
                            'recipient',
                            function ($q) use ($user) {
                                $q->where('admin_id', $user->id);
                            }
                        );

                    }
                )->count();
            }

            $statistics = [
                // Only this administrator's customers
                'customers' => (clone $customersQuery)->count(),

                // Hidden from regular administrators
                'administrators' => null,

                // Only this administrator's customer balances
                'balance' => (clone $customersQuery)->sum('balance'),

                // Only this administrator's transactions
                'transactions' => $transactionCount,
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'statistics' => $statistics,
            'user' => $user,
        ]);
    }
}