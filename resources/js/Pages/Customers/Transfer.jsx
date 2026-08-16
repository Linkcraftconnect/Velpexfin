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

        case 'money':
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M7 9h.01" />
                    <path d="M17 15h.01" />
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

        default:
            return null;
    }
};

export default function Transfer() {
    const [search, setSearch] = useState('');
    const [pinRequired, setPinRequired] = useState(false);
    const [stage, setStage] = useState('form');
    const [completed, setCompleted] = useState(false);
    const [reference, setReference] = useState('');

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

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        recipient_name: '',
        bank_name: '',
        routing_number: '',
        account_number: '',
        account_type: 'checking',
        amount: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.bank_name !== 'Comericafin') {
            setPinRequired(true);
            return;
        }

        setPinRequired(false);

        post(route('customer.transfer.store'), {
            preserveScroll: true,

            onSuccess: () => {
                setStage('processing');

                setTimeout(() => {
                    const generatedReference =
                        'CF' + Date.now().toString().slice(-10);

                    setReference(generatedReference);
                    setCompleted(true);
                    setStage('completed');
                }, 5000);
            },

            onError: () => {
                setStage('form');
            },
        });
    };

    /*
     * SUCCESS
     */
    if (completed) {
        return (
            <CustomerLayout>
                <Head title="Transfer Completed" />

                <div className="min-h-screen bg-[#f7f7f8] px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">

                        <div className="mb-6">
                            <p className="text-sm font-medium text-[#6b6b72]">
                                Transfers
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#35106e]">
                                Transfer completed
                            </h1>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-[#dedee3] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">

                            <div className="border-b border-[#e7e7eb] px-6 py-7 sm:px-8">
                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5ed] text-[#167544]">
                                        <Icon
                                            type="check"
                                            size={28}
                                            strokeWidth={2.5}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-[#242329]">
                                            Transfer successful
                                        </h2>

                                        <p className="mt-1 text-sm text-[#686770]">
                                            Your transfer has been completed.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="p-6 sm:p-8">

                                <div className="rounded-lg border border-[#e3e3e7] bg-[#fafafa]">

                                    <div className="grid grid-cols-1 divide-y divide-[#e3e3e7] sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                                        <div className="p-5">
                                            <p className="text-xs font-medium uppercase tracking-wide text-[#777780]">
                                                Recipient
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-[#26242b]">
                                                {data.recipient_name}
                                            </p>
                                        </div>

                                        <div className="p-5">
                                            <p className="text-xs font-medium uppercase tracking-wide text-[#777780]">
                                                Bank
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-[#26242b]">
                                                {data.bank_name}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="border-t border-[#e3e3e7] p-5">
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#777780]">
                                            Amount
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-[#35106e]">
                                            {formatCurrency(data.amount)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 border-t border-[#e3e3e7] sm:grid-cols-2">

                                        <div className="border-b border-[#e3e3e7] p-5 sm:border-b-0 sm:border-r">
                                            <p className="text-xs font-medium uppercase tracking-wide text-[#777780]">
                                                Reference
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-[#26242b]">
                                                {reference}
                                            </p>
                                        </div>

                                        <div className="p-5">
                                            <p className="text-xs font-medium uppercase tracking-wide text-[#777780]">
                                                Status
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-[#16804b]" />

                                                <span className="text-sm font-semibold text-[#16804b]">
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
     * PROCESSING
     */
    if (stage === 'processing') {
        return (
            <CustomerLayout>
                <Head title="Processing Transfer" />

                <div className="min-h-screen bg-[#f7f7f8] px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl">

                        <div className="overflow-hidden rounded-xl border border-[#dedee3] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">

                            <div className="px-6 py-14 text-center sm:px-10">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f1ebf8]">
                                    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#d9cbea] border-t-[#51169a]" />
                                </div>

                                <h1 className="mt-7 text-2xl font-bold text-[#35106e]">
                                    Processing your transfer
                                </h1>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#66656c]">
                                    Please wait while your transfer is being
                                    processed.
                                </p>

                                <div className="mx-auto mt-8 max-w-md">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-[#e9e9ec]">
                                        <div className="h-full w-full animate-pulse rounded-full bg-[#51169a]" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs font-medium text-[#777780]">
                                    Processing transfer...
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        );
    }

    /*
     * TRANSFER FORM
     */
    return (
        <CustomerLayout>
            <Head title="Transfer Money" />

            <div className="min-h-screen bg-[#f7f7f8] px-4 py-7 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-6xl">

                    {/* Page Header */}
                    <div className="mb-7">

                        <div className="flex items-center gap-2 text-sm text-[#777780]">
                            <span>Move Money</span>

                            <Icon
                                type="chevron"
                                size={15}
                                className="text-[#aaaab0]"
                            />

                            <span className="font-medium text-[#51169a]">
                                Transfer Money
                            </span>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-3xl font-bold tracking-tight text-[#29262f] sm:text-4xl">
                                Transfer Money
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#696870]">
                                Send money securely to another Comericafin
                                customer.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

                        {/* Main Form */}
                        <div className="overflow-hidden rounded-xl border border-[#dedee3] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

                            {/* Section Header */}
                            <div className="border-b border-[#e6e6ea] px-6 py-5 sm:px-8">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1eafa] text-[#51169a]">
                                        <Icon
                                            type="arrow"
                                            size={20}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-[#29262f]">
                                            Transfer details
                                        </h2>

                                        <p className="mt-0.5 text-xs text-[#777780]">
                                            Enter the information below.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <form
                                onSubmit={submit}
                                className="p-6 sm:p-8"
                            >

                                {/* PIN Alert */}
                                {pinRequired && (
                                    <div className="mb-7 rounded-lg border border-[#ead9a7] bg-[#fffaf0] p-4">

                                        <div className="flex gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7e9bb] text-[#916b00]">
                                                <Icon
                                                    type="lock"
                                                    size={17}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-[#6f5400]">
                                                    Transfer PIN required
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-[#806b2b]">
                                                    A Transfer PIN is required
                                                    for this destination.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                )}

                                {/* Recipient Section */}
                                <div>

                                    <div className="mb-5 flex items-center gap-3">

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51169a] text-sm font-bold text-white">
                                            1
                                        </span>

                                        <div>
                                            <h3 className="text-base font-bold text-[#29262f]">
                                                Recipient
                                            </h3>

                                            <p className="text-xs text-[#777780]">
                                                Who are you sending money to?
                                            </p>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* Name */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
                                                Recipient full name
                                            </label>

                                            <div className="relative">
                                                <Icon
                                                    type="user"
                                                    size={19}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8890]"
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
                                                    className="w-full rounded-lg border border-[#d7d7dc] bg-white py-3.5 pl-11 pr-4 text-sm text-[#29262f] outline-none transition placeholder:text-[#aaa9ae] focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                    required
                                                />
                                            </div>

                                            {errors.recipient_name && (
                                                <p className="mt-1.5 text-xs text-red-600">
                                                    {errors.recipient_name}
                                                </p>
                                            )}

                                        </div>

                                        {/* Bank */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
                                                Bank
                                            </label>

                                            <div className="relative">

                                                <Icon
                                                    type="bank"
                                                    size={19}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8890]"
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
                                                    className="w-full rounded-lg border border-[#d7d7dc] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#aaa9ae] focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
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
                                                }}
                                                className="mt-2 w-full rounded-lg border border-[#d7d7dc] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
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

                                            {data.bank_name ===
                                                'Comericafin' && (
                                                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f6f1fa] px-4 py-3">

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

                                        </div>

                                        {/* Routing */}
                                        <div>

                                            <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
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
                                                className="w-full rounded-lg border border-[#d7d7dc] px-4 py-3.5 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                            {errors.routing_number && (
                                                <p className="mt-1.5 text-xs text-red-600">
                                                    {errors.routing_number}
                                                </p>
                                            )}

                                        </div>

                                        {/* Account Number */}
                                        <div>

                                            <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
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
                                                className="w-full rounded-lg border border-[#d7d7dc] px-4 py-3.5 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                            {errors.account_number && (
                                                <p className="mt-1.5 text-xs text-red-600">
                                                    {errors.account_number}
                                                </p>
                                            )}

                                        </div>

                                        {/* Account Type */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
                                                Account type
                                            </label>

                                            <select
                                                value={data.account_type}
                                                onChange={(e) =>
                                                    setData(
                                                        'account_type',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-[#d7d7dc] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            >
                                                <option value="checking">
                                                    Checking
                                                </option>

                                                <option value="savings">
                                                    Savings
                                                </option>
                                            </select>

                                        </div>

                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="my-8 border-t border-[#e8e8eb]" />

                                {/* Amount Section */}
                                <div>

                                    <div className="mb-5 flex items-center gap-3">

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51169a] text-sm font-bold text-white">
                                            2
                                        </span>

                                        <div>
                                            <h3 className="text-base font-bold text-[#29262f]">
                                                Amount
                                            </h3>

                                            <p className="text-xs text-[#777780]">
                                                How much would you like to send?
                                            </p>
                                        </div>

                                    </div>

                                    <div className="rounded-xl border border-[#dedee3] bg-[#fafafa] p-5">

                                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-[#777780]">
                                            Transfer amount
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-[#777780]">
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
                                                className="w-full rounded-lg border border-[#d2d2d7] bg-white py-4 pl-10 pr-4 text-2xl font-bold text-[#35106e] outline-none focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                                required
                                            />

                                        </div>

                                        {data.amount && (
                                            <p className="mt-3 text-xs text-[#777780]">
                                                You are sending{' '}
                                                <span className="font-semibold text-[#35106e]">
                                                    {formatCurrency(
                                                        data.amount
                                                    )}
                                                </span>
                                            </p>
                                        )}

                                        {errors.amount && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {errors.amount}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* Description */}
                                <div className="mt-6">

                                    <label className="mb-2 block text-sm font-semibold text-[#3e3c44]">
                                        Description
                                        <span className="ml-1 font-normal text-[#96959b]">
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
                                        className="w-full resize-none rounded-lg border border-[#d7d7dc] px-4 py-3.5 text-sm outline-none placeholder:text-[#aaa9ae] focus:border-[#51169a] focus:ring-2 focus:ring-[#51169a]/10"
                                    />

                                </div>

                                {/* Security Notice */}
                                <div className="mt-7 flex gap-3 rounded-lg border border-[#e3d9ec] bg-[#f8f4fb] p-4">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9def3] text-[#51169a]">
                                        <Icon
                                            type="shield"
                                            size={18}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#35106e]">
                                            Secure transfer
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-[#6f6978]">
                                            Review the recipient information
                                            carefully before submitting your
                                            transfer.
                                        </p>
                                    </div>

                                </div>

                                {/* Submit */}
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

                        {/* Right Sidebar */}
                        <aside className="space-y-5">

                            {/* Transfer Summary */}
                            <div className="rounded-xl border border-[#dedee3] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

                                <h2 className="text-base font-bold text-[#29262f]">
                                    Transfer summary
                                </h2>

                                <div className="mt-5 space-y-4">

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs text-[#777780]">
                                            Recipient
                                        </span>

                                        <span className="max-w-[150px] truncate text-right text-xs font-semibold text-[#29262f]">
                                            {data.recipient_name || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs text-[#777780]">
                                            Bank
                                        </span>

                                        <span className="max-w-[150px] truncate text-right text-xs font-semibold text-[#29262f]">
                                            {data.bank_name || '—'}
                                        </span>
                                    </div>

                                    <div className="border-t border-[#e8e8eb]" />

                                    <div className="flex items-end justify-between gap-4">

                                        <span className="text-xs text-[#777780]">
                                            Amount
                                        </span>

                                        <span className="text-xl font-bold text-[#35106e]">
                                            {data.amount
                                                ? formatCurrency(data.amount)
                                                : '$0.00'}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Help */}
                            <div className="rounded-xl border border-[#dedee3] bg-white p-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1eafa] text-[#51169a]">
                                        <Icon
                                            type="lock"
                                            size={18}
                                        />
                                    </div>

                                    <h3 className="text-sm font-bold text-[#29262f]">
                                        Stay secure
                                    </h3>

                                </div>

                                <p className="mt-3 text-xs leading-5 text-[#707078]">
                                    Never share your password, PIN, or other
                                    account credentials with anyone.
                                </p>

                            </div>

                            {/* Steps */}
                            <div className="rounded-xl border border-[#dedee3] bg-white p-5">

                                <h3 className="text-sm font-bold text-[#29262f]">
                                    Transfer process
                                </h3>

                                <div className="mt-5 space-y-5">

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            1
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-[#29262f]">
                                                Enter recipient
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-[#777780]">
                                                Provide the recipient's account
                                                information.
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            2
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-[#29262f]">
                                                Enter amount
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-[#777780]">
                                                Choose the amount you want to
                                                send.
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex gap-3">

                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-xs font-bold text-white">
                                            3
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-[#29262f]">
                                                Review and submit
                                            </p>

                                            <p className="mt-1 text-[11px] leading-4 text-[#777780]">
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
        </CustomerLayout>
    );
}
