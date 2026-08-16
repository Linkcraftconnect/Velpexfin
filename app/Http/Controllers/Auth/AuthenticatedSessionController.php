<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the customer login page.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => false,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle customer login.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $customer = User::where('email', $credentials['email'])
            ->where('role', 'customer')
            ->first();

        if (
            !$customer ||
            !Hash::check($credentials['password'], $customer->password)
        ) {
            return back()->withErrors([
                'email' => 'Invalid customer login credentials.',
            ]);
        }

        if ($customer->status !== 'active') {
            return back()->withErrors([
                'email' => 'Your customer account is currently inactive.',
            ]);
        }

        /*
        | Store the customer separately.
        | This does NOT log the customer into Laravel's web guard.
        */
        $request->session()->put('customer_id', $customer->id);

        $request->session()->regenerate();

        return redirect()->route('customer.dashboard');
    }

    /**
     * Customer logout.
     */
    public function destroyCustomer(Request $request): RedirectResponse
    {
        /*
        | Only remove the customer session.
        | Do NOT call Auth::logout(), because that could log
        | the administrator out of the same browser session.
        */
        $request->session()->forget('customer_id');

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Administrator/authenticated-user logout.
     */
    public function destroy(Request $request): RedirectResponse
    {
        \Illuminate\Support\Facades\Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
