<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdministratorController extends Controller
{
    public function index()
    {
        $administrators = User::where('role', 'administrator')->get();

        return Inertia::render('Admin/Administrators/Index', [
            'administrators' => $administrators,
        ]);
    }

    public function show($id)
    {
        $administrator = User::where('role', 'administrator')
            ->findOrFail($id);

        return Inertia::render('Admin/Administrators/Show', [
            'administrator' => $administrator,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Administrators/Create');
    }

    public function edit($id)
    {
        $administrator = User::where('role', 'administrator')
            ->findOrFail($id);

        return Inertia::render('Admin/Administrators/Edit', [
            'administrator' => $administrator,
        ]);
    }

    public function update(Request $request, $id)
    {
        $administrator = User::where('role', 'administrator')
            ->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $administrator->id,
            'status' => 'required|in:active,disabled',
            'password' => 'nullable|min:8|confirmed',
        ]);

        $administrator->name = $validated['name'];
        $administrator->email = $validated['email'];
        $administrator->status = $validated['status'];

        if (!empty($validated['password'])) {
            $administrator->password = Hash::make($validated['password']);
        }

        $administrator->save();

        return redirect()
            ->route('admin.administrators.show', $administrator->id)
            ->with('success', 'Administrator updated successfully.');
    }

    public function toggleStatus($id)
    {
        $administrator = User::where('role', 'administrator')
            ->findOrFail($id);

        $administrator->status =
            $administrator->status === 'active'
                ? 'disabled'
                : 'active';

        $administrator->save();

        return back()->with(
            'success',
            'Administrator status updated successfully.'
        );
    }
}