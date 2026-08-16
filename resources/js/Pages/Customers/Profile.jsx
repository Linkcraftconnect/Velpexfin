import React from 'react';
import { Head, Link } from '@inertiajs/react';

const Icon = ({ name, size = 21, strokeWidth = 1.8, className = '' }) => {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className,
        'aria-hidden': true,
    };

    switch (name) {
        case 'user':
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case 'mail':
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                </svg>
            );

        case 'phone':
            return (
                <svg {...common}>
                    <path d="M6.5 3.5h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 5.5a2 2 0 0 1 2-2Z" />
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

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
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
                    <path d="m12 19-7-7 7-7" />
                </svg>
            );

        default:
            return null;
    }
};

const formatCurrency = (value) => {
    const number = Number(value ?? 0);

    if (Number.isNaN(number)) {
        return '$0.00';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 rounded-xl border border-[#eeeaf2] bg-[#fcfbfd] p-4 transition hover:border-[#dfd1ec] hover:bg-[#faf7fd]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0e7f8] text-[#51169a]">
            <Icon name={icon} size={19} />
        </div>

        <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-[#81798e]">
                {label}
            </p>

            <p className="mt-1.5 break-words text-sm font-semibold text-[#211c32]">
                {value || 'Not available'}
            </p>
        </div>
    </div>
);

export default function Profile({ user }) {
    const customerName = user?.name || 'Customer';

    const initials = customerName
        .split(' ')
        .filter(Boolean)
        .map((name) => name.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const isActive = user?.status === 'active';

    return (
        <>
            <Head title="My Profile" />

            <div className="min-h-full bg-[#faf9fc] text-[#17152b]">

                {/* =====================================================
                    COMERICAFIN BRAND HEADER
                ====================================================== */}
                <div className="border-b border-[#e8e1ef] bg-white">
                    <div className="mx-auto flex w-full max-w-[1450px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                        <Link
                            href={route('customer.dashboard')}
                            className="group flex items-center gap-3"
                        >
                            {/* Logo Mark */}
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#35106e] via-[#51169a] to-[#6d2ab4] shadow-[0_5px_15px_rgba(81,22,154,0.20)]">

                                {/* Gold C-style mark */}
                                <div className="relative h-6 w-6 rounded-full border-[3px] border-[#f4c63d] border-r-transparent">
                                    <div className="absolute left-[5px] top-[5px] h-2 w-2 rounded-full bg-[#f4c63d]" />
                                </div>

                                {/* Small gold accent */}
                                <span className="absolute bottom-[7px] right-[7px] h-1.5 w-1.5 rounded-full bg-[#f4c63d]" />
                            </div>

                            {/* Wordmark */}
                            <div className="leading-none">
                                <div className="font-serif text-xl font-bold tracking-[0.08em] text-[#35106e]">
                                    COMERICAFIN
                                </div>

                                <div className="mt-1 text-[8px] font-semibold tracking-[0.28em] text-[#b27a00]">
                                    BANKING
                                </div>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-3 sm:flex">
                            <div className="h-8 w-px bg-[#e4dce9]" />

                            <div className="text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#81798e]">
                                    Customer Portal
                                </p>

                                <p className="mt-0.5 text-xs font-medium text-[#4d4660]">
                                    Secure Account Access
                                </p>
                            </div>

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0e7f8] text-[#51169a]">
                                <Icon name="shield" size={17} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">

                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}
                    <div className="mb-6">

                        <Link
                            href={route('customer.dashboard')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#51169a] transition hover:text-[#35106e]"
                        >
                            <Icon name="back" size={17} />
                            Back to Dashboard
                        </Link>

                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#35106e] sm:text-3xl">
                            My Profile
                        </h1>

                        <p className="mt-1 text-sm text-[#625d73]">
                            Review your Comericafin customer account information.
                        </p>
                    </div>

                    {/* =====================================================
                        PROFILE HERO
                    ====================================================== */}
                    <section className="relative overflow-hidden rounded-2xl border border-[#e5deeb] bg-white shadow-[0_5px_24px_rgba(39,19,70,0.07)]">

                        <div className="relative h-36 overflow-hidden bg-gradient-to-r from-[#35106e] via-[#51169a] to-[#6d2ab4] sm:h-40">

                            <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />

                            <div className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full border-[40px] border-white/5" />

                            {/* Comericafin watermark */}
                            <div className="pointer-events-none absolute bottom-5 right-7 hidden text-4xl font-bold tracking-[0.15em] text-white/[0.06] md:block">
                                COMERICAFIN
                            </div>

                            <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                                Customer Profile
                            </div>
                        </div>

                        {/* Profile identity */}
                        <div className="relative px-5 pb-7 sm:px-8">

                            <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                                    {/* Profile Picture */}
                                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-[5px] border-white bg-[#51169a] shadow-[0_8px_25px_rgba(39,19,70,0.18)]">

                                        {user?.profile_picture ? (
                                            <img
                                                src={`/storage/${user.profile_picture}`}
                                                alt={customerName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#51169a] to-[#7a3bc1] text-3xl font-bold text-white">
                                                {initials}
                                            </div>
                                        )}

                                        <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-[3px] border-white bg-[#22a45a]" />
                                    </div>

                                    <div className="pb-1">

                                        <h2 className="text-2xl font-bold tracking-tight text-[#211c32]">
                                            {customerName}
                                        </h2>

                                        <p className="mt-1 text-sm text-[#6c6678]">
                                            Comericafin Customer
                                        </p>

                                        <div className="mt-3 flex flex-wrap items-center gap-2">

                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                                    isActive
                                                        ? 'bg-[#e9f9f0] text-[#16834b]'
                                                        : 'bg-[#fcebea] text-[#b42318]'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        isActive
                                                            ? 'bg-[#20a45b]'
                                                            : 'bg-[#c9372c]'
                                                    }`}
                                                />

                                                {isActive
                                                    ? 'Active Account'
                                                    : 'Inactive Account'}
                                            </span>

                                            <span className="rounded-full bg-[#f3edf8] px-3 py-1 text-xs font-semibold text-[#5a2391]">
                                                Customer
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =====================================================
                        CONTENT GRID
                    ====================================================== */}
                    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                        {/* LEFT */}
                        <div className="space-y-6">

                            {/* Personal Information */}
                            <section className="rounded-2xl border border-[#e5e1ea] bg-white p-5 shadow-[0_4px_18px_rgba(39,19,70,0.06)] sm:p-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0e7f8] text-[#51169a]">
                                        <Icon name="user" size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-[#35106e]">
                                            Personal Information
                                        </h3>

                                        <p className="text-xs text-[#756e80]">
                                            Your registered customer information
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                                    <InfoItem
                                        icon="user"
                                        label="Full Name"
                                        value={user?.name}
                                    />

                                    <InfoItem
                                        icon="mail"
                                        label="Email Address"
                                        value={user?.email}
                                    />

                                    <InfoItem
                                        icon="phone"
                                        label="Phone Number"
                                        value={user?.phone}
                                    />

                                    <InfoItem
                                        icon="account"
                                        label="Account Number"
                                        value={user?.account_number}
                                    />

                                </div>
                            </section>

                            {/* Account Information */}
                            <section className="rounded-2xl border border-[#e5e1ea] bg-white p-5 shadow-[0_4px_18px_rgba(39,19,70,0.06)] sm:p-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff5d9] text-[#b27a00]">
                                        <Icon name="account" size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-[#35106e]">
                                            Account Information
                                        </h3>

                                        <p className="text-xs text-[#756e80]">
                                            Your Comericafin account details
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                                    <InfoItem
                                        icon="account"
                                        label="Account Number"
                                        value={user?.account_number}
                                    />

                                    <InfoItem
                                        icon="routing"
                                        label="Routing Number"
                                        value={user?.routing_number}
                                    />

                                    <InfoItem
                                        icon="shield"
                                        label="Account Status"
                                        value={isActive ? 'Active' : 'Inactive'}
                                    />

                                    <InfoItem
                                        icon="user"
                                        label="Account Type"
                                        value="Customer"
                                    />

                                </div>
                            </section>
                        </div>

                        {/* RIGHT */}
                        <aside className="space-y-6">

                            {/* Account Overview */}
                            <section className="overflow-hidden rounded-2xl border border-[#e5e1ea] bg-white shadow-[0_4px_18px_rgba(39,19,70,0.06)]">

                                <div className="border-b border-[#eee9f2] px-5 py-5">
                                    <h3 className="text-lg font-bold text-[#35106e]">
                                        Account Overview
                                    </h3>

                                    <p className="mt-1 text-xs text-[#756e80]">
                                        Current account balances
                                    </p>
                                </div>

                                <div className="space-y-3 p-5">

                                    <div className="rounded-xl bg-[#f6effb] p-5">
                                        <p className="text-xs font-medium text-[#6c6678]">
                                            Checking Balance
                                        </p>

                                        <p className="mt-2 text-2xl font-bold tracking-tight text-[#42117f]">
                                            {formatCurrency(user?.balance)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-[#fff8e8] p-5">
                                        <p className="text-xs font-medium text-[#6c6678]">
                                            Savings Balance
                                        </p>

                                        <p className="mt-2 text-2xl font-bold tracking-tight text-[#9a6900]">
                                            {formatCurrency(user?.savings_balance)}
                                        </p>
                                    </div>

                                    <div className="border-t border-[#eee9f2] pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-[#6c6678]">
                                                Total Balance
                                            </span>

                                            <span className="text-base font-bold text-[#35106e]">
                                                {formatCurrency(
                                                    Number(user?.balance || 0) +
                                                    Number(user?.savings_balance || 0)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Security */}
                            <section className="rounded-2xl border border-[#e4d8ef] bg-[#f8f2fc] p-5">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5a1b99] text-white">
                                        <Icon name="shield" size={19} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-[#35106e]">
                                            Account Security
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-[#665f73]">
                                            Your customer account information
                                            is protected within the Comericafin
                                            banking simulation.
                                        </p>
                                    </div>

                                </div>
                            </section>

                        </aside>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 rounded-2xl border border-[#e5e1ea] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(39,19,70,0.04)]">

                        <div className="flex items-start gap-3">

                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0e7f8] text-[#51169a]">
                                <Icon name="shield" size={16} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-[#35106e]">
                                    Comericafin Customer Portal
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#716a7c]">
                                    Your profile information is displayed from
                                    your Comericafin customer account.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}