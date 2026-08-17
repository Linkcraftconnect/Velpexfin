import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Icon = ({ type, size = 20, className = '' }) => {
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
        case 'dashboard':
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
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

        case 'transfer':
            return (
                <svg {...common}>
                    <path d="M4 7h13" />
                    <path d="m13 3 4 4-4 4" />
                    <path d="M20 17H7" />
                    <path d="m11 13-4 4 4 4" />
                </svg>
            );

        case 'profile':
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case 'settings':
            return (
                <svg {...common}>
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                    <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05-1.65 1.65-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.09 1.65V20h-2.34v-.08a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-1.97.36l-.06.05-1.65-1.65.06-.05A1.8 1.8 0 0 0 8.34 15a1.8 1.8 0 0 0-1.65-1.09H6.6v-2.34h.09A1.8 1.8 0 0 0 8.34 10a1.8 1.8 0 0 0-.36-1.98l-.06-.05 1.65-1.65.06.05a1.8 1.8 0 0 0 1.97.36 1.8 1.8 0 0 0 1.1-1.65V5h2.34v.08a1.8 1.8 0 0 0 1.09 1.65 1.8 1.8 0 0 0 1.98-.36l.05-.05 1.65 1.65-.05.05A1.8 1.8 0 0 0 19.4 10a1.8 1.8 0 0 0 1.65 1.09h.08v2.34h-.08A1.8 1.8 0 0 0 19.4 15Z" />
                </svg>
            );

        case 'logout':
            return (
                <svg {...common}>
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M21 4v16" />
                </svg>
            );

        case 'chevron':
            return (
                <svg {...common}>
                    <path d="m9 18 6-6-6-6" />
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

        case 'menu':
            return (
                <svg {...common}>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                </svg>
            );

        default:
            return null;
    }
};

const LogoMark = () => (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0c44d]/30 bg-white/10 text-[#f5c842]">
        <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3L20 7V12C20 17 16.8 20 12 21C7.2 20 4 17 4 12V7L12 3Z" />
            <path d="M8 12L10.5 14.5L16 9" />
        </svg>
    </div>
);

