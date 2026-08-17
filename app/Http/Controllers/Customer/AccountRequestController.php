<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AccountRequestController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'service' => [
                'required',
                'in:Account Management,Money Transfers,Transaction History,Card Services',
            ],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        /*
        |----------------------------------------------------------------------
        | For now, validate and accept the request.
        |----------------------------------------------------------------------
        | We can connect this to an admin-facing request table/email workflow
        | later.
        */

        return back()->with('success', 'Your account request has been submitted.');
    }
}
