<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountRequestController extends Controller
{
    public function store(Request $request)
    {
        return back()->with('success', 'Your account request has been submitted.');
    }
}