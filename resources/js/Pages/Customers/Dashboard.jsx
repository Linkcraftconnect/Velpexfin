import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

const formatCurrency = (value) => {
    const amount = Number(value ?? 0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
};

const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'Not available';

    const value = String(accountNumber);

    if (value.length <= 4) return value;

    return `•••• ${value.slice(-4)}`;
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
        case 'transfer':
            return (
                <svg {...common}>
                    <path d="M7 7h13l-3-3" />
                    <path d="m20 7-3 3" />
                    <path d="M17 17H4l3 3" />
                    <path d="m4 17 3-3" />
                </svg>
            );

        case 'document':
            return (
                <svg {...common}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h6" />
                </svg>
            );

        case 'more':
            return (
                <svg {...common}>
                    <circle
                        cx="5"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                    />
                    <circle
                        cx="19"
                        cy="12"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                    />
                </svg>
            );

        case 'checking':
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M7 15h4" />
                </svg>
            );

        case 'savings':
            return (
                <svg {...common}>
                    <path d="M5 10h14a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4Z" />
                    <path d="M7 10V7a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3" />
                    <path d="M8 15h.01" />
                    <path d="M16 15h.01" />
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

        case 'mail':
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                </svg>
            );

        case 'arrow':
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case 'chevron':
            return (
                <svg {...common}>
                    <path d="m9 18 6-6-6-6" />
                </svg>
            );

        case 'card':
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M7 15h4" />
                </svg>
            );

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case 'close':
            return (
                <svg {...common}>
                    <path d="m6 6 12 12" />
                    <path d="m18 6-12 12" />
                </svg>
            );

        case 'eye':
            return (
                <svg {...common}>
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>
            );

        case 'eye-off':
            return (
                <svg {...common}>
                    <path d="m3 3 18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.1 4.1" />
                    <path d="M6.1 6.1C3.6 7.8 2 12 2 12a17.9 17.9 0 0 0 4.2 4.6A10.7 10.7 0 0 0 12 19c1.4 0 2.7-.3 3.9-.8" />
                </svg>
            );

        default:
            return null;
    }
};

