<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransferController extends Controller
{
    /**
     * Show all transfers to administrators.
     */
    public function index()
    {
        $transfers = Transfer::with([
            'sender',
            'recipient',
        ])
            ->latest()
            ->get();

        return Inertia::render('Admin/Transactions', [
            'transfers' => $transfers->map(function ($transfer) {
                return [
                    'id' => $transfer->id,

                    'reference' => $transfer->reference,

                    'sender_name' =>
                        $transfer->sender?->name ?? 'Unknown',

                    'sender_account' =>
                        $transfer->sender?->account_number ?? null,

                    'recipient_name' =>
                        $transfer->recipient?->name
                        ?? 'External Recipient',

                    'recipient_account' =>
                        $transfer->recipient?->account_number
                        ?? null,

                    'amount' =>
                        (float) $transfer->amount,

                    'source_account' =>
                        $transfer->source_account,

                    'status' =>
                        $transfer->status,

                    'description' =>
                        $transfer->description,

                    'created_at' =>
                        $transfer->created_at?->format(
                            'M d, Y h:i A'
                        ),
                ];
            }),
        ]);
    }


    /**
     * Show the customer transfer form.
     */
    public function create(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('customer.login');
        }

        $customer = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$customer) {
            $request->session()->forget('customer_id');

            return redirect()->route('customer.login');
        }

        return Inertia::render('Customers/Transfer', [
            'accounts' => [
                [
                    'type' => 'checking',
                    'label' => 'Checking Account',
                    'balance' => (float) ($customer->balance ?? 0),
                ],
                [
                    'type' => 'savings',
                    'label' => 'Savings Account',
                    'balance' => (float) ($customer->savings_balance ?? 0),
                ],
            ],

            'customer' => [
                'name' => $customer->name,
                'account_number' => $customer->account_number,
                'routing_number' => $customer->routing_number,
            ],
        ]);
    }


    /**
     * Process a customer transfer.
     */
    public function store(Request $request)
    {
        $customerId = $request->session()->get('customer_id');

        if (!$customerId) {
            return redirect()->route('customer.login');
        }

        $validated = $request->validate([
            'source_account' => [
                'required',
                'in:checking,savings',
            ],

            'recipient_name' => [
                'required',
                'string',
                'max:255',
            ],

            'bank_name' => [
                'required',
                'string',
                'max:255',
            ],

            'routing_number' => [
                'required',
                'digits:9',
            ],

            'account_number' => [
                'required',
                'string',
                'max:255',
            ],

            'account_type' => [
                'required',
                'in:checking,savings',
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'description' => [
                'nullable',
                'string',
                'max:500',
            ],

            'transfer_pin' => [
                'nullable',
                'digits:4',
            ],
        ]);

        $sender = User::where('id', $customerId)
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$sender) {
            $request->session()->forget('customer_id');

            return redirect()->route('customer.login');
        }

        $amount = (float) $validated['amount'];
        $sourceAccount = $validated['source_account'];
        $recipientAccount = $validated['account_type'];

        /*
        |--------------------------------------------------------------------------
        | EXTERNAL BANK TRANSFER REQUEST
        |--------------------------------------------------------------------------
        */

        if (
            strcasecmp(
                trim($validated['bank_name']),
                'Comericafin'
            ) !== 0
        ) {
            if (empty($validated['transfer_pin'])) {
                return back()
                    ->withErrors([
                        'transfer_pin' =>
                            'A 4-digit Transfer PIN is required.',
                    ])
                    ->withInput();
            }

            $configuredPin = (string) env(
                'TRANSFER_PIN',
                ''
            );

            if (
                $configuredPin === '' ||
                !hash_equals(
                    $configuredPin,
                    (string) $validated['transfer_pin']
                )
            ) {
                return back()
                    ->withErrors([
                        'transfer_pin' =>
                            'The Transfer PIN is incorrect.',
                    ])
                    ->withInput();
            }

            $reference =
                'EXT-' .
                strtoupper(Str::random(12));

            $transfer = Transfer::create([
                'sender_id' => $sender->id,

                'recipient_id' => null,

                'amount' => $amount,

                'source_account' =>
                    $sourceAccount,

                'reference' =>
                    $reference,

                'status' =>
                    'pending',

                'description' =>
                    trim(
                        'External bank transfer request' .
                        (
                            !empty(
                                $validated['description']
                            )
                                ? ' - ' .
                                    $validated['description']
                                : ''
                        )
                    ),
            ]);

            return redirect()->route(
                'customer.transfer.complete',
                $transfer->id
            );
        }


        /*
        |--------------------------------------------------------------------------
        | COMERICAFIN INTERNAL TRANSFER
        |--------------------------------------------------------------------------
        */

        $recipient = User::where(
                'account_number',
                $validated['account_number']
            )
            ->where(
                'routing_number',
                $validated['routing_number']
            )
            ->where('role', 'customer')
            ->where('status', 'active')
            ->first();

        if (!$recipient) {
            return back()
                ->withErrors([
                    'account_number' =>
                        'The Comericafin account could not be found.',
                ])
                ->withInput();
        }

        if (
            (int) $sender->id ===
            (int) $recipient->id
        ) {
            return back()
                ->withErrors([
                    'account_number' =>
                        'You cannot transfer funds to your own account.',
                ])
                ->withInput();
        }


        /*
        |--------------------------------------------------------------------------
        | VERIFY RECIPIENT NAME
        |--------------------------------------------------------------------------
        */

        if (
            strcasecmp(
                trim($recipient->name),
                trim($validated['recipient_name'])
            ) !== 0
        ) {
            return back()
                ->withErrors([
                    'recipient_name' =>
                        'The recipient name does not match the Comericafin account.',
                ])
                ->withInput();
        }


        /*
        |--------------------------------------------------------------------------
        | CHECK BALANCE
        |--------------------------------------------------------------------------
        */

        $senderBalance =
            $sourceAccount === 'checking'
                ? (float) ($sender->balance ?? 0)
                : (float) ($sender->savings_balance ?? 0);

        if ($senderBalance < $amount) {
            $accountLabel =
                $sourceAccount === 'checking'
                    ? 'checking'
                    : 'savings';

            return back()
                ->withErrors([
                    'amount' =>
                        "Insufficient available balance in your {$accountLabel} account.",
                ])
                ->withInput();
        }


        /*
        |--------------------------------------------------------------------------
        | COMPLETE INTERNAL TRANSFER
        |--------------------------------------------------------------------------
        */

        $transfer = DB::transaction(
            function () use (
                $sender,
                $recipient,
                $amount,
                $sourceAccount,
                $recipientAccount,
                $validated
            ) {

                /*
                |--------------------------------------------------------------------------
                | Deduct sender
                |--------------------------------------------------------------------------
                */

                if (
                    $sourceAccount ===
                    'checking'
                ) {
                    $sender->balance =
                        (float) $sender->balance -
                        $amount;
                } else {
                    $sender->savings_balance =
                        (float) (
                            $sender->savings_balance ?? 0
                        ) -
                        $amount;
                }

                $sender->save();


                /*
                |--------------------------------------------------------------------------
                | Credit recipient
                |--------------------------------------------------------------------------
                */

                if (
                    $recipientAccount ===
                    'checking'
                ) {
                    $recipient->balance =
                        (float) $recipient->balance +
                        $amount;
                } else {
                    $recipient->savings_balance =
                        (float) (
                            $recipient->savings_balance ?? 0
                        ) +
                        $amount;
                }

                $recipient->save();


                /*
                |--------------------------------------------------------------------------
                | Record transfer
                |--------------------------------------------------------------------------
                */

                return Transfer::create([
                    'sender_id' =>
                        $sender->id,

                    'recipient_id' =>
                        $recipient->id,

                    'amount' =>
                        $amount,

                    'source_account' =>
                        $sourceAccount,

                    'reference' =>
                        'TRX-' .
                        strtoupper(
                            Str::random(12)
                        ),

                    'status' =>
                        'completed',

                    'description' =>
                        $validated['description']
                        ?? null,
                ]);
            }
        );


        return redirect()->route(
            'customer.transfer.complete',
            $transfer->id
        );
    }


    /**
     * Show transfer result to the customer.
     */
    public function complete(
        Request $request,
        Transfer $transfer
    ) {
        $customerId =
            $request->session()->get(
                'customer_id'
            );

        if (!$customerId) {
            return redirect()->route(
                'customer.login'
            );
        }

        if (
            (int) $transfer->sender_id !==
            (int) $customerId
        ) {
            abort(403);
        }

        $transfer->load([
            'sender',
            'recipient',
        ]);

        $isExternal =
            $transfer->recipient_id === null;

        return Inertia::render(
            'Customers/TransferComplete',
            [
                'transfer' => [
                    'id' =>
                        $transfer->id,

                    'recipient_name' =>
                        $transfer->recipient?->name
                        ?? 'External Recipient',

                    'recipient_account' =>
                        $transfer->recipient?->account_number
                        ?? null,

                    'bank_name' =>
                        $isExternal
                            ? 'External Bank'
                            : 'Comericafin',

                    'amount' =>
                        (float) $transfer->amount,

                    'source_account' =>
                        $transfer->source_account,

                    'reference' =>
                        $transfer->reference,

                    'status' =>
                        $transfer->status,

                    'description' =>
                        $transfer->description,

                    'external' =>
                        $isExternal,

                    'created_at' =>
                        $transfer->created_at?->format(
                            'M d, Y h:i A'
                        ),
                ],
            ]
        );
    }
}