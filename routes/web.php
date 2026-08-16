<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdministratorController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\TransferController;
use App\Http\Controllers\Customer\TransferController as CustomerTransferController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Public Website
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


/*
|--------------------------------------------------------------------------
| Customer Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/customer/dashboard', function () {

    $customerId = session('customer_id');

    if (!$customerId) {
        return redirect()->route('login');
    }

    $customer = \App\Models\User::where('id', $customerId)
        ->where('role', 'customer')
        ->where('status', 'active')
        ->first();

    if (!$customer) {
        session()->forget('customer_id');

        return redirect()->route('login');
    }

    return Inertia::render('Customers/Dashboard', [
        'user' => $customer,
    ]);

})->name('customer.dashboard');


/*
|--------------------------------------------------------------------------
| Customer Transfer
|--------------------------------------------------------------------------
*/

Route::get('/customer/transfer', [CustomerTransferController::class, 'create'])
    ->name('customer.transfer');

Route::post('/customer/transfer', [CustomerTransferController::class, 'store'])
    ->name('customer.transfer.store');

Route::get('/customer/transfer/{transfer}/complete', [CustomerTransferController::class, 'complete'])
    ->name('customer.transfer.complete');


/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

});


/*
|--------------------------------------------------------------------------
| Hidden Administrator Portal
|--------------------------------------------------------------------------
*/

Route::get('/admin', function () {
    return redirect()->route('admin.login');
});


/*
|--------------------------------------------------------------------------
| Administrator Login
|--------------------------------------------------------------------------
*/

Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login');
})->name('admin.login');

Route::post('/admin/login', [AuthController::class, 'login'])
    ->name('admin.authenticate');


/*
|--------------------------------------------------------------------------
| Administrator Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/admin/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'admin'])
    ->name('admin.dashboard');


/*
|--------------------------------------------------------------------------
| Administrator Logout
|--------------------------------------------------------------------------
*/

Route::post('/admin/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('admin.logout');


/*
|--------------------------------------------------------------------------
| Administrator Portal
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Customers
        |--------------------------------------------------------------------------
        */

        Route::get('/customers', [CustomerController::class, 'index'])
            ->name('admin.customers');

        Route::get('/customers/create', function () {
            return Inertia::render('Customers/Create');
        })->name('admin.customers.create');

        Route::post('/customers', [CustomerController::class, 'store'])
            ->name('admin.customers.store');

        Route::get('/customers/{id}/edit', [CustomerController::class, 'edit'])
            ->name('admin.customers.edit');

        Route::put('/customers/{id}', [CustomerController::class, 'update'])
            ->name('admin.customers.update');

        Route::get('/customers/{id}', [CustomerController::class, 'show'])
            ->name('admin.customers.show');

        Route::patch('/customers/{id}/toggle-status', [CustomerController::class, 'toggleStatus'])
            ->name('admin.customers.toggle-status');

        Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])
            ->name('admin.customers.destroy');


        /*
        |--------------------------------------------------------------------------
        | Transactions
        |--------------------------------------------------------------------------
        */

        Route::get('/transactions', [TransferController::class, 'index'])
            ->name('admin.transactions');


        /*
        |--------------------------------------------------------------------------
        | Reports
        |--------------------------------------------------------------------------
        */

        Route::get('/reports', function () {
            return Inertia::render('Admin/Reports');
        })->name('admin.reports');


        /*
        |--------------------------------------------------------------------------
        | Settings
        |--------------------------------------------------------------------------
        */

        Route::get('/settings', function () {

            return Inertia::render('Admin/Settings', [
                'user' => [
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                    'role' => auth()->user()->role,
                    'status' => auth()->user()->status,
                ],
            ]);

        })->name('admin.settings');

    });


/*
|--------------------------------------------------------------------------
| Super Admin Only - Administrator Management
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin', 'superadmin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/administrators', [AdministratorController::class, 'index'])
            ->name('admin.administrators');

        Route::get('/administrators/create', [AdministratorController::class, 'create'])
            ->name('admin.administrators.create');

        Route::post('/administrators', [AdministratorController::class, 'store'])
            ->name('admin.administrators.store');

        Route::get('/administrators/{id}', [AdministratorController::class, 'show'])
            ->name('admin.administrators.show');

        Route::get('/administrators/{id}/edit', [AdministratorController::class, 'edit'])
            ->name('admin.administrators.edit');

        Route::put('/administrators/{id}', [AdministratorController::class, 'update'])
            ->name('admin.administrators.update');

        Route::patch('/administrators/{id}/toggle-status', [AdministratorController::class, 'toggleStatus'])
            ->name('admin.administrators.toggle-status');

    });


/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';


/*
|--------------------------------------------------------------------------
| Debug Session
|--------------------------------------------------------------------------
*/

Route::get('/debug-session', function () {

    return response()->json([
        'session_id' => session()->getId(),
        'auth_check' => auth()->check(),
        'user_id' => auth()->id(),
        'user' => auth()->user(),
    ]);

});