export default function Dashboard({ user, transactions = [] }) {
    const [showCardRequest, setShowCardRequest] = useState(false);

    // Independent visibility controls.
    const [showCheckingBalance, setShowCheckingBalance] = useState(true);
    const [showSavingsBalance, setShowSavingsBalance] = useState(true);

    const customerName = user?.name || 'Customer';

    const checkingBalance = formatCurrency(user?.balance);
    const savingsBalance = formatCurrency(user?.savings_balance);

    const accountNumber = maskAccountNumber(user?.account_number);
    const routingNumber = user?.routing_number || 'Not available';

    const displayedCheckingBalance = showCheckingBalance
        ? checkingBalance
        : '••••••••';

    const displayedSavingsBalance = showSavingsBalance
        ? savingsBalance
        : '••••••••';

    return (
        <CustomerLayout user={user}>
            <Head title="Customer Dashboard" />

            <div className="min-h-screen bg-[#eeeeee] text-[#17152b]">
                <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

                    {/* DASHBOARD HEADER */}
                    <section className="relative mb-8 overflow-hidden rounded-[24px] border border-[#8f671d] bg-gradient-to-br from-[#9b741f] via-[#80601a] to-[#5e4512] px-5 py-7 shadow-[0_12px_35px_rgba(80,55,10,0.25)] sm:px-7 lg:px-9">

                        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[34px] border-white/10" />

                        <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full border border-[#fff5c4]/20" />

                        <div className="pointer-events-none absolute -bottom-28 left-[38%] h-56 w-[420px] rotate-[-18deg] rounded-full border-t border-white/15" />

                        <div className="pointer-events-none absolute bottom-[-90px] left-[45%] h-52 w-[390px] rotate-[-18deg] rounded-full border-t border-white/10" />

                        <div className="pointer-events-none absolute left-[-100px] top-[-110px] h-64 w-64 rounded-full border-[28px] border-white/10" />

                        <div className="relative z-10">

                            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5d98a]">
                                        Customer Dashboard
                                    </p>

                                    <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                        Your Accounts
                                    </h1>

                                    <p className="mt-1 text-sm font-medium text-[#ead9a8] sm:text-base">
                                        Manage your accounts, transfers and recent activity.
                                    </p>
                                </div>

                                {/* ACCOUNT STATUS */}
                                <div className="flex items-center gap-3 self-start rounded-2xl border border-white/30 bg-white/10 px-5 py-3 shadow-sm backdrop-blur-sm lg:self-center">

                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                                        <span className="h-3 w-3 rounded-full bg-[#18a85b] shadow-[0_0_0_4px_rgba(24,168,91,0.12)]" />
                                    </span>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#ead9a8]">
                                            Account Status
                                        </p>

                                        <p className="mt-0.5 text-sm font-extrabold text-white">
                                            Active
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-7 flex items-center gap-3">

                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-white/10" />

                                <div className="h-2 w-2 rotate-45 border border-white/60 bg-[#b28a32]" />

                                <div className="h-px w-20 bg-white/30" />

                                <div className="h-2 w-2 rotate-45 border border-white/60 bg-[#b28a32]" />

                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/40 to-transparent" />

                            </div>

                            {/* QUICK ACTIONS */}
                            <div className="mt-7">

                                <div className="mb-4 flex items-center gap-3">

                                    <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                                        Quick Actions
                                    </h2>

                                    <div className="h-px flex-1 bg-white/25" />

                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                    <Link
                                        href={route('customer.transfer')}
                                        className="group flex min-h-[105px] items-center rounded-2xl border border-white/70 bg-white/95 p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                                    >
                                        <span className="mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5d17a3] to-[#35106e] text-white shadow-md">
                                            <Icon type="transfer" size={24} />
                                        </span>

                                        <span className="flex-1">
                                            <span className="block text-base font-bold text-[#211832]">
                                                Transfer Money
                                            </span>

                                            <span className="mt-1 block text-sm text-[#686175]">
                                                Send money securely to another account
                                            </span>
                                        </span>

                                        <Icon
                                            type="chevron"
                                            size={20}
                                            className="text-[#6b6376] transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>

                                    <Link
                                        href="/customer/statements"
                                        className="group flex min-h-[105px] items-center rounded-2xl border border-white/70 bg-white/95 p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                                    >
                                        <span className="mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5d17a3] to-[#35106e] text-white shadow-md">
                                            <Icon type="document" size={24} />
                                        </span>

                                        <span className="flex-1">
                                            <span className="block text-base font-bold text-[#211832]">
                                                Statements
                                            </span>

                                            <span className="mt-1 block text-sm text-[#686175]">
                                                View and download your statements
                                            </span>
                                        </span>

                                        <Icon
                                            type="chevron"
                                            size={20}
                                            className="text-[#6b6376] transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>

                                    <Link
                                        href="/"
                                        className="group flex min-h-[105px] items-center rounded-2xl border border-white/70 bg-white/95 p-5 text-left shadow-md transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                                    >
                                        <span className="mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5d17a3] to-[#35106e] text-white shadow-md">
                                            <Icon type="more" size={25} />
                                        </span>

                                        <span className="flex-1">
                                            <span className="block text-base font-bold text-[#211832]">
                                                More
                                            </span>

                                            <span className="mt-1 block text-sm text-[#686175]">
                                                More services and options
                                            </span>
                                        </span>

                                        <Icon
                                            type="chevron"
                                            size={20}
                                            className="text-[#6b6376] transition-transform group-hover:translate-x-1"
                                        />
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </section>

                    {/* MAIN CONTENT */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

                        <div>

                            {/* ACCOUNTS */}
                            <section className="mb-6">

                                <div className="mb-4 flex items-center justify-between">

                                    <h2 className="text-2xl font-bold text-[#3f147a]">
                                        My Accounts
                                    </h2>

                                    <div className="ml-6 hidden h-px flex-1 bg-gradient-to-r from-[#d9c6e8] to-transparent sm:block" />

                                </div>

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                                    {/* CHECKING */}
                                    <div className="overflow-hidden rounded-2xl border border-[#d8d8d8] bg-white shadow-sm transition hover:shadow-md">

                                        <div className="p-6">

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="flex items-center">

                                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#5d17a3] to-[#35106e] text-white shadow-md">
                                                        <Icon
                                                            type="checking"
                                                            size={22}
                                                        />
                                                    </span>

                                                    <div className="ml-4">

                                                        <h3 className="text-base font-bold text-[#19162c]">
                                                            Checking Account
                                                        </h3>

                                                        <p className="mt-1 text-sm text-[#625d73]">
                                                            {accountNumber}
                                                        </p>

                                                    </div>

                                                </div>

                                                <span className="rounded-full bg-[#e9f9f0] px-3 py-1 text-xs font-semibold text-[#16834b]">
                                                    Active
                                                </span>

                                            </div>

                                            <div className="mt-8">

                                                <div className="flex items-center gap-2">

                                                    <p className="text-xs font-medium text-[#6b6579]">
                                                        Available Balance
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowCheckingBalance(
                                                                (current) => !current
                                                            )
                                                        }
                                                        aria-label={
                                                            showCheckingBalance
                                                                ? 'Hide checking balance'
                                                                : 'Show checking balance'
                                                        }
                                                        title={
                                                            showCheckingBalance
                                                                ? 'Hide checking balance'
                                                                : 'Show checking balance'
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-md text-[#625d73] transition hover:bg-[#f3eef8] hover:text-[#51169a]"
                                                    >
                                                        <Icon
                                                            type={
                                                                showCheckingBalance
                                                                    ? 'eye'
                                                                    : 'eye-off'
                                                            }
                                                            size={17}
                                                        />
                                                    </button>

                                                </div>

                                                <p
                                                    className={`mt-1 font-bold text-[#40127e] ${
                                                        showCheckingBalance
                                                            ? 'text-3xl'
                                                            : 'text-2xl tracking-[0.18em]'
                                                    }`}
                                                >
                                                    {displayedCheckingBalance}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between border-t-2 border-[#5515a0] bg-gradient-to-r from-[#fbf8fe] to-white px-6 py-4">

                                            <span className="text-xs text-[#777080]">
                                                Checking funds
                                            </span>

                                            <Link
                                                href="/customer/transfer?source=checking"
                                                className="flex items-center gap-2 rounded-lg bg-[#4d1490] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3f1077]"
                                            >
                                                Transfer
                                                <Icon type="arrow" size={16} />
                                            </Link>

                                        </div>
                                    </div>

                                    {/* SAVINGS */}
                                    <div className="overflow-hidden rounded-2xl border border-[#d8d8d8] bg-white shadow-sm transition hover:shadow-md">

                                        <div className="p-6">

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="flex items-center">

                                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#b28a32] to-[#765815] text-white shadow-md">
                                                        <Icon
                                                            type="savings"
                                                            size={22}
                                                        />
                                                    </span>

                                                    <div className="ml-4">

                                                        <h3 className="text-base font-bold text-[#19162c]">
                                                            Savings Account
                                                        </h3>

                                                        <p className="mt-1 text-sm text-[#625d73]">
                                                            Savings
                                                        </p>

                                                    </div>

                                                </div>

                                                <span className="rounded-full bg-[#e9f9f0] px-3 py-1 text-xs font-semibold text-[#16834b]">
                                                    Active
                                                </span>

                                            </div>

                                            <div className="mt-8">

                                                <div className="flex items-center gap-2">

                                                    <p className="text-xs font-medium text-[#6b6579]">
                                                        Available Balance
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowSavingsBalance(
                                                                (current) => !current
                                                            )
                                                        }
                                                        aria-label={
                                                            showSavingsBalance
                                                                ? 'Hide savings balance'
                                                                : 'Show savings balance'
                                                        }
                                                        title={
                                                            showSavingsBalance
                                                                ? 'Hide savings balance'
                                                                : 'Show savings balance'
                                                        }
                                                        className="flex h-7 w-7 items-center justify-center rounded-md text-[#625d73] transition hover:bg-[#f3eef8] hover:text-[#51169a]"
                                                    >
                                                        <Icon
                                                            type={
                                                                showSavingsBalance
                                                                    ? 'eye'
                                                                    : 'eye-off'
                                                            }
                                                            size={17}
                                                        />
                                                    </button>

                                                </div>

                                                <p
                                                    className={`mt-1 font-bold text-[#40127e] ${
                                                        showSavingsBalance
                                                            ? 'text-3xl'
                                                            : 'text-2xl tracking-[0.18em]'
                                                    }`}
                                                >
                                                    {displayedSavingsBalance}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between border-t-2 border-[#9a751f] bg-gradient-to-r from-[#faf7ef] to-white px-6 py-4">

                                            <span className="text-xs text-[#777080]">
                                                Savings funds
                                            </span>

                                            <Link
                                                href="/customer/transfer?source=savings"
                                                className="flex items-center gap-2 rounded-lg bg-[#8a691d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#725617]"
                                            >
                                                Transfer
                                                <Icon type="arrow" size={16} />
                                            </Link>

                                        </div>
                                    </div>

                                </div>
                            </section>

                            {/* CARD + ACTIVITY */}
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                                {/* CARD */}
                                <section className="rounded-2xl border border-[#d8d8d8] bg-white p-6 shadow-sm">

                                    <div className="flex flex-col gap-6">

                                        <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#37106d] via-[#511494] to-[#261044] p-5 text-white shadow-lg">

                                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[20px] border-white/5" />

                                            <div className="absolute -bottom-24 -left-16 h-40 w-72 rotate-[-20deg] border-t border-white/10" />

                                            <div className="relative flex items-start justify-between">

                                                <div className="flex items-center gap-2">

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-white">
                                                        <Icon
                                                            type="shield"
                                                            size={22}
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-bold tracking-[0.14em] text-white">
                                                            COMERICAFIN
                                                        </p>

                                                        <p className="text-[7px] tracking-[0.2em] text-[#f5c842]">
                                                            BANK
                                                        </p>
                                                    </div>

                                                </div>

                                                <span className="text-xs font-medium uppercase tracking-wider text-white/60">
                                                    Debit
                                                </span>

                                            </div>

                                            <div className="absolute left-5 top-[78px]">

                                                <div className="relative h-[31px] w-[43px] overflow-hidden rounded-md border border-[#c99b29] bg-gradient-to-br from-[#ffe48a] via-[#e5b83e] to-[#a9780f]">

                                                    <div className="absolute left-1/2 top-0 h-full w-px bg-[#9b741d]/70" />

                                                    <div className="absolute left-0 top-1/2 h-px w-full bg-[#9b741d]/70" />

                                                    <div className="absolute left-2 top-2 h-[10px] w-[15px] rounded-sm border border-[#9b741d]/70" />

                                                </div>

                                            </div>

                                            <div className="absolute left-5 top-[120px]">

                                                <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                                                    Card Number
                                                </p>

                                                <p className="mt-1 text-[14px] font-medium tracking-[0.22em] text-white">
                                                    •••• •••• •••• 0000
                                                </p>

                                            </div>

                                            <div className="absolute bottom-5 left-5">

                                                <p className="text-[7px] uppercase tracking-[0.16em] text-white/45">
                                                    Cardholder
                                                </p>

                                                <p className="mt-1 max-w-[210px] truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                                                    {customerName}
                                                </p>

                                            </div>

                                            <div className="absolute bottom-5 right-5 text-right">

                                                <p className="text-[7px] uppercase tracking-[0.16em] text-white/45">
                                                    Account
                                                </p>

                                                <p className="mt-1 text-[9px] font-semibold tracking-[0.12em] text-white/85">
                                                    {maskAccountNumber(
                                                        user?.account_number
                                                    )}
                                                </p>

                                            </div>

                                            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#765815] via-[#c6a14a] to-[#765815]" />

                                        </div>

                                        <div>

                                            <div className="flex items-center gap-2">

                                                <Icon
                                                    type="card"
                                                    size={21}
                                                    className="text-[#501694]"
                                                />

                                                <h3 className="font-bold text-[#35106e]">
                                                    Comericafin Card
                                                </h3>

                                            </div>

                                            <p className="mt-3 text-sm leading-6 text-[#625d73]">
                                                Request a Comericafin card for
                                                your account.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCardRequest(true)
                                                }
                                                className="mt-5 w-full rounded-lg border border-[#a47c22] bg-white px-4 py-3 text-sm font-semibold text-[#806019] transition hover:bg-[#faf7ef]"
                                            >
                                                Request Card Delivery
                                            </button>

                                        </div>

                                    </div>
                                </section>

                                {/* RECENT ACTIVITY */}
                                <section className="rounded-2xl border border-[#d8d8d8] bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <h3 className="font-bold text-[#42117f]">
                                            Recent Activity
                                        </h3>

                                        <Link
                                            href={route(
                                                'customer.transactions'
                                            )}
                                            className="text-xs font-semibold text-[#4d1490] hover:underline"
                                        >
                                            View all
                                        </Link>

                                    </div>

                                    <div className="mt-4 border-t border-[#eeeaf1]" />

                                    {transactions && transactions.length > 0 ? (
                                        <div className="mt-4 space-y-3">

                                            {transactions.map((transaction) => (
                                                <div
                                                    key={transaction.id}
                                                    className="flex items-center justify-between rounded-xl border border-[#eeeaf1] bg-[#fcfbfd] p-4"
                                                >

                                                    <div className="flex min-w-0 items-center gap-3">

                                                        <div
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                                                transaction.type ===
                                                                'credit'
                                                                    ? 'bg-[#e9f9f0] text-[#16834b]'
                                                                    : 'bg-[#f4eafa] text-[#51169a]'
                                                            }`}
                                                        >
                                                            <Icon
                                                                type="transfer"
                                                                size={18}
                                                            />
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="truncate text-sm font-semibold text-[#211c32]">
                                                                {transaction.type ===
                                                                'credit'
                                                                    ? `Received from ${
                                                                          transaction.sender_name ||
                                                                          'Customer'
                                                                      }`
                                                                    : `Transfer to ${
                                                                          transaction.recipient_name ||
                                                                          'Customer'
                                                                      }`}
                                                            </p>

                                                            <p className="mt-1 truncate text-xs text-[#716b7d]">
                                                                {transaction.description ||
                                                                    transaction.reference ||
                                                                    'Virtual transfer'}
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-[#938ca0]">
                                                                {transaction.created_at
                                                                    ? new Date(
                                                                          transaction.created_at
                                                                      ).toLocaleDateString(
                                                                          'en-US',
                                                                          {
                                                                              month: 'short',
                                                                              day: 'numeric',
                                                                              year: 'numeric',
                                                                          }
                                                                      )
                                                                    : ''}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <div className="ml-4 shrink-0 text-right">

                                                        <p
                                                            className={`text-sm font-bold ${
                                                                transaction.type ===
                                                                'credit'
                                                                    ? 'text-[#16834b]'
                                                                    : 'text-[#c43d4b]'
                                                            }`}
                                                        >
                                                            {transaction.type ===
                                                            'credit'
                                                                ? '+'
                                                                : '-'}
                                                            {formatCurrency(
                                                                transaction.amount
                                                            )}
                                                        </p>

                                                        <span
                                                            className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-semibold ${
                                                                transaction.status ===
                                                                'completed'
                                                                    ? 'bg-[#e9f9f0] text-[#16834b]'
                                                                    : transaction.status ===
                                                                      'pending'
                                                                    ? 'bg-[#fff6df] text-[#a66a00]'
                                                                    : 'bg-[#fdecec] text-[#c43d4b]'
                                                            }`}
                                                        >
                                                            {transaction.status
                                                                ? transaction.status
                                                                      .charAt(0)
                                                                      .toUpperCase() +
                                                                  transaction.status.slice(
                                                                      1
                                                                  )
                                                                : 'Completed'}
                                                        </span>

                                                    </div>

                                                </div>
                                            ))}

                                        </div>
                                    ) : (
                                        <div className="flex min-h-[250px] flex-col items-center justify-center text-center">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ebfa] text-[#51169a]">
                                                <Icon
                                                    type="document"
                                                    size={23}
                                                />
                                            </div>

                                            <p className="mt-3 text-sm font-semibold text-[#29243a]">
                                                No recent activity
                                            </p>

                                            <p className="mt-1 max-w-[250px] text-xs leading-5 text-[#716b7d]">
                                                Your recent transactions will
                                                appear here.
                                            </p>

                                        </div>
                                    )}

                                </section>

                            </div>
                        </div>

                        {/* ACCOUNT SUMMARY */}
                        <aside className="h-fit rounded-2xl border border-[#d8d8d8] bg-white p-6 shadow-sm xl:sticky xl:top-6">

                            <h2 className="text-xl font-bold text-[#42117f]">
                                Account Summary
                            </h2>

                            <div className="mt-4 h-px bg-gradient-to-r from-[#d9c6e8] to-transparent" />

                            <div className="space-y-6 pt-5">

                                <div className="flex gap-4">

                                    <Icon
                                        type="user"
                                        size={22}
                                        className="text-[#4d4960]"
                                    />

                                    <div>
                                        <p className="text-xs text-[#6c6678]">
                                            Account Holder
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#211c32]">
                                            {customerName}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <Icon
                                        type="account"
                                        size={22}
                                        className="text-[#4d4960]"
                                    />

                                    <div>

                                        <p className="text-xs text-[#6c6678]">
                                            Account Number
                                        </p>

                                        <p className="mt-1 break-all text-sm font-semibold text-[#211c32]">
                                            {user?.account_number ||
                                                'Not available'}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <Icon
                                        type="routing"
                                        size={22}
                                        className="text-[#4d4960]"
                                    />

                                    <div>

                                        <p className="text-xs text-[#6c6678]">
                                            Routing Number
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#211c32]">
                                            {routingNumber}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <Icon
                                        type="mail"
                                        size={22}
                                        className="text-[#4d4960]"
                                    />

                                    <div className="min-w-0">

                                        <p className="text-xs text-[#6c6678]">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all text-sm font-semibold text-[#211c32]">
                                            {user?.email ||
                                                'Not available'}
                                        </p>

                                    </div>

                                </div>

                                {user?.phone && (
                                    <div className="flex gap-4">

                                        <Icon
                                            type="user"
                                            size={22}
                                            className="text-[#4d4960]"
                                        />

                                        <div>

                                            <p className="text-xs text-[#6c6678]">
                                                Phone
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-[#211c32]">
                                                {user.phone}
                                            </p>

                                        </div>

                                    </div>
                                )}

                            </div>

                            <Link
                                href="/customer/profile"
                                className="mt-7 block w-full rounded-lg bg-gradient-to-r from-[#51169a] to-[#35106e] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:from-[#431180] hover:to-[#2c095d]"
                            >
                                View Account Details
                            </Link>

                        </aside>
                    </div>

                    {/* SECURITY NOTICE */}
                    <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#e4e4e4] p-5">

                        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-30">

                            <div className="absolute right-10 top-[-35px] h-28 w-56 rotate-[-18deg] border-t border-[#8e64ae]" />

                            <div className="absolute right-[-30px] top-10 h-28 w-56 rotate-[-18deg] border-t border-[#8e64ae]" />

                        </div>

                        <div className="relative flex items-start gap-3">

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5a1b99] to-[#35106e] text-white">
                                <Icon type="shield" size={18} />
                            </span>

                            <div>

                                <p className="text-sm font-semibold text-[#35106e]">
                                    Your account is secure
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#655d72]">
                                    Keep your Comericafin account information private and never share your password.
                                </p>

                            </div>

                        </div>
                    </div>

                </div>

                {/* CARD REQUEST MODAL */}
                {showCardRequest && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setShowCardRequest(false);
                            }
                        }}
                    >

                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                            <div className="flex items-start justify-between">

                                <div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1e8fb] text-[#51169a]">
                                        <Icon type="card" size={22} />
                                    </div>

                                    <h3 className="mt-4 text-xl font-bold text-[#35106e]">
                                        Request Comericafin Card
                                    </h3>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCardRequest(false)
                                    }
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                                >
                                    <Icon type="close" size={20} />
                                </button>

                            </div>

                            <p className="mt-4 text-sm leading-6 text-[#625d73]">
                                Your card delivery request has been sent to
                                the administrator for processing.
                            </p>

                            <div className="mt-5 rounded-xl border border-[#e5d9f0] bg-[#f7f0fc] p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-white">
                                        ✓
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-[#35106e]">
                                            Request Submitted
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-[#665f73]">
                                            Your request has been successfully
                                            submitted.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCardRequest(false)
                                }
                                className="mt-6 w-full rounded-lg bg-[#51169a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#431180]"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </CustomerLayout>
    );
}