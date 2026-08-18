<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display customers.
     */
    public function index()
    {
        $query = User::where('role', 'customer');

        // Administrators only see customers they created.
        // Super administrators see all customers.
        if (auth()->user()->role !== 'super_admin') {
            $query->where('admin_id', auth()->id());
        }

        $customers = $query
            ->latest()
            ->get();

        return Inertia::render('Admin/Customers', [
            'customers' => $customers,
        ]);
    }


    /**
     * Create a customer.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],

            'last_name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'routing_number' => [
                'required',
                'string',
                'size:9',
            ],

            'account_number' => [
                'required',
                'string',
                'max:255',
                'unique:users,account_number',
            ],

            'balance' => [
                'required',
                'numeric',
                'min:0',
            ],

            'savings_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'profile_picture' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ]);

        $profilePicturePath = null;

        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request
                ->file('profile_picture')
                ->store('profile_pictures', 'public');
        }

        User::create([
            'name' =>
                $validated['first_name'] .
                ' ' .
                $validated['last_name'],

            'email' => $validated['email'],

            'password' => Hash::make(
                $validated['password']
            ),

            'role' => 'customer',

            'status' => 'active',

            'admin_id' => auth()->id(),

            'phone' => $validated['phone'] ?? null,

            'routing_number' =>
                $validated['routing_number'],

            'account_number' =>
                $validated['account_number'],

            'balance' =>
                $validated['balance'],

            'savings_balance' =>
                $validated['savings_balance'] ?? 0,

            'profile_picture' =>
                $profilePicturePath,

            // No PIN is generated automatically.
            'transfer_pin' => null,
        ]);

        return redirect()
            ->route('admin.customers')
            ->with(
                'success',
                'Customer created successfully.'
            );
    }


    /**
     * Show customer details.
     */
    public function show($id)
    {
        $customer = User::where('role', 'customer')
            ->findOrFail($id);

        return Inertia::render(
            'Admin/Customers/Show',
            [
                'customer' => $customer,
            ]
        );
    }


    /**
     * Show customer edit page.
     */
    public function edit($id)
    {
        $customer = User::where('role', 'customer')
            ->findOrFail($id);

        return Inertia::render(
            'Customers/Edit',
            [
                'customer' => $customer,
            ]
        );
    }


    /**
     * Update customer.
     */
    public function update(
        Request $request,
        $id
    ) {
        $customer = User::where('role', 'customer')
            ->findOrFail($id);

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
                'unique:users,email,' .
                $customer->id,
            ],

            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'routing_number' => [
                'required',
                'string',
                'size:9',
            ],

            'account_number' => [
                'required',
                'string',
                'max:255',
                'unique:users,account_number,' .
                $customer->id,
            ],

            'balance' => [
                'required',
                'numeric',
                'min:0',
            ],

            'savings_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $customer->name =
            $validated['name'];

        $customer->email =
            $validated['email'];

        $customer->phone =
            $validated['phone'] ?? null;

        $customer->routing_number =
            $validated['routing_number'];

        $customer->account_number =
            $validated['account_number'];

        $customer->balance =
            $validated['balance'];

        $customer->savings_balance =
            $validated['savings_balance'] ?? 0;

        /*
        |--------------------------------------------------------------------------
        | Update Password Only If Supplied
        |--------------------------------------------------------------------------
        */

        if (
            !empty($validated['password'])
        ) {
            $customer->password =
                Hash::make(
                    $validated['password']
                );
        }

        $customer->save();

        return redirect()
            ->route(
                'admin.customers.show',
                $customer->id
            )
            ->with(
                'success',
                'Customer account updated successfully.'
            );
    }


    /**
     * Generate a new 4-digit Transfer PIN.
     *
     * The PIN is generated by the administrator
     * and stored on the customer's account.
     */
    public function generateTransferPin(
        $id
    ) {
        $customer = User::where(
            'role',
            'customer'
        )->findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Generate 4-digit PIN
        |--------------------------------------------------------------------------
        |
        | random_int() is used instead of a predictable
        | random-number method.
        |
        */

        $pin = (string) random_int(
            1000,
            9999
        );

        /*
        |--------------------------------------------------------------------------
        | Store PIN
        |--------------------------------------------------------------------------
        */

        $customer->transfer_pin = Hash::make(
            $pin
        );

        $customer->save();

        /*
        |--------------------------------------------------------------------------
        | Return PIN to administrator
        |--------------------------------------------------------------------------
        |
        | The plaintext PIN is returned only in this
        | response so the administrator can see it
        | immediately after generation.
        |
        */

        return back()
            ->with(
                'transfer_pin',
                $pin
            )
            ->with(
                'success',
                'A new Transfer PIN has been generated successfully.'
            );
    }


    /**
     * Toggle customer status.
     */
    public function toggleStatus($id)
    {
        $customer = User::where(
            'role',
            'customer'
        )->findOrFail($id);

        $customer->status =
            $customer->status === 'active'
                ? 'inactive'
                : 'active';

        $customer->save();

        return redirect()
            ->back()
            ->with(
                'success',
                $customer->status === 'active'
                    ? 'Customer account enabled.'
                    : 'Customer account disabled.'
            );
    }


    /**
     * Delete customer.
     */
    public function destroy($id)
    {
        $customer = User::where(
            'role',
            'customer'
        )->findOrFail($id);

        $customer->delete();

        return redirect()
            ->route('admin.customers')
            ->with(
                'success',
                'Customer account deleted successfully.'
            );
    }
}