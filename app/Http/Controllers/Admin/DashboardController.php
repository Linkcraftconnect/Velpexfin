<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'user' => Auth::user(),
            'statistics' => [
                'customers' => 0,
                'administrators' => 0,
                'balance' => 0,
                'transactions' => 0,
            ],
        ]);
    }
}