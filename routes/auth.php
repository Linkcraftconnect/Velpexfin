<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Customer Authentication
|--------------------------------------------------------------------------
|
| The customer login form lives directly on the Welcome page.
| There is no separate /login page.
|
*/

/*
|--------------------------------------------------------------------------
| Customer Login Submission
|--------------------------------------------------------------------------
*/

Route::post('/customer/login', [
    AuthenticatedSessionController::class,
    'store',
])->name('customer.login');

/*
|--------------------------------------------------------------------------
| Customer Logout
|--------------------------------------------------------------------------
*/

Route::post('/customer/logout', [
    AuthenticatedSessionController::class,
    'destroyCustomer',
])->name('customer.logout');
