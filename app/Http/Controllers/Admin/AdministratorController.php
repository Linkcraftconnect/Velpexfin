<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdministratorController extends Controller
{
    /**
     * Display all administrators.
     */
    public function index()
    {
        $administrators = User::where('role', 'administrator')
            ->latest()
            ->get();

        return Inertia::render('Admin/Administrators/Index', [
            'administrators' => $administrators,
        ]);
    }

    /**
     * Show the create administrator form.
     */
    public function create()
    {
        return Inertia::render('Admin/Administrators/Create');
    }

    /**
     * Store a new administrator.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'can_manage_document_access' => [
                'nullable',
                'boolean',
            ],
        ]);

        User::create([
            'name' => $validated['name'],

            'email' => $validated['email'],

            'password' => Hash::make(
                $validated['password']
            ),

            'role' => 'administrator',

            'status' => 'active',

            'can_manage_document_access' =>
                (bool) (
                    $validated['can_manage_document_access']
                    ?? false
                ),
        ]);

        return redirect()
            ->route('admin.administrators')
            ->with(
                'success',
                'Administrator created successfully.'
            );
    }

    /**
     * Display a specific administrator.
     */
    public function show($id)
    {
        $administrator = User::where('role', 'administrator')
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render(
            'Admin/Administrators/Show',
            [
                'administrator' => [
                    'id' =>
                        $administrator->id,

                    'name' =>
                        $administrator->name,

                    'email' =>
                        $administrator->email,

                    'status' =>
                        $administrator->status,

                    'can_manage_document_access' =>
                        (bool) $administrator->can_manage_document_access,

                    'created_at' =>
                        $administrator->created_at,
                ],
            ]
        );
    }

    /**
     * Show the edit administrator form.
     */
    public function edit($id)
    {
        $administrator = User::where('role', 'administrator')
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render(
            'Admin/Administrators/Edit',
            [
                'administrator' => [
                    'id' =>
                        $administrator->id,

                    'name' =>
                        $administrator->name,

                    'email' =>
                        $administrator->email,

                    'status' =>
                        $administrator->status,

                    'can_manage_document_access' =>
                        (bool) $administrator->can_manage_document_access,
                ],
            ]
        );
    }

    /**
     * Update an administrator.
     */
    public function update(Request $request, $id)
    {
        $administrator = User::where('role', 'administrator')
            ->where('id', $id)
            ->firstOrFail();

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $administrator->id,
            ],

            'status' => [
                'required',
                'in:active,disabled,inactive',
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],

            'can_manage_document_access' => [
                'nullable',
                'boolean',
            ],
        ]);

        $administrator->name =
            $validated['name'];

        $administrator->email =
            $validated['email'];

        $administrator->status =
            $validated['status'];

        $administrator->can_manage_document_access =
            (bool) (
                $validated['can_manage_document_access']
                ?? false
            );

        /*
         * Only change the password when a new password
         * was actually entered.
         */
        if (
            !empty($validated['password'])
        ) {
            $administrator->password =
                Hash::make(
                    $validated['password']
                );
        }

        $administrator->save();

        return redirect()
            ->route(
                'admin.administrators.show',
                $administrator->id
            )
            ->with(
                'success',
                'Administrator updated successfully.'
            );
    }

    /**
     * Toggle administrator status.
     */
    public function toggleStatus($id)
    {
        $administrator = User::where('role', 'administrator')
            ->where('id', $id)
            ->firstOrFail();

        $administrator->status =
            $administrator->status === 'active'
                ? 'disabled'
                : 'active';

        $administrator->save();

        return back()->with(
            'success',
            $administrator->status === 'active'
                ? 'Administrator enabled.'
                : 'Administrator disabled.'
        );
    }

    /**
     * Delete an administrator.
     */
    public function destroy($id)
    {
        $administrator = User::where('role', 'administrator')
            ->where('id', $id)
            ->firstOrFail();

        $administrator->delete();

        return redirect()
            ->route('admin.administrators')
            ->with(
                'success',
                'Administrator deleted successfully.'
            );
    }
}