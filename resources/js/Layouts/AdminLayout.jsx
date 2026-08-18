import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, user }) {
    const { auth } = usePage().props;

    const currentUser = user || auth?.user || null;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* =========================
                TOP HEADER
            ========================== */}
            <header className="bg-purple-950 text-white shadow-lg">

                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

                    {/* Logo / Brand */}
                    <Link
                        href="/admin/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                            <span className="text-purple-950 font-bold text-lg">
                                C
                            </span>
                        </div>

                        <div>
                            <div className="font-bold text-lg leading-tight">
                                Comericafin
                            </div>

                            <div className="text-xs text-purple-200">
                                Administrator Portal
                            </div>
                        </div>
                    </Link>


                    {/* Desktop User */}
                    <div className="hidden md:flex items-center gap-4">

                        {currentUser && (
                            <div className="text-right">
                                <p className="font-semibold text-sm">
                                    {currentUser.name}
                                </p>

                                <p className="text-xs text-purple-200 capitalize">
                                    {currentUser.role?.replace('_', ' ')}
                                </p>
                            </div>
                        )}

                        <form
                            method="POST"
                            action="/admin/logout"
                        >
                            <button
                                type="submit"
                                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Logout
                            </button>
                        </form>

                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                        className="md:hidden p-2 rounded-lg hover:bg-white/10"
                    >
                        <span className="text-2xl">
                            {mobileMenuOpen ? '✕' : '☰'}
                        </span>
                    </button>

                </div>


                {/* Mobile User */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-purple-800 px-4 py-4">

                        {currentUser && (
                            <div className="mb-4">
                                <p className="font-semibold">
                                    {currentUser.name}
                                </p>

                                <p className="text-xs text-purple-200 capitalize">
                                    {currentUser.role?.replace('_', ' ')}
                                </p>
                            </div>
                        )}

                    </div>
                )}

            </header>


            {/* =========================
                MAIN LAYOUT
            ========================== */}
            <div className="flex min-h-[calc(100vh-73px)]">


                {/* =========================
                    SIDEBAR
                ========================== */}
                <aside
                    className={`
                        fixed md:static
                        inset-y-0 left-0
                        z-40
                        w-64
                        bg-purple-950
                        text-white
                        transform
                        transition-transform
                        duration-200
                        ${mobileMenuOpen
                            ? 'translate-x-0'
                            : '-translate-x-full md:translate-x-0'
                        }
                    `}
                    style={{
                        top: '73px',
                    }}
                >

                    <nav className="p-4 space-y-2">


                        {/* Dashboard */}
                        <Link
                            href="/admin/dashboard"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>🏠</span>
                            <span>Dashboard</span>
                        </Link>


                        {/* =========================
                            CUSTOMERS
                        ========================== */}
                        <Link
                            href="/admin/customers"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>👥</span>
                            <span>Customers</span>
                        </Link>


                        {/* =========================
                            CREATE CUSTOMER
                        ========================== */}
                        <Link
                            href="/admin/customers/create"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>➕</span>
                            <span>Create Customer</span>
                        </Link>


                        {/* Transactions */}
                        <Link
                            href="/admin/transactions"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>💳</span>
                            <span>Transactions</span>
                        </Link>


                        {/* Reports */}
                        <Link
                            href="/admin/reports"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>📊</span>
                            <span>Reports</span>
                        </Link>


                        {/* Settings */}
                        <Link
                            href="/admin/settings"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                        >
                            <span>⚙️</span>
                            <span>Settings</span>
                        </Link>


                        {/* =========================
                            SUPER ADMIN ONLY
                        ========================== */}
                        {currentUser?.role === 'super_admin' && (
                            <>
                                <div className="border-t border-purple-800 my-4" />

                                <div className="px-4 py-2 text-xs uppercase tracking-wider text-purple-300">
                                    Administration
                                </div>

                                <Link
                                    href="/admin/administrators"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                                >
                                    <span>🛡️</span>
                                    <span>Administrators</span>
                                </Link>

                                <Link
                                    href="/admin/administrators/create"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-800 transition"
                                >
                                    <span>➕</span>
                                    <span>Create Administrator</span>
                                </Link>
                            </>
                        )}

                    </nav>


                    {/* Mobile Logout */}
                    <div className="md:hidden px-4 pb-6">

                        <form
                            method="POST"
                            action="/admin/logout"
                        >
                            <button
                                type="submit"
                                className="w-full bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-sm font-semibold transition"
                            >
                                Logout
                            </button>
                        </form>

                    </div>

                </aside>


                {/* =========================
                    MOBILE OVERLAY
                ========================== */}
                {mobileMenuOpen && (
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={closeMobileMenu}
                        className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    />
                )}


                {/* =========================
                    PAGE CONTENT
                ========================== */}
                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}