export default function CustomerLayout({ children, user }) {
    const { url } = usePage();

    const [mobileOpen, setMobileOpen] = useState(false);

    const navigation = [
        {
            label: 'Dashboard',
            href: '/customer/dashboard',
            icon: 'dashboard',
            match: '/customer/dashboard',
        },
        {
            label: 'Transactions',
            href: '/customer/transactions',
            icon: 'transactions',
            match: '/customer/transactions',
        },
        {
            label: 'Transfer Money',
            href: '/customer/transfer',
            icon: 'transfer',
            match: '/customer/transfer',
        },
        {
            label: 'Profile',
            href: '/customer/profile',
            icon: 'profile',
            match: '/customer/profile',
        },
    ];

    const accountLinks = [
        {
            label: 'Settings',
            href: '/customer/settings',
            icon: 'settings',
            match: '/customer/settings',
        },
    ];

    const isActive = (match) => url.startsWith(match);

    const customerName = user?.name || 'Customer';

    const initials = customerName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');

    const profilePicture = user?.profile_picture
        ? `/storage/${user.profile_picture}`
        : null;

    const closeMobile = () => {
        setMobileOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#e5e5e5]">

            {/* MOBILE HEADER */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#d2d2d2] bg-[#e5e5e5] px-4 lg:hidden">

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#4a4a4a] transition hover:bg-[#d8d8d8]"
                    aria-label="Open navigation"
                >
                    <Icon type="menu" size={21} />
                </button>

                <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4b128d] text-[#f5c842]">
                        <LogoMark />
                    </div>

                    <div>
                        <p className="text-xs font-bold tracking-[0.18em] text-[#35106e]">
                            COMERICAFIN
                        </p>

                        <p className="text-[7px] tracking-[0.22em] text-[#765891]">
                            CUSTOMER PORTAL
                        </p>
                    </div>

                </div>

                <div className="h-10 w-10 overflow-hidden rounded-full bg-[#51169a]">

                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt={customerName}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                            {initials || 'C'}
                        </div>
                    )}

                </div>

            </header>


            {/* MOBILE OVERLAY */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/45 lg:hidden"
                    onClick={closeMobile}
                />
            )}


            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-[60] flex w-[280px] flex-col bg-[#2d0b57] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
                    mobileOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                }`}
            >

                {/* BRAND */}
                <div className="relative overflow-hidden border-b border-white/10 px-6 py-6">

                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[20px] border-white/5" />

                    <div className="relative flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <LogoMark />

                            <div>
                                <p className="text-sm font-bold tracking-[0.17em] text-white">
                                    COMERICAFIN
                                </p>

                                <p className="mt-0.5 text-[8px] font-medium tracking-[0.2em] text-[#f5c842]">
                                    CUSTOMER PORTAL
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={closeMobile}
                            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
                            aria-label="Close navigation"
                        >
                            <Icon type="close" size={19} />
                        </button>

                    </div>
                </div>


                {/* CUSTOMER PROFILE */}
                <div className="px-5 py-5">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">

                        <div className="flex items-center gap-3">

                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#f5c842]/40 bg-[#51169a]">

                                {profilePicture ? (
                                    <img
                                        src={profilePicture}
                                        alt={customerName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                                        {initials || 'C'}
                                    </div>
                                )}

                            </div>

                            <div className="min-w-0">

                                <p className="truncate text-sm font-semibold text-white">
                                    {customerName}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">

                                    <span className="h-1.5 w-1.5 rounded-full bg-[#34d47f]" />

                                    <span className="text-[11px] text-purple-200">
                                        Active Account
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>


                {/* NAVIGATION */}
                <div className="flex-1 overflow-y-auto px-4 pb-5">

                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300/70">
                        Main Menu
                    </p>

                    <nav className="space-y-1">

                        {navigation.map((item) => {
                            const active = isActive(item.match);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMobile}
                                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                                        active
                                            ? 'bg-white text-[#40127e] shadow-sm'
                                            : 'text-purple-100 hover:bg-white/[0.08] hover:text-white'
                                    }`}
                                >

                                    {active && (
                                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#f5c842]" />
                                    )}

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                            active
                                                ? 'bg-[#f2e8fb] text-[#51169a]'
                                                : 'bg-white/[0.06] text-purple-200 group-hover:bg-white/10 group-hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            type={item.icon}
                                            size={18}
                                        />
                                    </span>

                                    <span className="flex-1 text-sm font-semibold">
                                        {item.label}
                                    </span>

                                    {active && (
                                        <Icon
                                            type="chevron"
                                            size={16}
                                            className="text-[#7d55a6]"
                                        />
                                    )}

                                </Link>
                            );
                        })}

                    </nav>


                    <div className="my-6 border-t border-white/10" />

                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300/70">
                        Account
                    </p>

                    <nav className="space-y-1">

                        {accountLinks.map((item) => {
                            const active = isActive(item.match);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMobile}
                                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                                        active
                                            ? 'bg-white text-[#40127e]'
                                            : 'text-purple-100 hover:bg-white/[0.08] hover:text-white'
                                    }`}
                                >

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                            active
                                                ? 'bg-[#f2e8fb] text-[#51169a]'
                                                : 'bg-white/[0.06] text-purple-200 group-hover:bg-white/10 group-hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            type={item.icon}
                                            size={18}
                                        />
                                    </span>

                                    <span className="text-sm font-semibold">
                                        {item.label}
                                    </span>

                                </Link>
                            );
                        })}

                    </nav>

                </div>


                {/* SECURITY / LOGOUT */}
                <div className="border-t border-white/10 p-4">

                    <div className="mb-3 rounded-xl border border-[#f5c842]/15 bg-[#f5c842]/[0.06] p-3">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5c842]/10 text-[#f5c842]">
                                <Icon
                                    type="shield"
                                    size={17}
                                />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white">
                                    Secure Access
                                </p>

                                <p className="mt-0.5 text-[10px] text-purple-200">
                                    Your account is protected
                                </p>
                            </div>

                        </div>

                    </div>

                    <Link
                        href="/customer/logout"
                        method="post"
                        as="button"
                        onClick={closeMobile}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-purple-100 transition hover:bg-red-500/15 hover:text-red-200"
                    >

                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] group-hover:bg-red-500/10">
                            <Icon
                                type="logout"
                                size={18}
                            />
                        </span>

                        <span className="text-sm font-semibold">
                            Sign Out
                        </span>

                    </Link>

                </div>
            </aside>


            {/* MAIN CONTENT */}
            <main className="min-h-screen bg-[#e5e5e5] lg:pl-[280px]">

                {/* DESKTOP TOP BAR */}
                <header className="hidden h-[76px] items-center justify-between border-b border-[#d2d2d2] bg-[#e5e5e5] px-8 lg:flex">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#777777]">
                            Customer Portal
                        </p>

                        <h1 className="mt-1 text-lg font-bold text-[#35106e]">
                            Welcome back, {customerName.split(' ')[0]}
                        </h1>

                    </div>


                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="text-sm font-semibold text-[#333333]">
                                {customerName}
                            </p>

                            <p className="mt-0.5 text-xs text-[#777777]">
                                Customer Account
                            </p>

                        </div>


                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#d5c7e1] bg-[#51169a]">

                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt={customerName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                                    {initials || 'C'}
                                </div>
                            )}

                        </div>

                    </div>

                </header>


                {/* PAGE CONTENT */}
                <div className="min-h-[calc(100vh-76px)] bg-[#e5e5e5]">
                    {children}
                </div>

            </main>

        </div>
    );
}