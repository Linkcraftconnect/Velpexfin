import React, { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

/*
|--------------------------------------------------------------------------
| Currency
|--------------------------------------------------------------------------
*/

const formatCurrency = (value) => {
    const amount = Number(value ?? 0);

    if (!Number.isFinite(amount)) {
        return '$0.00';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/*
|--------------------------------------------------------------------------
| Bank list
|--------------------------------------------------------------------------
| Kept inside this file so Transfer.jsx does not depend on
| "@/data/bank.jsx".
|--------------------------------------------------------------------------
*/

const banks = [
    'Comericafin',
    'Bank of America',
    'Chase Bank',
    'Wells Fargo Bank',
    'Citibank',
    'U.S. Bank',
    'PNC Bank',
    'Truist Bank',
    'Capital One',
    'TD Bank',
    'Fifth Third Bank',
    'BMO Bank',
    'Citizens Bank',
    'KeyBank',
    'Regions Bank',
    'Huntington National Bank',
    'M&T Bank',
    'First Citizens Bank',
    'Discover Bank',
    'Ally Bank',
];

/*
|--------------------------------------------------------------------------
| Icons
|--------------------------------------------------------------------------
*/

const Icon = ({ type, size = 22, className = '' }) => {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
    };

    switch (type) {
        case 'transfer':
            return (
                <svg {...common}>
                    <path d="M7 7h13l-3-3" />
                    <path d="m20 7-3 3" />
                    <path d="M17 17H4l3 3" />
                    <path d="m4 17 3-3" />
                </svg>
            );

        case 'bank':
            return (
                <svg {...common}>
                    <path d="m3 10 9-7 9 7" />
                    <path d="M5 10h14" />
                    <path d="M6 10v8" />
                    <path d="M10 10v8" />
                    <path d="M14 10v8" />
                    <path d="M18 10v8" />
                    <path d="M3 21h18" />
                </svg>
            );

        case 'user':
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case 'account':
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 8h4" />
                    <path d="M7 12h2" />
                    <path d="M15 12h2" />
                    <path d="M15 16h2" />
                </svg>
            );

        case 'routing':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                </svg>
            );

        case 'lock':
            return (
                <svg {...common}>
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                </svg>
            );

        case 'arrow':
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case 'back':
            return (
                <svg {...common}>
                    <path d="M19 12H5" />
                    <path d="m11 18-6-6 6-6" />
                </svg>
            );

        case 'alert':
            return (
                <svg {...common}>
                    <path d="M12 3 2.8 20h18.4L12 3Z" />
                    <path d="M12 9v5" />
                    <path d="M12 17h.01" />
                </svg>
            );

        case 'search':
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                </svg>
            );

        case 'close':
            return (
                <svg {...common}>
                    <path d="m6 6 12 12" />
                    <path d="m18 6-12 12" />
                </svg>
            );

        default:
            return null;
    }
};

/*
|--------------------------------------------------------------------------
| Transfer Page
|--------------------------------------------------------------------------
*/

