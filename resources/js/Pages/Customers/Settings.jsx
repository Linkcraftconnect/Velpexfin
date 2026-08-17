import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

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
        case 'user':
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
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

        case 'bell':
            return (
                <svg {...common}>
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                </svg>
            );

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case 'chevron':
            return (
                <svg {...common}>
                    <path d="m9 18 6-6-6-6" />
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
                    <path d="M6.5 3.5h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.5 19.5 4.5 13.5 4.5 6.5c0-1.7.9-3 2-3Z" />
                </svg>
            );

        case 'settings':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.4-1.4.1-.1A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.6-1H7v-2h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L9 9l1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V6h2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.8v2h-.8a1.7 1.7 0 0 0-1.6 1Z" />
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

export default function Settings({ user }) {
    const customerName = user?.name || 'Customer';

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');

    const [transactionNotifications, setTransactionNotifications] =
        useState(true);

    const [securityNotifications, setSecurityNotifications] =
        useState(true);

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPasswordChange = (event) => {
        event.preventDefault();

        setSuccessMessage('');

        passwordForm.post(route('customer.settings.password'), {
            preserveScroll: true,

            onSuccess: () => {
                passwordForm.reset();

                setShowPasswordModal(false);

                setSuccessMessage(
                    'Your password has been changed successfully.'
                );
            },
        });
    };

    const closePasswordModal = () => {
        if (passwordForm.processing) {
            return;
        }

        passwordForm.reset();
        passwordForm.clearErrors();
        setShowPasswordModal(false);
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <CustomerLayout user={user}>
            <Head title="Settings" />

            <div className="min-h-screen bg-[#eeeeee] text-[#17152b]">

                <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

                    {/* HEADER */}
                    <section className="relative mb-7 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#5a4210] via-[#765817] to-[#4b3508] px-6 py-7 shadow-[0_12px_35px_rgba(80,55,5,0.18)] sm:px-8">

                        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />

                        <div className="pointer-events-none absolute -right-8 top-20 h-48 w-48 rounded-full border border-white/10" />

                        <div className="relative z-10">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-[#f5c842] backdrop-blur-sm">
                                    <Icon type="settings" size={28} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5d978]">
                                        Account
                                    </p>

                                    <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                                        Settings
                                    </h1>

                                    <p className="mt-1 text-sm text-white/70">
                                        Manage your account preferences and
                                        security.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </section>

                    {/* SUCCESS MESSAGE */}
                    {successMessage && (
                        <div className="mb-6 rounded-2xl border border-[#cce8d8] bg-[#f1fbf5] p-4 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16834b] text-white">
                                    ✓
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#176b42]">
                                        Success
                                    </p>

                                    <p className="mt-1 text-xs text-[#527061]">
                                        {successMessage}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* SETTINGS CONTENT */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

                        {/* LEFT MENU */}
                        <aside className="h-fit rounded-2xl border border-[#dddddd] bg-white p-3 shadow-sm lg:sticky lg:top-6">

                            <div className="px-4 py-3">

                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8378]">
                                    Settings Menu
                                </p>

                            </div>

                            <div className="space-y-1">

                                <button
                                    type="button"
                                    onClick={() =>
                                        scrollToSection('account-information')
                                    }
                                    className="flex w-full items-center justify-between rounded-xl bg-[#f3ead4] px-4 py-3 text-left text-sm font-bold text-[#604709]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon type="user" size={19} />
                                        Account
                                    </span>

                                    <Icon
                                        type="chevron"
                                        size={17}
                                        className="text-[#8c702d]"
                                    />
                                </button>

                                <Link
                                    href="/customer/profile"
                                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[#514d58] transition hover:bg-[#f6f6f6]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon type="user" size={19} />
                                        Profile
                                    </span>

                                    <Icon
                                        type="chevron"
                                        size={17}
                                        className="text-[#aaa]"
                                    />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        scrollToSection('security-section')
                                    }
                                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-[#514d58] transition hover:bg-[#f6f6f6]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon type="lock" size={19} />
                                        Password & Security
                                    </span>

                                    <Icon
                                        type="chevron"
                                        size={17}
                                        className="text-[#aaa]"
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        scrollToSection('notifications-section')
                                    }
                                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-[#514d58] transition hover:bg-[#f6f6f6]"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon type="bell" size={19} />
                                        Notifications
                                    </span>

                                    <Icon
                                        type="chevron"
                                        size={17}
                                        className="text-[#aaa]"
                                    />
                                </button>

                            </div>

                        </aside>

                        {/* RIGHT SIDE */}
                        <main className="space-y-6">

                            {/* ACCOUNT INFORMATION */}
                            <section
                                id="account-information"
                                className="scroll-mt-6 rounded-2xl border border-[#dddddd] bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ead4] text-[#604709]">
                                        <Icon type="user" size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-[#32106a]">
                                            Account Information
                                        </h2>

                                        <p className="mt-1 text-xs text-[#77727d]">
                                            Your basic Comericafin account
                                            information.
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                                    <div className="rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4">

                                        <div className="flex items-center gap-3">

                                            <Icon
                                                type="user"
                                                size={19}
                                                className="text-[#6b6571]"
                                            />

                                            <div>
                                                <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a848f]">
                                                    Full Name
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#27222f]">
                                                    {customerName}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4">

                                        <div className="flex items-center gap-3">

                                            <Icon
                                                type="mail"
                                                size={19}
                                                className="text-[#6b6571]"
                                            />

                                            <div className="min-w-0">

                                                <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a848f]">
                                                    Email Address
                                                </p>

                                                <p className="mt-1 break-all text-sm font-semibold text-[#27222f]">
                                                    {user?.email ||
                                                        'Not available'}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4">

                                        <div className="flex items-center gap-3">

                                            <Icon
                                                type="phone"
                                                size={19}
                                                className="text-[#6b6571]"
                                            />

                                            <div>

                                                <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a848f]">
                                                    Phone Number
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#27222f]">
                                                    {user?.phone ||
                                                        'Not available'}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4">

                                        <div className="flex items-center gap-3">

                                            <Icon
                                                type="shield"
                                                size={19}
                                                className="text-[#16834b]"
                                            />

                                            <div>

                                                <p className="text-[11px] font-medium uppercase tracking-wide text-[#8a848f]">
                                                    Account Status
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#16834b]">
                                                    {user?.status
                                                        ? user.status
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          user.status.slice(1)
                                                        : 'Active'}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <Link
                                    href="/customer/profile"
                                    className="mt-5 inline-flex rounded-lg bg-[#51169a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#431180]"
                                >
                                    Edit Profile
                                </Link>

                            </section>

                            {/* SECURITY */}
                            <section
                                id="security-section"
                                className="scroll-mt-6 rounded-2xl border border-[#dddddd] bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ead4] text-[#604709]">
                                        <Icon type="shield" size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-[#32106a]">
                                            Security
                                        </h2>

                                        <p className="mt-1 text-xs text-[#77727d]">
                                            Keep your account protected.
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-5">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee7f7] text-[#51169a]">
                                                <Icon
                                                    type="lock"
                                                    size={19}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-[#292431]">
                                                    Password
                                                </p>

                                                <p className="mt-1 text-xs text-[#77717d]">
                                                    Change your account password
                                                    to help protect your
                                                    account.
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPasswordModal(true)
                                            }
                                            className="rounded-lg border border-[#5a4210] bg-white px-4 py-2.5 text-sm font-semibold text-[#5a4210] transition hover:bg-[#f9f4e8]"
                                        >
                                            Change Password
                                        </button>

                                    </div>

                                </div>

                                <div className="mt-4 rounded-xl border border-[#dcefe3] bg-[#f2fbf5] p-5">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16834b] text-white">
                                            ✓
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-[#176b42]">
                                                Account Security
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-[#527061]">
                                                Your account is currently
                                                active and protected.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* NOTIFICATIONS */}
                            <section
                                id="notifications-section"
                                className="scroll-mt-6 rounded-2xl border border-[#dddddd] bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ead4] text-[#604709]">
                                        <Icon type="bell" size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-[#32106a]">
                                            Notifications
                                        </h2>

                                        <p className="mt-1 text-xs text-[#77727d]">
                                            Manage how you receive account
                                            notifications.
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 space-y-3">

                                    {/* TRANSACTION NOTIFICATIONS */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setTransactionNotifications(
                                                !transactionNotifications
                                            )
                                        }
                                        className="flex w-full items-center justify-between rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4 text-left"
                                    >

                                        <div>
                                            <p className="text-sm font-semibold text-[#292431]">
                                                Transaction Notifications
                                            </p>

                                            <p className="mt-1 text-xs text-[#77717d]">
                                                Receive notifications about
                                                account activity.
                                            </p>
                                        </div>

                                        <div
                                            className={`relative h-6 w-11 rounded-full transition ${
                                                transactionNotifications
                                                    ? 'bg-[#5a4210]'
                                                    : 'bg-[#c9c9c9]'
                                            }`}
                                        >
                                            <div
                                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                                                    transactionNotifications
                                                        ? 'right-1'
                                                        : 'left-1'
                                                }`}
                                            />
                                        </div>

                                    </button>

                                    {/* SECURITY NOTIFICATIONS */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSecurityNotifications(
                                                !securityNotifications
                                            )
                                        }
                                        className="flex w-full items-center justify-between rounded-xl border border-[#e7e3e8] bg-[#fafafa] p-4 text-left"
                                    >

                                        <div>
                                            <p className="text-sm font-semibold text-[#292431]">
                                                Security Notifications
                                            </p>

                                            <p className="mt-1 text-xs text-[#77717d]">
                                                Receive important security
                                                alerts.
                                            </p>
                                        </div>

                                        <div
                                            className={`relative h-6 w-11 rounded-full transition ${
                                                securityNotifications
                                                    ? 'bg-[#5a4210]'
                                                    : 'bg-[#c9c9c9]'
                                            }`}
                                        >
                                            <div
                                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                                                    securityNotifications
                                                        ? 'right-1'
                                                        : 'left-1'
                                                }`}
                                            />
                                        </div>

                                    </button>

                                </div>

                            </section>

                            {/* SECURITY NOTICE */}
                            <div className="rounded-2xl border border-[#dfd0ed] bg-gradient-to-r from-[#f4edfa] to-[#faf7fd] p-5">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#51169a] text-white">
                                        <Icon type="shield" size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#35106e]">
                                            Keep your account secure
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-[#655d72]">
                                            Never share your password or account
                                            credentials with anyone.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </main>

                    </div>

                </div>

            </div>

            {/* CHANGE PASSWORD MODAL */}
            {showPasswordModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !passwordForm.processing
                        ) {
                            closePasswordModal();
                        }
                    }}
                >

                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                        {/* MODAL HEADER */}
                        <div className="flex items-start justify-between border-b border-[#eeeaf1] p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ead4] text-[#604709]">
                                    <Icon type="lock" size={22} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-[#32106a]">
                                        Change Password
                                    </h3>

                                    <p className="mt-1 text-xs text-[#77727d]">
                                        Update your account password securely.
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={closePasswordModal}
                                disabled={passwordForm.processing}
                                className="rounded-lg p-2 text-[#77717d] transition hover:bg-[#f5f5f5] disabled:opacity-50"
                            >
                                <Icon type="close" size={20} />
                            </button>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={submitPasswordChange}
                            className="p-6"
                        >

                            {/* CURRENT PASSWORD */}
                            <div>

                                <label
                                    htmlFor="current_password"
                                    className="block text-sm font-semibold text-[#292431]"
                                >
                                    Current Password
                                </label>

                                <input
                                    id="current_password"
                                    type="password"
                                    value={
                                        passwordForm.data.current_password
                                    }
                                    onChange={(event) =>
                                        passwordForm.setData(
                                            'current_password',
                                            event.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#5a4210]/20 ${
                                        passwordForm.errors.current_password
                                            ? 'border-red-400'
                                            : 'border-[#ddd7e1] focus:border-[#5a4210]'
                                    }`}
                                    placeholder="Enter your current password"
                                />

                                {passwordForm.errors.current_password && (
                                    <p className="mt-2 text-xs font-medium text-red-600">
                                        {passwordForm.errors.current_password}
                                    </p>
                                )}

                            </div>

                            {/* NEW PASSWORD */}
                            <div className="mt-5">

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-[#292431]"
                                >
                                    New Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(event) =>
                                        passwordForm.setData(
                                            'password',
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#5a4210]/20 ${
                                        passwordForm.errors.password
                                            ? 'border-red-400'
                                            : 'border-[#ddd7e1] focus:border-[#5a4210]'
                                    }`}
                                    placeholder="Enter a new password"
                                />

                                {passwordForm.errors.password && (
                                    <p className="mt-2 text-xs font-medium text-red-600">
                                        {passwordForm.errors.password}
                                    </p>
                                )}

                                <p className="mt-2 text-[11px] text-[#77717d]">
                                    Your new password must contain at least 8
                                    characters.
                                </p>

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="mt-5">

                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-semibold text-[#292431]"
                                >
                                    Confirm New Password
                                </label>

                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={
                                        passwordForm.data.password_confirmation
                                    }
                                    onChange={(event) =>
                                        passwordForm.setData(
                                            'password_confirmation',
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    className="mt-2 w-full rounded-xl border border-[#ddd7e1] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#5a4210] focus:ring-2 focus:ring-[#5a4210]/20"
                                    placeholder="Confirm your new password"
                                />

                            </div>

                            {/* BUTTONS */}
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closePasswordModal}
                                    disabled={passwordForm.processing}
                                    className="rounded-xl border border-[#ddd7e1] bg-white px-5 py-3 text-sm font-semibold text-[#514d58] transition hover:bg-[#f7f7f7] disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="rounded-xl bg-gradient-to-r from-[#5a4210] to-[#765817] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-[#4b3508] hover:to-[#62480f] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {passwordForm.processing
                                        ? 'Updating Password...'
                                        : 'Update Password'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </CustomerLayout>
    );
}