<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Determine whether the current administrator can manage
     * customer document permissions.
     *
     * Super Admin always has permission.
     */
    private function canManageDocumentAccess(): bool
    {
        $user = auth()->user();

        if (!$user) {
            return false;
        }

        if ($user->role === 'super_admin') {
            return true;
        }

        return $user->role === 'administrator'
            && (bool) $user->can_manage_document_access;
    }

    /**
     * Display customers.
     */
    public function index()
    {
        $user = auth()->user();

        $query = User::where('role', 'customer');

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customers = $query
            ->latest()
            ->get();

        return Inertia::render('Admin/Customers', [
            'customers' => $customers,

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ],

            'canManageDocumentAccess' =>
                $this->canManageDocumentAccess(),
        ]);
    }

    /**
     * Show create customer form.
     */
    public function create()
    {
        return Inertia::render('Customers/Create', [
            'canManageDocumentAccess' =>
                $this->canManageDocumentAccess(),
        ]);
    }

    /**
     * Create customer.
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'last_name' => [
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

            'statement_access' => [
                'nullable',
                'boolean',
            ],

            'statement_pdf_access' => [
                'nullable',
                'boolean',
            ],

            'statement_png_access' => [
                'nullable',
                'boolean',
            ],

            'receipt_pdf_access' => [
                'nullable',
                'boolean',
            ],

            'receipt_png_access' => [
                'nullable',
                'boolean',
            ],
        ]);

        $canManageDocuments =
            $this->canManageDocumentAccess();

        $profilePicturePath = null;

        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request
                ->file('profile_picture')
                ->store('profile_pictures', 'public');
        }

        User::create([
            'name' =>
                trim(
                    $validated['first_name']
                    . ' '
                    . $validated['last_name']
                ),

            'email' =>
                $validated['email'],

            'password' =>
                Hash::make($validated['password']),

            'role' =>
                'customer',

            'status' =>
                'active',

            'admin_id' =>
                $user->id,

            'phone' =>
                $validated['phone'] ?? null,

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

            'transfer_pin' =>
                null,

            'statement_access' =>
                $canManageDocuments
                    ? (bool) ($validated['statement_access'] ?? false)
                    : false,

            'statement_pdf_access' =>
                $canManageDocuments
                    ? (bool) ($validated['statement_pdf_access'] ?? false)
                    : false,

            'statement_png_access' =>
                $canManageDocuments
                    ? (bool) ($validated['statement_png_access'] ?? false)
                    : false,

            'receipt_pdf_access' =>
                $canManageDocuments
                    ? (bool) ($validated['receipt_pdf_access'] ?? false)
                    : false,

            'receipt_png_access' =>
                $canManageDocuments
                    ? (bool) ($validated['receipt_png_access'] ?? false)
                    : false,
        ]);

        return redirect()
            ->route('admin.customers')
            ->with(
                'success',
                'Customer created successfully.'
            );
    }

    /**
     * Show customer account.
     */
    public function show($id)
    {
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        /*
         * Get generated PIN from session flash data.
         */
        $generatedTransferPin = session(
            'generated_transfer_pin'
        );

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer,

            'generatedTransferPin' =>
                $generatedTransferPin,

            'canManageDocumentAccess' =>
                $this->canManageDocumentAccess(),
        ]);
    }

    /**
     * Show customer edit form.
     */
    public function edit($id)
    {
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        $currentPin = null;

        if (!empty($customer->transfer_pin)) {
            try {
                $currentPin = Crypt::decryptString(
                    $customer->transfer_pin
                );
            } catch (\Throwable $e) {
                $currentPin = null;
            }
        }

        return Inertia::render('Customers/Edit', [
            'customer' => [
                'id' =>
                    $customer->id,

                'name' =>
                    $customer->name,

                'email' =>
                    $customer->email,

                'phone' =>
                    $customer->phone,

                'routing_number' =>
                    $customer->routing_number,

                'account_number' =>
                    $customer->account_number,

                'balance' =>
                    $customer->balance,

                'savings_balance' =>
                    $customer->savings_balance,

                'status' =>
                    $customer->status,

                'has_transfer_pin' =>
                    !empty($customer->transfer_pin),

                'current_transfer_pin' =>
                    $currentPin,

                'statement_access' =>
                    (bool) $customer->statement_access,

                'statement_pdf_access' =>
                    (bool) $customer->statement_pdf_access,

                'statement_png_access' =>
                    (bool) $customer->statement_png_access,

                'receipt_pdf_access' =>
                    (bool) $customer->receipt_pdf_access,

                'receipt_png_access' =>
                    (bool) $customer->receipt_png_access,
            ],

            'canManageDocumentAccess' =>
                $this->canManageDocumentAccess(),
        ]);
    }

    /**
     * Update customer.
     */
    public function update(Request $request, $id)
    {
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

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
                'unique:users,email,' . $customer->id,
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
                'unique:users,account_number,' . $customer->id,
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

            'statement_access' => [
                'nullable',
                'boolean',
            ],

            'statement_pdf_access' => [
                'nullable',
                'boolean',
            ],

            'statement_png_access' => [
                'nullable',
                'boolean',
            ],

            'receipt_pdf_access' => [
                'nullable',
                'boolean',
            ],

            'receipt_png_access' => [
                'nullable',
                'boolean',
            ],
        ]);

        $customer->update([
            'name' =>
                $validated['name'],

            'email' =>
                $validated['email'],

            'phone' =>
                $validated['phone'] ?? null,

            'routing_number' =>
                $validated['routing_number'],

            'account_number' =>
                $validated['account_number'],

            'balance' =>
                $validated['balance'],

            'savings_balance' =>
                $validated['savings_balance'] ?? 0,
        ]);

        if ($this->canManageDocumentAccess()) {
            $customer->update([
                'statement_access' =>
                    (bool) ($validated['statement_access'] ?? false),

                'statement_pdf_access' =>
                    (bool) ($validated['statement_pdf_access'] ?? false),

                'statement_png_access' =>
                    (bool) ($validated['statement_png_access'] ?? false),

                'receipt_pdf_access' =>
                    (bool) ($validated['receipt_pdf_access'] ?? false),

                'receipt_png_access' =>
                    (bool) ($validated['receipt_png_access'] ?? false),
            ]);
        }

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
     * Generate a new Transfer PIN.
     */
    public function generateTransferPin($id)
    {
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        /*
         * Generate secure 4-digit PIN.
         */
        $pin = (string) random_int(
            1000,
            9999
        );

        /*
         * Encrypt PIN before storing it.
         */
        $customer->transfer_pin =
            Crypt::encryptString($pin);

        $customer->save();

        /*
         * Redirect directly back to the customer page.
         *
         * The PIN is flashed to the session so that
         * the Show page can display it once.
         */
        return redirect()
            ->route(
                'admin.customers.show',
                $customer->id
            )
            ->with(
                'success',
                'A new Transfer PIN has been generated.'
            )
            ->with(
                'generated_transfer_pin',
                $pin
            );
    }

    /**
     * Toggle customer status.
     */
    public function toggleStatus($id)
    {
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

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
        $user = auth()->user();

        $query = User::where('role', 'customer')
            ->where('id', $id);

        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        $customer->delete();

        return redirect()
            ->route('admin.customers')
            ->with(
                'success',
                'Customer account deleted successfully.'
            );
    }
}