export default function Transfer({
    accounts = [],
    customer = {},
}) {
    const [transferType, setTransferType] = useState('internal');

    const [bankSearch, setBankSearch] = useState('');
    const [showBankList, setShowBankList] = useState(false);

    const [showPinModal, setShowPinModal] = useState(false);
    const [showPin, setShowPin] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const form = useForm({
        source_account: 'checking',
        recipient_name: '',
        bank_name: 'Comericafin',
        routing_number: '',
        account_number: '',
        account_type: 'checking',
        amount: '',
        description: '',
        transfer_pin: '',
    });

    /*
    |--------------------------------------------------------------------------
    | Selected account
    |--------------------------------------------------------------------------
    */

    const selectedAccount = useMemo(() => {
        return accounts.find(
            (account) =>
                account.type === form.data.source_account
        );
    }, [accounts, form.data.source_account]);

    const availableBalance = Number(
        selectedAccount?.balance ?? 0
    );

    const transferAmount = Number(
        form.data.amount || 0
    );

    const hasEnoughBalance =
        transferAmount > 0 &&
        transferAmount <= availableBalance;

    /*
    |--------------------------------------------------------------------------
    | Bank search
    |--------------------------------------------------------------------------
    */

    const filteredBanks = useMemo(() => {
        const search = bankSearch.trim().toLowerCase();

        if (!search) {
            return banks;
        }

        return banks
            .filter((bank) =>
                bank.toLowerCase().includes(search)
            )
            .slice(0, 50);
    }, [bankSearch]);

    /*
    |--------------------------------------------------------------------------
    | Transfer type
    |--------------------------------------------------------------------------
    */

    const selectTransferType = (type) => {
        setTransferType(type);

        form.clearErrors();

        if (type === 'internal') {
            form.setData('bank_name', 'Comericafin');
            setBankSearch('Comericafin');
        } else {
            form.setData('bank_name', '');
            setBankSearch('');
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Bank selection
    |--------------------------------------------------------------------------
    */

    const selectBank = (bank) => {
        form.setData('bank_name', bank);
        setBankSearch(bank);
        setShowBankList(false);

        form.clearErrors('bank_name');
    };

    /*
    |--------------------------------------------------------------------------
    | Local validation
    |--------------------------------------------------------------------------
    */

    const continueTransfer = (event) => {
        event.preventDefault();

        form.clearErrors();

        if (!form.data.recipient_name.trim()) {
            form.setError(
                'recipient_name',
                'Please enter the recipient name.'
            );
            return;
        }

        if (!form.data.bank_name.trim()) {
            form.setError(
                'bank_name',
                'Please select a bank.'
            );
            return;
        }

        if (
            !form.data.routing_number ||
            form.data.routing_number.length !== 9
        ) {
            form.setError(
                'routing_number',
                'Please enter a valid 9-digit routing number.'
            );
            return;
        }

        if (!form.data.account_number.trim()) {
            form.setError(
                'account_number',
                'Please enter the account number.'
            );
            return;
        }

        if (
            !form.data.amount ||
            Number(form.data.amount) <= 0
        ) {
            form.setError(
                'amount',
                'Please enter a valid transfer amount.'
            );
            return;
        }

        if (!hasEnoughBalance) {
            form.setError(
                'amount',
                'The transfer amount exceeds your available balance.'
            );
            return;
        }

        form.setData('transfer_pin', '');
        form.clearErrors('transfer_pin');

        setShowPinModal(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Confirm transfer
    |--------------------------------------------------------------------------
    */

    const confirmTransfer = (event) => {
        event.preventDefault();

        if (
            !form.data.transfer_pin ||
            form.data.transfer_pin.length !== 4
        ) {
            form.setError(
                'transfer_pin',
                'Please enter your 4-digit Transfer PIN.'
            );

            return;
        }

        form.post(
            route('customer.transfer.store'),
            {
                preserveScroll: true,
                preserveState: true,

                onError: (errors) => {
                    /*
                    |--------------------------------------------------------------------------
                    | Important
                    |--------------------------------------------------------------------------
                    | If Laravel returns validation errors, keep the PIN
                    | modal open instead of leaving the transfer page.
                    |--------------------------------------------------------------------------
                    */

                    setShowPinModal(true);

                    if (errors?.transfer_pin) {
                        setShowPin(true);
                    }
                },

                onSuccess: () => {
                    setShowPinModal(false);
                    setShowPin(false);
                    form.setData('transfer_pin', '');
                },

                onFinish: () => {
                    /*
                    | Do not redirect from here.
                    | Laravel/Inertia controls the successful destination.
                    */
                },
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Close PIN modal
    |--------------------------------------------------------------------------
    */

    const closePinModal = () => {
        if (form.processing) {
            return;
        }

        setShowPinModal(false);
        setShowPin(false);

        form.setData('transfer_pin', '');
        form.clearErrors('transfer_pin');
    };

    return (
        <CustomerLayout user={customer}>
            <Head title="Transfer Money" />

            <div className="min-h-screen bg-[#eeeeee] px-4 py-6 sm:px-6 lg:px-8">

                <div className="mx-auto w-full max-w-[1200px]">

                    {/* HEADER */}

                    <div className="mb-6 overflow-hidden rounded-[24px] border border-[#8f671d] bg-gradient-to-br from-[#9b741f] via-[#80601a] to-[#5e4512] p-6 shadow-[0_12px_35px_rgba(80,55,10,0.25)] sm:p-8">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5d98a]">
                                    Comericafin
                                </p>

                                <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                                    Transfer Money
                                </h1>

                                <p className="mt-2 text-sm text-[#ead9a8]">
                                    Transfer funds securely between accounts.
                                </p>
                            </div>

                            <Link
                                href={route('customer.dashboard')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                            >
                                <Icon type="back" size={18} />
                                Dashboard
                            </Link>

                        </div>
                    </div>

                    {/* TRANSFER TYPE */}

                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                        <button
                            type="button"
                            onClick={() =>
                                selectTransferType('internal')
                            }
                            className={`rounded-2xl border p-5 text-left transition ${
                                transferType === 'internal'
                                    ? 'border-[#51169a] bg-[#f7f0fc] shadow-md'
                                    : 'border-[#d8d8d8] bg-white hover:border-[#b9a4ca]'
                            }`}
                        >
                            <div className="flex items-center gap-4">

                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5d17a3] to-[#35106e] text-white">
                                    <Icon
                                        type="transfer"
                                        size={24}
                                    />
                                </span>

                                <div>
                                    <p className="font-bold text-[#35106e]">
                                        Comericafin Transfer
                                    </p>

                                    <p className="mt-1 text-sm text-[#6b6579]">
                                        Transfer between Comericafin customer accounts.
                                    </p>
                                </div>

                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                selectTransferType('external')
                            }
                            className={`rounded-2xl border p-5 text-left transition ${
                                transferType === 'external'
                                    ? 'border-[#9a751f] bg-[#faf7ef] shadow-md'
                                    : 'border-[#d8d8d8] bg-white hover:border-[#c9b98e]'
                            }`}
                        >
                            <div className="flex items-center gap-4">

                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#b28a32] to-[#765815] text-white">
                                    <Icon
                                        type="bank"
                                        size={24}
                                    />
                                </span>

                                <div>
                                    <p className="font-bold text-[#765815]">
                                        Other Bank
                                    </p>

                                    <p className="mt-1 text-sm text-[#6b6579]">
                                        Submit a external-bank transfer request.
                                    </p>
                                </div>

                            </div>
                        </button>

                    </div>

                    {/* MAIN FORM */}

                    <div className="rounded-2xl border border-[#d8d8d8] bg-white shadow-sm">

                        <form onSubmit={continueTransfer}>

                            {/* SOURCE ACCOUNT */}

                            <div className="border-b border-[#eeeaf1] p-6 sm:p-8">

                                <h2 className="text-lg font-bold text-[#42117f]">
                                    From Account
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                                    {accounts.map((account) => (
                                        <button
                                            key={account.type}
                                            type="button"
                                            onClick={() =>
                                                form.setData(
                                                    'source_account',
                                                    account.type
                                                )
                                            }
                                            className={`rounded-xl border p-4 text-left transition ${
                                                form.data.source_account ===
                                                account.type
                                                    ? 'border-[#51169a] bg-[#f7f0fc] ring-2 ring-[#51169a]/10'
                                                    : 'border-[#dedbe2] bg-white hover:border-[#bdb5c7]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">

                                                <div>
                                                    <p className="text-sm font-semibold text-[#3b3448]">
                                                        {account.label}
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-[#42117f]">
                                                        {formatCurrency(
                                                            account.balance
                                                        )}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`h-5 w-5 rounded-full border-2 ${
                                                        form.data.source_account ===
                                                        account.type
                                                            ? 'border-[#51169a] bg-[#51169a]'
                                                            : 'border-[#bdb5c7]'
                                                    }`}
                                                >
                                                    {form.data.source_account ===
                                                        account.type && (
                                                        <span className="block h-full w-full scale-50 rounded-full bg-white" />
                                                    )}
                                                </span>

                                            </div>
                                        </button>
                                    ))}

                                </div>
                            </div>

                            {/* RECIPIENT */}

                            <div className="p-6 sm:p-8">

                                <h2 className="text-lg font-bold text-[#42117f]">
                                    Recipient Information
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* RECIPIENT NAME */}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Recipient Name
                                        </label>

                                        <div className="relative">

                                            <Icon
                                                type="user"
                                                size={19}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8293]"
                                            />

                                            <input
                                                type="text"
                                                value={
                                                    form.data.recipient_name
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'recipient_name',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-[#d8d3dd] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                placeholder="Enter recipient name"
                                            />

                                        </div>

                                        {form.errors.recipient_name && (
                                            <p className="mt-2 text-xs font-medium text-[#c43d4b]">
                                                {form.errors.recipient_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* BANK */}

                                    <div className="relative">

                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Bank Name
                                        </label>

                                        <div className="relative">

                                            <Icon
                                                type="search"
                                                size={19}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8293]"
                                            />

                                            <input
                                                type="text"
                                                value={bankSearch}
                                                onFocus={() =>
                                                    setShowBankList(true)
                                                }
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;

                                                    setBankSearch(value);
                                                    form.setData(
                                                        'bank_name',
                                                        value
                                                    );
                                                    setShowBankList(true);
                                                }}
                                                className="w-full rounded-lg border border-[#d8d3dd] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                placeholder="Search bank name..."
                                            />

                                        </div>

                                        {showBankList && (
                                            <div className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[#ddd8e3] bg-white shadow-xl">

                                                {filteredBanks.length > 0 ? (
                                                    filteredBanks.map(
                                                        (bank) => (
                                                            <button
                                                                key={bank}
                                                                type="button"
                                                                onClick={() =>
                                                                    selectBank(
                                                                        bank
                                                                    )
                                                                }
                                                                className={`flex w-full items-center gap-3 border-b border-[#f0edf2] px-4 py-3 text-left text-sm transition last:border-b-0 hover:bg-[#f7f2fb] ${
                                                                    form.data.bank_name ===
                                                                    bank
                                                                        ? 'bg-[#f5effb] font-semibold text-[#51169a]'
                                                                        : 'text-[#403947]'
                                                                }`}
                                                            >
                                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eee5f7] text-[#51169a]">
                                                                    <Icon
                                                                        type="bank"
                                                                        size={17}
                                                                    />
                                                                </span>

                                                                <span>
                                                                    {bank}
                                                                </span>
                                                            </button>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="p-5 text-center text-sm text-[#777080]">
                                                        No banks found.
                                                    </div>
                                                )}

                                            </div>
                                        )}

                                        {form.errors.bank_name && (
                                            <p className="mt-2 text-xs font-medium text-[#c43d4b]">
                                                {form.errors.bank_name}
                                            </p>
                                        )}

                                    </div>

                                    {/* ROUTING */}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Routing Number
                                        </label>

                                        <div className="relative">

                                            <Icon
                                                type="routing"
                                                size={19}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8293]"
                                            />

                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={9}
                                                value={
                                                    form.data.routing_number
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'routing_number',
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ''
                                                        )
                                                    )
                                                }
                                                className="w-full rounded-lg border border-[#d8d3dd] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                placeholder="9-digit routing number"
                                            />

                                        </div>

                                        {form.errors.routing_number && (
                                            <p className="mt-2 text-xs font-medium text-[#c43d4b]">
                                                {form.errors.routing_number}
                                            </p>
                                        )}
                                    </div>

                                    {/* ACCOUNT NUMBER */}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Account Number
                                        </label>

                                        <div className="relative">

                                            <Icon
                                                type="account"
                                                size={19}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8293]"
                                            />

                                            <input
                                                type="text"
                                                value={
                                                    form.data.account_number
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        'account_number',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-[#d8d3dd] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                placeholder="Enter account number"
                                            />

                                        </div>

                                        {form.errors.account_number && (
                                            <p className="mt-2 text-xs font-medium text-[#c43d4b]">
                                                {form.errors.account_number}
                                            </p>
                                        )}
                                    </div>

                                    {/* ACCOUNT TYPE */}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Recipient Account Type
                                        </label>

                                        <select
                                            value={form.data.account_type}
                                            onChange={(e) =>
                                                form.setData(
                                                    'account_type',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-[#d8d3dd] bg-white px-4 py-3 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                        >
                                            <option value="checking">
                                                Checking
                                            </option>

                                            <option value="savings">
                                                Savings
                                            </option>
                                        </select>
                                    </div>

                                    {/* AMOUNT */}

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                            Transfer Amount
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6d6575]">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                value={form.data.amount}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'amount',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-[#d8d3dd] py-3 pl-8 pr-4 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                placeholder="0.00"
                                            />

                                        </div>

                                        <p className="mt-2 text-xs text-[#777080]">
                                            Available:{' '}
                                            <span className="font-semibold">
                                                {formatCurrency(
                                                    availableBalance
                                                )}
                                            </span>
                                        </p>

                                        {form.errors.amount && (
                                            <p className="mt-2 text-xs font-medium text-[#c43d4b]">
                                                {form.errors.amount}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* DESCRIPTION */}

                                <div className="mt-5">

                                    <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                        Description
                                    </label>

                                    <textarea
                                        rows={3}
                                        value={form.data.description}
                                        onChange={(e) =>
                                            form.setData(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-[#d8d3dd] px-4 py-3 text-sm outline-none transition focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                        placeholder="Optional transfer description"
                                    />

                                </div>

                                {/* NOTICE */}

                                <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ddd9e1] bg-[#f8f7f9] p-4">

                                    <Icon
                                        type="alert"
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#6b6579]"
                                    />

                                    <p className="text-xs leading-5 text-[#6b6579]">
                                        A 4-digit Transfer PIN will be required
                                        before any transfer can be completed.
                                    </p>

                                </div>

                                {/* ACTIONS */}

                                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                    <Link
                                        href={route('customer.dashboard')}
                                        className="inline-flex items-center justify-center rounded-lg border border-[#d3ced8] bg-white px-6 py-3 text-sm font-semibold text-[#5e5768] transition hover:bg-[#f7f5f8]"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={
                                            form.processing ||
                                            !hasEnoughBalance ||
                                            transferAmount <= 0
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#51169a] to-[#35106e] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:from-[#431180] hover:to-[#2c095d] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Continue Transfer

                                        <Icon
                                            type="arrow"
                                            size={17}
                                        />
                                    </button>

                                </div>

                            </div>
                        </form>
                    </div>

                    {/* SECURITY */}

                    <div className="mt-6 rounded-2xl border border-[#d5d5d5] bg-[#e4e4e4] p-5">

                        <div className="flex items-start gap-3">

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5a1b99] to-[#35106e] text-white">
                                <Icon type="lock" size={17} />
                            </span>

                            <div>
                                <p className="text-sm font-semibold text-[#35106e]">
                                    Secure Transfer
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#655d72]">
                                    Your Transfer PIN is verified securely
                                    before a transfer is completed.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* ================================================================= */}
            {/* PIN MODAL */}
            {/* ================================================================= */}

            {showPinModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

                    <div
                        className="absolute inset-0"
                        onClick={closePinModal}
                    />

                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

                        {/* HEADER */}

                        <div className="bg-gradient-to-br from-[#51169a] to-[#35106e] px-6 py-7 text-white">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                                        <Icon
                                            type="lock"
                                            size={24}
                                        />
                                    </span>

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Transfer PIN
                                        </h2>

                                        <p className="mt-1 text-sm text-purple-100">
                                            Security verification
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={closePinModal}
                                    disabled={form.processing}
                                    className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                                >
                                    <Icon
                                        type="close"
                                        size={20}
                                    />
                                </button>

                            </div>
                        </div>

                        {/* CONTENT */}

                        <div className="p-6">

                            <div className="rounded-2xl border border-[#e4d9ee] bg-[#faf7fd] p-5">

                                <p className="text-sm leading-6 text-[#5d5368]">
                                    Enter your 4-digit Transfer PIN to
                                    authorize this transfer.
                                </p>

                                {/* SUMMARY */}

                                <div className="mt-5 rounded-xl border border-[#e0d6e8] bg-white p-4">

                                    <div className="flex items-center justify-between">

                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#7b7085]">
                                            Amount
                                        </span>

                                        <span className="text-lg font-bold text-[#42117f]">
                                            {formatCurrency(
                                                form.data.amount
                                            )}
                                        </span>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#7b7085]">
                                            Recipient
                                        </span>

                                        <span className="max-w-[190px] truncate text-sm font-semibold text-[#3f3848]">
                                            {form.data.recipient_name}
                                        </span>

                                    </div>

                                    <div className="mt-3 flex items-center justify-between">

                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#7b7085]">
                                            Bank
                                        </span>

                                        <span className="max-w-[190px] truncate text-sm font-semibold text-[#3f3848]">
                                            {form.data.bank_name}
                                        </span>

                                    </div>

                                </div>

                                {/* PIN */}

                                <div className="mt-6">

                                    <label className="mb-2 block text-sm font-semibold text-[#393344]">
                                        4-Digit Transfer PIN
                                    </label>

                                    <div className="relative">

                                        <input
                                            autoFocus
                                            type={
                                                showPin
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            inputMode="numeric"
                                            maxLength={4}
                                            value={
                                                form.data.transfer_pin
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    'transfer_pin',
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ''
                                                    )
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' &&
                                                    form.data.transfer_pin.length === 4
                                                ) {
                                                    confirmTransfer(e);
                                                }
                                            }}
                                            className="w-full rounded-xl border border-[#d5c9df] bg-white px-5 py-4 pr-20 text-center text-2xl font-bold tracking-[0.65em] text-[#42117f] outline-none transition focus:border-[#51169a] focus:ring-4 focus:ring-[#51169a]/10"
                                            placeholder="••••"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPin(!showPin)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#51169a] hover:underline"
                                        >
                                            {showPin
                                                ? 'Hide'
                                                : 'Show'}
                                        </button>

                                    </div>

                                    {form.errors.transfer_pin && (
                                        <p className="mt-2 text-sm font-medium text-[#c43d4b]">
                                            {form.errors.transfer_pin}
                                        </p>
                                    )}

                                </div>

                                {/* ACTIONS */}

                                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <button
                                        type="button"
                                        onClick={closePinModal}
                                        disabled={form.processing}
                                        className="rounded-xl border border-[#d5d0da] bg-white px-5 py-3 text-sm font-semibold text-[#5e5768] transition hover:bg-[#f7f5f8] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={confirmTransfer}
                                        disabled={
                                            form.processing ||
                                            form.data.transfer_pin.length !== 4
                                        }
                                        className="rounded-xl bg-gradient-to-r from-[#51169a] to-[#35106e] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-[#431180] hover:to-[#2c095d] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {form.processing
                                            ? 'Verifying...'
                                            : 'Confirm Transfer'}
                                    </button>

                                </div>

                                {/* SECURITY NOTE */}

                                <div className="mt-5 flex items-start gap-2">

                                    <Icon
                                        type="lock"
                                        size={15}
                                        className="mt-0.5 shrink-0 text-[#766b82]"
                                    />

                                    <p className="text-xs leading-5 text-[#766b82]">
                                        Your PIN is verified securely.
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )}

        </CustomerLayout>
    );
}