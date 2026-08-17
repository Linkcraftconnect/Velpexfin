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

        $statistics = [
            'customers' => User::where('role', 'customer')->count(),

            'administrators' => User::where('role', 'administrator')->count(),

            'balance' => User::where('role', 'customer')->sum('balance'),

            'transactions' => class_exists(\App\Models\Transaction::class)
                ? \App\Models\Transaction::count()
                : 0,
        ];

        return Inertia::render('Admin/Dashboard', [
            'statistics' => $statistics,
            'user' => $user,
        ]);
    }
}