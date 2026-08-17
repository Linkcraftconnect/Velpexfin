import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

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
        case 'customers':
            return (
                <svg {...common}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );

        case 'administrator':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                </svg>
            );

        case 'balance':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-3 .9-3 2.2 0 1.4 1.3 2 3 2.3 1.7.3 3 .9 3 2.3 0 1.3-1.3 2.2-3 2.2-1.3 0-2.3-.4-3-1" />
                    <path d="M12 6v12" />
                </svg>
            );

        case 'transactions':
            return (
                <svg {...common}>
                    <path d="M7 7h13l-3-3" />
                    <path d="m20 7-3 3" />
                    <path d="M17 17H4l3 3" />
                    <path d="m4 17 3-3" />
                </svg>
            );

        case 'plus':
            return (
                <svg {...common}>
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
            );

        case 'arrow':
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case 'activity':
            return (
                <svg {...common}>
                    <path d="M3 12h4l3-8 4 16 3-8h4" />
                </svg>
            );

        case 'database':
            return (
                <svg {...common}>
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                    <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
                </svg>
            );

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case 'system':
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 8h10" />
                    <path d="M7 12h6" />
                    <path d="M7 16h3" />
                </svg>
            );

        case 'reports':
            return (
                <svg {...common}>
                    <path d="M4 19V5" />
                    <path d="M4 19h16" />
                    <path d="M8 16v-5" />
                    <path d="M12 16V7" />
                    <path d="M16 16v-3" />
                </svg>
            );

        default:
            return null;
    }
};

