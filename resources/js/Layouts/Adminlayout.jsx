import { Link } from '@inertiajs/react';

export default function AdminLayout({ children, user }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-[#f7f7b8] border-r border-yellow-200 flex flex-col">

                {/* Logo */}
                <div className="px-6 py-6 border-b border-yellow-200">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/comericafin-logo.png"
                                alt="Comericafin"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Comericafin
                            </h1>

                            <p className="text-xs text-gray-600">
                                Administration
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">

                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 font-semibold hover:bg-yellow-100 transition"
                    >
                        <span className="text-xl">▦</span>
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href="/admin/customers"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 font-semibold hover:bg-yellow-100 transition"
                    >
                        <span className="text-xl">♙</span>
                        <span>Customers</span>
                    </Link>

                    {user?.role === 'super_admin' && (
                        <Link
                            href="/admin/administrators"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 font-semibold hover:bg-yellow-100 transition"
                        >
                            <span className="text-xl">♙</span>
                            <span>Administrators</span>
                        </Link>
                    )}

                    <Link
                        href={route('admin.transactions')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 font-semibold hover:bg-yellow-100 transition"
                    >
                        <span className="text-xl">↔</span>
                        <span>💳 Transactions</span>
                    </Link>

                    <Link
                        href="/admin/reports"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 font-semibold hover:bg-yellow-100 transition"
                    >
                        <span className="text-xl">▤</span>
                        <span>Reports</span>
                    </Link>

                </nav>

                {/* Administrator */}
                <div className="px-4 pb-4">

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-yellow-200">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : 'A'}
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 truncate">
                                    {user?.name || 'Administrator'}
                                </p>

                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || ''}
                                </p>
                            </div>

                        </div>

                        <Link
                            href="/admin/logout"
                            method="post"
                            as="button"
                            className="w-full mt-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                        >
                            Sign Out
                        </Link>

                    </div>

                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">

                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Administration
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage your Comericafin account system
                        </p>
                    </div>

                    <div className="text-sm text-gray-500">
                        {user?.name || 'Administrator'}
                    </div>

                </header>

                {/* Page */}
                <section className="p-6 md:p-8">
                    {children}
                </section>

            </main>

        </div>
    );
}