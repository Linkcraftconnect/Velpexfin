<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
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

        /*
         * Super Admin can see all customers.
         *
         * Regular administrators can only see
         * customers assigned to them.
         */
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
     * Create a customer.
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

            /*
             * Customer document permissions.
             */
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

        /*
         * Determine whether this administrator is allowed
         * to assign document permissions.
         */
        $canManageDocuments =
            $this->canManageDocumentAccess();

        /*
         * Upload profile picture.
         */
        $profilePicturePath = null;

        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request
                ->file('profile_picture')
                ->store('profile_pictures', 'public');
        }

        /*
         * Create customer.
         */
        User::create([
            'name' => trim(
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

            /*
             * Assign customer to the administrator
             * who created the account.
             */
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

            /*
             * Transfer PIN starts empty.
             * It can be generated later by an administrator.
             */
            'transfer_pin' =>
                null,

            /*
             * Document permissions.
             *
             * Only Super Admin or an authorized
             * administrator can grant access.
             */
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

        /*
         * Regular administrators can only view
         * customers assigned to them.
         */
        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer,

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

        /*
         * Regular administrators can only edit
         * their own customers.
         */
        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        /*
         * Decrypt existing Transfer PIN.
         */
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

                /*
                 * Customer document permissions.
                 */
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

        /*
         * Regular administrators can only update
         * customers assigned to them.
         */
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

            /*
             * Account status.
             */
            'status' => [
                'required',
                'in:active,inactive',
            ],

            /*
             * Customer document permissions.
             */
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

        /*
         * Update normal customer information.
         */
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

            /*
             * Save account status.
             */
            'status' =>
                $validated['status'],
        ]);

        /*
         * Only authorized administrators can change
         * document permissions.
         */
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

        /*
         * Regular administrators can only generate
         * PINs for their own customers.
         */
        if ($user->role !== 'super_admin') {
            $query->where('admin_id', $user->id);
        }

        $customer = $query->firstOrFail();

        /*
         * Generate a random 4-digit PIN.
         */
        $pin = (string) random_int(1000, 9999);

        /*
         * Encrypt the PIN before storing it.
         */
        $customer->transfer_pin =
            Crypt::encryptString($pin);

        $customer->save();

        return back()
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

        /*
         * Regular administrators can only change
         * status for their own customers.
         */
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

        /*
         * Regular administrators can only delete
         * their own customers.
         */
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