<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            $user = Auth::user();

            if (
                $user->role !== 'super_admin' &&
                $user->role !== 'administrator'
            ) {
                Auth::logout();

                return back()->withErrors([
                    'email' => 'You are not authorized to access the administrator portal.',
                ]);
            }

            if (
                $user->role === 'administrator' &&
                $user->status !== 'active'
            ) {
                Auth::logout();

                return back()->withErrors([
                    'email' => 'Your administrator account has been disabled. Please contact a Super Administrator.',
                ]);
            }

            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid login credentials.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}