const formatCurrency = (value) => {
    const amount = Number(value ?? 0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
};

export default function Dashboard({ statistics = {}, user }) {
    const customerCount = statistics?.customers ?? 0;
    const administratorCount = statistics?.administrators ?? 0;
    const transactionCount = statistics?.transactions ?? 0;
    const totalBalance = formatCurrency(statistics?.balance);

    const userName = user?.name || 'Administrator';
    const userEmail = user?.email || '';

    const initials = userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name.charAt(0).toUpperCase())
        .join('');

    return (
        <AdminLayout user={user}>
            <Head title="Administrator Dashboard" />

            <div className="min-h-screen bg-[#f3f1f5] text-[#211c32]">

                {/* =====================================================
                    TOP HEADER
                ====================================================== */}
                <header className="border-b border-[#ded9e4] bg-white">
                    <div className="px-5 py-5 sm:px-7 lg:px-9">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5b1599] to-[#35106e] text-white shadow-md">
                                        <Icon type="system" size={22} />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a681d]">
                                            Comericafin
                                        </p>

                                        <h1 className="text-2xl font-extrabold tracking-tight text-[#35106e]">
                                            Administration
                                        </h1>
                                    </div>

                                </div>

                                <p className="mt-3 text-sm text-[#716a7b]">
                                    Manage customers, accounts, transactions and system activity.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">

                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-bold text-[#35106e]">
                                        {userName}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#777080]">
                                        {userEmail}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#b28a32] to-[#765815] text-sm font-bold text-white shadow-md">
                                    {initials || 'A'}
                                </div>

                                <Link
                                    href="/admin/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-lg border border-[#dfd9e5] bg-white px-4 py-2.5 text-sm font-semibold text-[#5a5267] transition hover:border-[#c9c0d2] hover:bg-[#faf9fb] hover:text-[#35106e]"
                                >
                                    Sign Out
                                </Link>

                            </div>

                        </div>

                    </div>
                </header>

                {/* =====================================================
                    MAIN
                ====================================================== */}
                <main className="px-5 py-7 sm:px-7 lg:px-9">

                    {/* =================================================
                        WELCOME BANNER
                    ================================================== */}
                    <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#3d0d72] via-[#551496] to-[#281047] p-6 shadow-[0_15px_40px_rgba(55,15,100,0.22)] sm:p-8">

                        {/* Decorative shapes */}
                        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[32px] border-white/5" />

                        <div className="pointer-events-none absolute -right-12 top-16 h-60 w-60 rounded-full border border-[#d9b85e]/20" />

                        <div className="pointer-events-none absolute -bottom-32 left-[45%] h-64 w-[480px] rotate-[-18deg] rounded-full border-t border-white/10" />

                        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border-[26px] border-white/5" />

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e6c96d]">
                                    Administrator Portal
                                </p>

                                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                    Welcome, {userName}
                                </h2>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ded0e9] sm:text-base">
                                    Manage Comericafin operations from one secure administration
                                    portal.
                                </p>

                            </div>

                            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">

                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                    <span className="h-3 w-3 rounded-full bg-[#18a85b] shadow-[0_0_0_5px_rgba(24,168,91,0.12)]" />
                                </span>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d9cce5]">
                                        System Status
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-white">
                                        Operational
                                    </p>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        STATISTICS
                    ================================================== */}
                    <section className="mt-7">

                        <div className="mb-4 flex items-center gap-4">

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a681d]">
                                    Overview
                                </p>

                                <h2 className="mt-1 text-xl font-extrabold text-[#35106e]">
                                    System Statistics
                                </h2>
                            </div>

                            <div className="h-px flex-1 bg-gradient-to-r from-[#d9c6e8] to-transparent" />

                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {/* Customers */}
                            <div className="group rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1e8fb] text-[#51169a]">
                                        <Icon type="customers" size={24} />
                                    </div>

                                    <span className="rounded-full bg-[#f5f1f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#746b7e]">
                                        Users
                                    </span>

                                </div>

                                <p className="mt-6 text-sm font-medium text-[#756e7f]">
                                    Customers
                                </p>

                                <p className="mt-1 text-3xl font-extrabold text-[#35106e]">
                                    {customerCount.toLocaleString('en-US')}
                                </p>

                                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#eee9f2]">
                                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#51169a] to-[#8a5ab3]" />
                                </div>

                            </div>

                            {/* Administrators */}
                            <div className="group rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf5e8] text-[#8a681d]">
                                        <Icon type="administrator" size={24} />
                                    </div>

                                    <span className="rounded-full bg-[#faf5e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8a681d]">
                                        Staff
                                    </span>

                                </div>

                                <p className="mt-6 text-sm font-medium text-[#756e7f]">
                                    Administrators
                                </p>

                                <p className="mt-1 text-3xl font-extrabold text-[#35106e]">
                                    {administratorCount.toLocaleString('en-US')}
                                </p>

                                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#eee9f2]">
                                    <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-[#9a751f] to-[#c9a64e]" />
                                </div>

                            </div>

                            {/* Balances */}
                            <div className="group rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9f9f0] text-[#16834b]">
                                        <Icon type="balance" size={24} />
                                    </div>

                                    <span className="rounded-full bg-[#e9f9f0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#16834b]">
                                        Balance
                                    </span>

                                </div>

                                <p className="mt-6 text-sm font-medium text-[#756e7f]">
                                    Total Customer Balances
                                </p>

                                <p className="mt-1 truncate text-3xl font-extrabold text-[#16834b]">
                                    {totalBalance}
                                </p>

                                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#eee9f2]">
                                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-[#16834b] to-[#48b778]" />
                                </div>

                            </div>

                            {/* Transactions */}
                            <div className="group rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eee8f7] text-[#51169a]">
                                        <Icon type="transactions" size={24} />
                                    </div>

                                    <span className="rounded-full bg-[#f5f1f8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#746b7e]">
                                        Activity
                                    </span>

                                </div>

                                <p className="mt-6 text-sm font-medium text-[#756e7f]">
                                    Transactions
                                </p>

                                <p className="mt-1 text-3xl font-extrabold text-[#35106e]">
                                    {transactionCount.toLocaleString('en-US')}
                                </p>

                                <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#eee9f2]">
                                    <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#51169a] to-[#8a5ab3]" />
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        LOWER CONTENT
                    ================================================== */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr_1fr]">

                        {/* =================================================
                            QUICK ACTIONS
                        ================================================== */}
                        <section className="rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e8fb] text-[#51169a]">
                                    <Icon type="plus" size={20} />
                                </div>

                                <div>
                                    <h2 className="font-extrabold text-[#35106e]">
                                        Quick Actions
                                    </h2>

                                    <p className="text-xs text-[#777080]">
                                        Common administrative tasks
                                    </p>
                                </div>

                            </div>

                            <div className="mt-5 space-y-3">

                                <Link
                                    href="/admin/customers/create"
                                    className="group flex items-center justify-between rounded-xl border border-[#e5e0e9] bg-[#fcfbfd] p-4 transition hover:border-[#cdb8dd] hover:bg-[#f8f2fc]"
                                >
                                    <div className="flex items-center gap-3">

                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#51169a] text-white">
                                            <Icon type="plus" size={17} />
                                        </span>

                                        <span>
                                            <span className="block text-sm font-bold text-[#35106e]">
                                                Create Customer
                                            </span>

                                            <span className="block text-xs text-[#777080]">
                                                Add a new customer account
                                            </span>
                                        </span>

                                    </div>

                                    <Icon
                                        type="arrow"
                                        size={17}
                                        className="text-[#9b91a5] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    href="/admin/administrators/create"
                                    className="group flex items-center justify-between rounded-xl border border-[#e5e0e9] bg-[#fcfbfd] p-4 transition hover:border-[#cdb8dd] hover:bg-[#f8f2fc]"
                                >
                                    <div className="flex items-center gap-3">

                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8a681d] text-white">
                                            <Icon type="administrator" size={17} />
                                        </span>

                                        <span>
                                            <span className="block text-sm font-bold text-[#35106e]">
                                                Create Administrator
                                            </span>

                                            <span className="block text-xs text-[#777080]">
                                                Add authorized administration staff
                                            </span>
                                        </span>

                                    </div>

                                    <Icon
                                        type="arrow"
                                        size={17}
                                        className="text-[#9b91a5] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    href="/admin/transfers"
                                    className="group flex items-center justify-between rounded-xl border border-[#e5e0e9] bg-[#fcfbfd] p-4 transition hover:border-[#cdb8dd] hover:bg-[#f8f2fc]"
                                >
                                    <div className="flex items-center gap-3">

                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#51169a] text-white">
                                            <Icon type="transactions" size={17} />
                                        </span>

                                        <span>
                                            <span className="block text-sm font-bold text-[#35106e]">
                                                View Transfers
                                            </span>

                                            <span className="block text-xs text-[#777080]">
                                                Review account transfer activity
                                            </span>
                                        </span>

                                    </div>

                                    <Icon
                                        type="arrow"
                                        size={17}
                                        className="text-[#9b91a5] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    href="/admin/reports"
                                    className="group flex items-center justify-between rounded-xl border border-[#e5e0e9] bg-[#fcfbfd] p-4 transition hover:border-[#cdb8dd] hover:bg-[#f8f2fc]"
                                >
                                    <div className="flex items-center gap-3">

                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8a681d] text-white">
                                            <Icon type="reports" size={17} />
                                        </span>

                                        <span>
                                            <span className="block text-sm font-bold text-[#35106e]">
                                                Reports
                                            </span>

                                            <span className="block text-xs text-[#777080]">
                                                Review system reports
                                            </span>
                                        </span>

                                    </div>

                                    <Icon
                                        type="arrow"
                                        size={17}
                                        className="text-[#9b91a5] transition-transform group-hover:translate-x-1"
                                    />
                                </Link>

                            </div>

                        </section>

                        {/* =================================================
                            RECENT ACTIVITY
                        ================================================== */}
                        <section className="rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e8fb] text-[#51169a]">
                                        <Icon type="activity" size={20} />
                                    </div>

                                    <div>
                                        <h2 className="font-extrabold text-[#35106e]">
                                            Recent Activity
                                        </h2>

                                        <p className="text-xs text-[#777080]">
                                            Administrator activity
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-5 rounded-xl border border-dashed border-[#dcd5e2] bg-[#fcfbfd] p-6">

                                <div className="flex flex-col items-center justify-center text-center">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1e8fb] text-[#51169a]">
                                        <Icon type="activity" size={22} />
                                    </div>

                                    <p className="mt-4 text-sm font-bold text-[#35106e]">
                                        No recent administrator activity
                                    </p>

                                    <p className="mt-2 max-w-[260px] text-xs leading-5 text-[#777080]">
                                        Future administrator actions will appear here as they are recorded.
                                    </p>

                                </div>

                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <div className="rounded-xl bg-[#f8f5fa] p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#83798c]">
                                        Customers
                                    </p>

                                    <p className="mt-1 text-xl font-extrabold text-[#35106e]">
                                        {customerCount}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#faf7ef] p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#83798c]">
                                        Staff
                                    </p>

                                    <p className="mt-1 text-xl font-extrabold text-[#8a681d]">
                                        {administratorCount}
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            SYSTEM STATUS
                        ================================================== */}
                        <section className="rounded-2xl border border-[#ddd8e2] bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f9f0] text-[#16834b]">
                                    <Icon type="shield" size={21} />
                                </div>

                                <div>
                                    <h2 className="font-extrabold text-[#35106e]">
                                        System Status
                                    </h2>

                                    <p className="text-xs text-[#777080]">
                                        Current platform health
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 space-y-3">

                                {/* Database */}
                                <div className="flex items-center justify-between rounded-xl border border-[#eeeaf1] bg-[#fcfbfd] px-4 py-3">

                                    <div className="flex items-center gap-3">

                                        <Icon
                                            type="database"
                                            size={19}
                                            className="text-[#625a6c]"
                                        />

                                        <span className="text-sm font-semibold text-[#383242]">
                                            Database
                                        </span>

                                    </div>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#16834b]">
                                        <span className="h-2 w-2 rounded-full bg-[#18a85b]" />
                                        Online
                                    </span>

                                </div>

                                {/* Authentication */}
                                <div className="flex items-center justify-between rounded-xl border border-[#eeeaf1] bg-[#fcfbfd] px-4 py-3">

                                    <div className="flex items-center gap-3">

                                        <Icon
                                            type="shield"
                                            size={19}
                                            className="text-[#625a6c]"
                                        />

                                        <span className="text-sm font-semibold text-[#383242]">
                                            Authentication
                                        </span>

                                    </div>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#16834b]">
                                        <span className="h-2 w-2 rounded-full bg-[#18a85b]" />
                                        Secure
                                    </span>

                                </div>

                                {/* Banking System */}
                                <div className="flex items-center justify-between rounded-xl border border-[#eeeaf1] bg-[#fcfbfd] px-4 py-3">

                                    <div className="flex items-center gap-3">

                                        <Icon
                                            type="system"
                                            size={19}
                                            className="text-[#625a6c]"
                                        />

                                        <span className="text-sm font-semibold text-[#383242]">
                                            Banking System
                                        </span>

                                    </div>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#16834b]">
                                        <span className="h-2 w-2 rounded-full bg-[#18a85b]" />
                                        Running
                                    </span>

                                </div>

                                {/* Security */}
                                <div className="flex items-center justify-between rounded-xl border border-[#eeeaf1] bg-[#fcfbfd] px-4 py-3">

                                    <div className="flex items-center gap-3">

                                        <Icon
                                            type="shield"
                                            size={19}
                                            className="text-[#625a6c]"
                                        />

                                        <span className="text-sm font-semibold text-[#383242]">
                                            Security
                                        </span>

                                    </div>

                                    <span className="flex items-center gap-2 text-xs font-bold text-[#16834b]">
                                        <span className="h-2 w-2 rounded-full bg-[#18a85b]" />
                                        Protected
                                    </span>

                                </div>

                            </div>

                            <div className="mt-5 rounded-xl border border-[#e7dfc8] bg-[#faf7ef] p-4">

                                <div className="flex items-start gap-3">

                                    <Icon
                                        type="shield"
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#8a681d]"
                                    />

                                    <div>
                                        <p className="text-xs font-bold text-[#6f5418]">
                                            Administration Security
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-[#81745c]">
                                            Administrative access should only be used by authorized personnel.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>

                    {/* =================================================
                        FOOTER INFORMATION
                    ================================================== */}
                    <section className="mt-6 rounded-2xl border border-[#d9d4dd] bg-white px-6 py-5 shadow-sm">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-sm font-bold text-[#35106e]">
                                    Comericafin Administration Portal
                                </p>

                                <p className="mt-1 text-xs text-[#777080]">
                                    Secure management of customer accounts and system operations.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">

                                <span className="h-2 w-2 rounded-full bg-[#18a85b]" />

                                <span className="text-xs font-semibold text-[#5e5668]">
                                    All systems operational
                                </span>

                            </div>

                        </div>

                    </section>

                </main>
            </div>
        </AdminLayout>
    );
}