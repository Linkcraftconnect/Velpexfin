import { Head, useForm, router } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import banks from '@/data/banks';
import { useMemo, useState } from 'react';

const formatCurrency = (value) => {
    const amount = Number(value || 0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

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
        case 'arrow':
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case 'user':
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case 'bank':
            return (
                <svg {...common}>
                    <path d="M3 10h18" />
                    <path d="M5 10v8" />
                    <path d="M9 10v8" />
                    <path d="M15 10v8" />
                    <path d="M19 10v8" />
                    <path d="M2 18h20" />
                    <path d="m12 3 9 5H3l9-5Z" />
                </svg>
            );

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case 'check':
            return (
                <svg {...common}>
                    <path d="m5 12 4 4L19 6" />
                </svg>
            );

        case 'lock':
            return (
                <svg {...common}>
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
            );

        case 'chevron':
            return (
                <svg {...common}>
                    <path d="m9 18 6-6-6-6" />
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

export default function Transfer({ accounts = [] }) {
    const [search, setSearch] = useState('');

    const [pinRequired, setPinRequired] = useState(false);
    const [transferPin, setTransferPin] = useState('');
    const [pinError, setPinError] = useState('');

    const [stage, setStage] = useState('form');
    const [completed, setCompleted] = useState(false);
    const [reference, setReference] = useState('');

    const getInitialSourceAccount = () => {
        if (typeof window === 'undefined') {
            return 'checking';
        }

        const source = new URLSearchParams(window.location.search).get(
            'source'
        );

        return source === 'savings' ? 'savings' : 'checking';
    };

    const initialSourceAccount = getInitialSourceAccount();

    const [sourceAccount, setSourceAccount] = useState(
        initialSourceAccount
    );

    /*
    |--------------------------------------------------------------------------
    | Bank list
    |--------------------------------------------------------------------------
    */

    const bankList = useMemo(() => {
        return [...new Set(['Comericafin', ...banks])];
    }, []);

    const filteredBanks = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return bankList;
        }

        return bankList.filter((bank) =>
            bank.toLowerCase().includes(keyword)
        );
    }, [search, bankList]);

    /*
    |--------------------------------------------------------------------------
    | Accounts
    |--------------------------------------------------------------------------
    */

    const checkingAccount = useMemo(() => {
        if (!Array.isArray(accounts)) {
            return null;
        }

        return (
            accounts.find((account) => account.type === 'checking') ||
            null
        );
    }, [accounts]);

    const savingsAccount = useMemo(() => {
        if (!Array.isArray(accounts)) {
            return null;
        }

        return (
            accounts.find((account) => account.type === 'savings') ||
            null
        );
    }, [accounts]);

    const checkingBalance = Number(
        checkingAccount?.balance ?? 0
    );

    const savingsBalance = Number(
        savingsAccount?.savings_balance ??
            savingsAccount?.balance ??
            0
    );

    const selectedBalance =
        sourceAccount === 'savings'
            ? savingsBalance
            : checkingBalance;

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        source_account: initialSourceAccount,
        recipient_name: '',
        bank_name: '',
        routing_number: '',
        account_number: '',
        account_type: 'checking',
        amount: '',
        description: '',
    });

    /*
    |--------------------------------------------------------------------------
    | Source account
    |--------------------------------------------------------------------------
    */

    const handleSourceAccountChange = (value) => {
        const nextAccount =
            value === 'savings' ? 'savings' : 'checking';

        setSourceAccount(nextAccount);
        setData('source_account', nextAccount);
    };

    /*
    |--------------------------------------------------------------------------
    | Process transfer
    |--------------------------------------------------------------------------
    */

    const processTransfer = () => {
        setPinRequired(false);
        setPinError('');
        setStage('processing');

        post(route('customer.transfer.store'), {
            preserveScroll: true,

            onSuccess: () => {
                setTimeout(() => {
                    const generatedReference =
                        'CF' + Date.now().toString().slice(-10);

                    setReference(generatedReference);
                    setCompleted(true);
                    setStage('completed');
                }, 1500);
            },

            onError: () => {
                setStage('form');
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        if (data.bank_name === 'Comericafin') {
            processTransfer();
            return;
        }

        setTransferPin('');
        setPinError('');
        setPinRequired(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Confirm PIN
    |--------------------------------------------------------------------------
    */

    const confirmPin = () => {
        if (!/^\d{4}$/.test(transferPin)) {
            setPinError(
                'Please enter your 4-digit transfer PIN.'
            );

            return;
        }

        processTransfer();
    };

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    if (completed) {
        return (
            <CustomerLayout>
                <Head title="Transfer Completed" />

                <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl">

                        <div className="mb-6">

                            <p className="text-sm font-medium text-gray-500">
                                Transfers
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                                Transfer completed
                            </h1>

                        </div>

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                            <div className="border-b border-gray-200 px-6 py-7 sm:px-8">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">

                                        <Icon
                                            type="check"
                                            size={28}
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            Transfer successful
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Your transfer has been completed.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6 sm:p-8">

                                <div className="rounded-xl border border-gray-200 bg-gray-50">

                                    <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                                        <div className="p-5">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                From Account
                                            </p>

                                            <p className="mt-2 text-sm font-semibold capitalize text-gray-900">
                                                {data.source_account} Account
                                            </p>

                                        </div>

                                        <div className="p-5">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Recipient
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                                {data.recipient_name}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 border-t border-gray-200 sm:grid-cols-2">

                                        <div className="border-b border-gray-200 p-5 sm:border-b-0 sm:border-r">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Destination Account
                                            </p>

                                            <p className="mt-2 text-sm font-semibold capitalize text-gray-900">
                                                {data.account_type}
                                            </p>

                                        </div>

                                        <div className="p-5">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Bank
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                                {data.bank_name}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="border-t border-gray-200 p-5">

                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                            Amount
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-[#51169a]">
                                            {formatCurrency(data.amount)}
                                        </p>

                                    </div>

                                    <div className="grid grid-cols-1 border-t border-gray-200 sm:grid-cols-2">

                                        <div className="border-b border-gray-200 p-5 sm:border-b-0 sm:border-r">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Reference
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                                {reference}
                                            </p>

                                        </div>

                                        <div className="p-5">

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                                Status
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">

                                                <span className="h-2 w-2 rounded-full bg-green-500" />

                                                <span className="text-sm font-semibold text-green-600">
                                                    Completed
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.visit(
                                            route('customer.dashboard')
                                        )
                                    }
                                    className="mt-7 w-full rounded-lg bg-[#51169a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#431180]"
                                >
                                    Return to Dashboard
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </CustomerLayout>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PROCESSING
    |--------------------------------------------------------------------------
    */

    if (stage === 'processing') {
        return (
            <CustomerLayout>
                <Head title="Processing Transfer" />

                <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl">

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                            <div className="px-6 py-14 text-center sm:px-10">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">

                                    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-purple-100 border-t-[#51169a]" />

                                </div>

                                <h1 className="mt-7 text-2xl font-bold text-gray-900">
                                    Processing your transfer
                                </h1>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                                    Please wait while your transfer is being
                                    processed.
                                </p>

                                <div className="mx-auto mt-8 max-w-md">

                                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">

                                        <div className="h-full w-full animate-pulse rounded-full bg-[#51169a]" />

                                    </div>

                                </div>

                                <p className="mt-4 text-xs font-medium text-gray-500">

                                    Processing transfer from{' '}

                                    <span className="font-semibold capitalize text-[#51169a]">
                                        {data.source_account}
                                    </span>

                                    ...

                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </CustomerLayout>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | TRANSFER FORM
    |--------------------------------------------------------------------------
    */

    return (
        <CustomerLayout>
            <Head title="Transfer Money" />

            <div className="min-h-screen bg-white px-4 py-7 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-6xl">

                    {/* HEADER */}

                    <div className="mb-7">

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <span>
                                Move Money
                            </span>

                            <Icon
                                type="chevron"
                                size={15}
                                className="text-gray-400"
                            />

                            <span className="font-medium text-[#51169a]">
                                Transfer Money
                            </span>

                        </div>

                        <div className="mt-4">

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Transfer Money
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                Send funds securely to another Comericafin
                                customer.
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

                        {/* MAIN FORM */}

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-200 px-6 py-5 sm:px-8">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-[#51169a]">

                                        <Icon
                                            type="arrow"
                                            size={20}
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-gray-900">
                                            Transfer details
                                        </h2>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Choose the account and enter the
                                            recipient information.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <form
                                onSubmit={submit}
                                className="p-6 sm:p-8"
                            >

                                {/* SOURCE ACCOUNT */}

                                <div className="mb-8">

                                    <div className="mb-5 flex items-center gap-3">

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51169a] text-sm font-bold text-white">
                                            1
                                        </span>

                                        <div>

                                            <h3 className="text-base font-bold text-gray-900">
                                                From Account
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                Choose which account to send
                                                money from.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                        {/* CHECKING */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSourceAccountChange(
                                                    'checking'
                                                )
                                            }
                                            className={`rounded-xl border p-5 text-left transition ${
                                                sourceAccount === 'checking'
                                                    ? 'border-[#51169a] bg-purple-50 ring-2 ring-[#51169a]/10'
                                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >

                                            <div className="flex items-center justify-between gap-3">

                                                <div>

                                                    <p className="text-sm font-bold text-gray-900">
                                                        Checking Account
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Available balance
                                                    </p>

                                                </div>

                                                <span
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        sourceAccount === 'checking'
                                                            ? 'bg-[#51169a] text-white'
                                                            : 'bg-gray-100 text-gray-400'
                                                    }`}
                                                >
                                                    <Icon
                                                        type="check"
                                                        size={16}
                                                    />
                                                </span>

                                            </div>

                                            <p className="mt-4 text-2xl font-bold text-[#51169a]">
                                                {formatCurrency(
                                                    checkingBalance
                                                )}
                                            </p>

                                        </button>

                                        {/* SAVINGS */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSourceAccountChange(
                                                    'savings'
                                                )
                                            }
                                            className={`rounded-xl border p-5 text-left transition ${
                                                sourceAccount === 'savings'
                                                    ? 'border-[#f0ae18] bg-amber-50 ring-2 ring-[#f0ae18]/10'
                                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >

                                            <div className="flex items-center justify-between gap-3">

                                                <div>

                                                    <p className="text-sm font-bold text-gray-900">
                                                        Savings Account
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Available balance
                                                    </p>

                                                </div>

                                                <span
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        sourceAccount === 'savings'
                                                            ? 'bg-[#f0ae18] text-white'
                                                            : 'bg-gray-100 text-gray-400'
                                                    }`}
                                                >
                                                    <Icon
                                                        type="check"
                                                        size={16}
                                                    />
                                                </span>

                                            </div>

                                            <p className="mt-4 text-2xl font-bold text-[#51169a]">
                                                {formatCurrency(
                                                    savingsBalance
                                                )}
                                            </p>

                                        </button>

                                    </div>

                                    {errors.source_account && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.source_account}
                                        </p>
                                    )}

                                </div>

                                <div className="mb-8 border-t border-gray-200" />

                                {/* RECIPIENT */}

                                <div>

                                    <div className="mb-5 flex items-center gap-3">

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51169a] text-sm font-bold text-white">
                                            2
                                        </span>

                                        <div>

                                            <h3 className="text-base font-bold text-gray-900">
                                                Recipient
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                Who are you sending money to?
                                            </p>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* NAME */}

                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Recipient full name
                                            </label>

                                            <div className="relative">

                                                <Icon
                                                    type="user"
                                                    size={19}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                />

                                                <input
                                                    type="text"
                                                    value={data.recipient_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'recipient_name',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter recipient's full name"
                                                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                    required
                                                />

                                            </div>

                                            {errors.recipient_name && (
                                                <p className="mt-1.5 text-xs text-red-500">
                                                    {errors.recipient_name}
                                                </p>
                                            )}

                                        </div>

                                        {/* BANK */}

                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Bank
                                            </label>

                                            <div className="relative">

                                                <Icon
                                                    type="bank"
                                                    size={19}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                />

                                                <input
                                                    type="text"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Search for a bank"
                                                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                />

                                            </div>

                                            <select
                                                value={data.bank_name}
                                                onChange={(e) => {
                                                    setData(
                                                        'bank_name',
                                                        e.target.value
                                                    );

                                                    setPinRequired(false);
                                                    setPinError('');
                                                }}
                                                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            >

                                                <option value="">
                                                    Select bank
                                                </option>

                                                {filteredBanks.map(
                                                    (bank, index) => (
                                                        <option
                                                            key={`${bank}-${index}`}
                                                            value={bank}
                                                        >
                                                            {bank}
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                            {data.bank_name === 'Comericafin' && (
                                                <div className="mt-3 flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-3">

                                                    <Icon
                                                        type="check"
                                                        size={17}
                                                        className="text-[#51169a]"
                                                    />

                                                    <p className="text-xs font-medium text-[#51169a]">
                                                        Comericafin selected
                                                    </p>

                                                </div>
                                            )}

                                            {errors.bank_name && (
                                                <p className="mt-1.5 text-xs text-red-500">
                                                    {errors.bank_name}
                                                </p>
                                            )}

                                        </div>

                                        {/* ROUTING */}

                                        <div>

                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Routing number
                                            </label>

                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength="9"
                                                value={data.routing_number}
                                                onChange={(e) =>
                                                    setData(
                                                        'routing_number',
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ''
                                                        )
                                                    )
                                                }
                                                placeholder="9-digit number"
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                            {errors.routing_number && (
                                                <p className="mt-1.5 text-xs text-red-500">
                                                    {errors.routing_number}
                                                </p>
                                            )}

                                        </div>

                                        {/* ACCOUNT NUMBER */}

                                        <div>

                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Account number
                                            </label>

                                            <input
                                                type="text"
                                                value={data.account_number}
                                                onChange={(e) =>
                                                    setData(
                                                        'account_number',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Account number"
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                            {errors.account_number && (
                                                <p className="mt-1.5 text-xs text-red-500">
                                                    {errors.account_number}
                                                </p>
                                            )}

                                        </div>

                                        {/* ACCOUNT TYPE */}

                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Recipient account type
                                            </label>

                                            <select
                                                value={data.account_type}
                                                onChange={(e) =>
                                                    setData(
                                                        'account_type',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            >

                                                <option value="checking">
                                                    Checking
                                                </option>

                                                <option value="savings">
                                                    Savings
                                                </option>

                                            </select>

                                            <p className="mt-2 text-xs text-gray-500">
                                                Choose which account of the
                                                recipient should receive the
                                                funds.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="my-8 border-t border-gray-200" />

                                {/* AMOUNT */}

                                <div>

                                    <div className="mb-5 flex items-center gap-3">

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51169a] text-sm font-bold text-white">
                                            3
                                        </span>

                                        <div>

                                            <h3 className="text-base font-bold text-gray-900">
                                                Amount
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                How much would you like to send?
                                            </p>

                                        </div>

                                    </div>

                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Transfer amount
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-gray-400">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                value={data.amount}
                                                onChange={(e) =>
                                                    setData(
                                                        'amount',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0.00"
                                                className="w-full rounded-lg border border-gray-200 bg-white py-4 pl-10 pr-4 text-2xl font-bold text-[#51169a] outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                        </div>

                                        {data.amount && (
                                            <p className="mt-3 text-xs text-gray-500">

                                                You are sending{' '}

                                                <span className="font-semibold text-[#51169a]">
                                                    {formatCurrency(
                                                        data.amount
                                                    )}
                                                </span>{' '}

                                                from your{' '}

                                                <span className="font-semibold capitalize text-[#51169a]">
                                                    {data.source_account}
                                                </span>{' '}

                                                account.

                                            </p>
                                        )}

                                        <p className="mt-2 text-xs text-gray-500">

                                            Available in selected account:{' '}

                                            <span className="font-semibold text-[#51169a]">
                                                {formatCurrency(
                                                    selectedBalance
                                                )}
                                            </span>

                                        </p>

                                        {errors.amount && (
                                            <p className="mt-1.5 text-xs text-red-500">
                                                {errors.amount}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* DESCRIPTION */}

                                <div className="mt-6">

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Description

                                        <span className="ml-1 font-normal text-gray-400">
                                            (optional)
                                        </span>

                                    </label>

                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Add a note for this transfer"
                                        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                    />

                                    {errors.description && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.description}
                                        </p>
                                    )}

                                </div>

                                {/* SECURITY */}

                                <div className="mt-7 flex gap-3 rounded-lg border border-purple-100 bg-purple-50 p-4">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#51169a]">

                                        <Icon
                                            type="shield"
                                            size={18}
                                        />

                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-900">
                                            Secure transfer
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Review the recipient information
                                            carefully before submitting your
                                            transfer.
                                        </p>

                                    </div>

                                </div>

                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-[#51169a] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#431180] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {processing
                                        ? 'Processing...'
                                        : 'Review Transfer'}

                                    {!processing && (
                                        <Icon
                                            type="arrow"
                                            size={18}
                                        />
                                    )}

                                </button>

                            </form>

                        </div>

                        {/* RIGHT SIDEBAR */}

                        <aside className="space-y-5">

                            {/* SELECTED ACCOUNT */}

                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                                <h2 className="text-base font-bold text-gray-900">
                                    Sending From
                                </h2>

                                <div className="mt-5 rounded-xl bg-gray-50 p-4">

                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Account
                                    </p>

                                    <p className="mt-1 text-base font-bold capitalize text-[#51169a]">
                                        {data.source_account} Account
                                    </p>

                                    <p className="mt-3 text-xs text-gray-500">
                                        Available Balance
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#51169a]">
                                        {formatCurrency(selectedBalance)}
                                    </p>

                                </div>

                            </div>

                            {/* SUMMARY */}

                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                                <h2 className="text-base font-bold text-gray-900">
                                    Transfer summary
                                </h2>

                                <div className="mt-5 space-y-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-xs text-gray-500">
                                            From
                                        </span>

                                        <span className="text-right text-xs font-semibold capitalize text-gray-800">
                                            {data.source_account}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-xs text-gray-500">
                                            Recipient
                                        </span>

                                        <span className="max-w-[150px] truncate text-right text-xs font-semibold text-gray-800">
                                            {data.recipient_name || '—'}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-xs text-gray-500">
                                            Destination
                                        </span>

                                        <span className="text-right text-xs font-semibold capitalize text-gray-800">
                                            {data.account_type}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-xs text-gray-500">
                                            Bank
                                        </span>

                                        <span className="max-w-[150px] truncate text-right text-xs font-semibold text-gray-800">
                                            {data.bank_name || '—'}
                                        </span>

                                    </div>

                                    <div className="border-t border-gray-200" />

                                    <div className="flex items-end justify-between gap-4">

                                        <span className="text-xs text-gray-500">
                                            Amount
                                        </span>

                                        <span className="text-xl font-bold text-[#51169a]">
                                            {data.amount
                                                ? formatCurrency(
                                                      data.amount
                                                  )
                                                : '$0.00'}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* HELP */}

                            <div className="rounded-xl border border-gray-200 bg-white p-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-[#51169a]">

                                        <Icon
                                            type="lock"
                                            size={18}
                                        />

                                    </div>

                                    <h3 className="text-sm font-bold text-gray-900">
                                        Stay secure
                                    </h3>

                                </div>

                                <p className="mt-3 text-xs leading-5 text-gray-500">
                                    Never share your password, PIN, or other
                                    account credentials with anyone.
                                </p>

                            </div>

                            {/* STEPS */}

                            <div className="rounded-xl border border-gray-200 bg-white p-5">

                                <h3 className="text-sm font-bold text-gray-900">
                                    Transfer process
                                </h3>

                                <div className="mt-5 space-y-5">

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            1
                                        </div>

                                        <div>

                                            <p className="text-xs font-semibold text-gray-800">
                                                Choose account
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-gray-500">
                                                Select Checking or Savings as
                                                the source account.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            2
                                        </div>

                                        <div>

                                            <p className="text-xs font-semibold text-gray-800">
                                                Enter recipient
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-gray-500">
                                                Provide the recipient's account
                                                information.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            3
                                        </div>

                                        <div>

                                            <p className="text-xs font-semibold text-gray-800">
                                                Enter amount
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-gray-500">
                                                Choose the amount you want to
                                                send.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            4
                                        </div>

                                        <div>

                                            <p className="text-xs font-semibold text-gray-800">
                                                Review and submit
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-gray-500">
                                                Check the details before
                                                completing the transfer.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </div>

            {/* =========================================================
                4-DIGIT PIN OVERLAY
            ========================================================= */}

            {pinRequired && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setPinRequired(false);
                            setTransferPin('');
                            setPinError('');
                        }
                    }}
                >

                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                        {/* HEADER */}

                        <div className="border-b border-gray-200 px-6 py-5">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-[#51169a]">

                                        <Icon
                                            type="lock"
                                            size={21}
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-gray-900">
                                            Confirm Transfer
                                        </h2>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Security verification required
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setPinRequired(false);
                                        setTransferPin('');
                                        setPinError('');
                                    }}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                >

                                    <Icon
                                        type="close"
                                        size={19}
                                    />

                                </button>

                            </div>

                        </div>

                        {/* BODY */}

                        <div className="px-6 py-7">

                            {/* TRANSFER INFORMATION */}

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Transfer amount
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-[#51169a]">
                                            {formatCurrency(data.amount)}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs text-gray-500">
                                            To
                                        </p>

                                        <p className="mt-1 max-w-[150px] truncate text-sm font-semibold text-gray-800">
                                            {data.recipient_name ||
                                                'Recipient'}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-3 border-t border-gray-200 pt-3">

                                    <p className="text-xs text-gray-500">
                                        Destination bank
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {data.bank_name}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-6 text-center">

                                <h3 className="text-base font-semibold text-gray-900">
                                    Enter your 4-digit PIN
                                </h3>

                                <p className="mt-2 text-sm leading-5 text-gray-500">
                                    Enter your transfer PIN to authorize this
                                    transaction.
                                </p>

                            </div>

                            {/* PIN */}

                            <div className="mt-6">

                                <input
                                    type="password"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    maxLength={4}
                                    autoFocus
                                    value={transferPin}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value
                                                .replace(/\D/g, '')
                                                .slice(0, 4);

                                        setTransferPin(value);
                                        setPinError('');

                                    }}
                                    onKeyDown={(e) => {

                                        if (e.key === 'Enter') {
                                            confirmPin();
                                        }

                                    }}
                                    placeholder="••••"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-center text-3xl font-bold tracking-[0.7em] text-gray-900 outline-none placeholder:text-gray-300 focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                />

                                {pinError && (
                                    <p className="mt-3 text-center text-xs font-medium text-red-500">
                                        {pinError}
                                    </p>
                                )}

                            </div>

                            {/* SECURITY NOTICE */}

                            <div className="mt-5 flex gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4">

                                <div className="shrink-0 text-[#51169a]">

                                    <Icon
                                        type="shield"
                                        size={18}
                                    />

                                </div>

                                <p className="text-xs leading-5 text-gray-500">
                                    Never share your transfer PIN with anyone.
                                    Your PIN is used to authorize this
                                    transaction.
                                </p>

                            </div>

                            {/* ACTIONS */}

                            <div className="mt-6 grid grid-cols-2 gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setPinRequired(false);
                                        setTransferPin('');
                                        setPinError('');
                                    }}
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmPin}
                                    disabled={transferPin.length !== 4}
                                    className="rounded-xl bg-[#51169a] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#431180] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                     Transfer
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </CustomerLayout>
    );
}