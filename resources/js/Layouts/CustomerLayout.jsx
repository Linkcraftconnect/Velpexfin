import { Link } from '@inertiajs/react';

export default function CustomerLayout({ children, user }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-purple-900 text-white min-h-screen">

                <div className="px-6 py-6 border-b border-purple-700">
                    <h1 className="text-2xl font-bold">
                        Comericafin
                    </h1>

                    <p className="text-purple-200 text-sm mt-1">
                        Customer Portal
                    </p>
                </div>

                <nav className="mt-4">

                    <Link
                        href="/customer/dashboard"
                        className="block px-6 py-4 hover:bg-purple-800"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        href={route('customer.transactions')}
                        className="block px-6 py-4 hover:bg-purple-800"
                    >
                        Transactions
                    </Link>

                    <Link
                        href="/customer/transfer"
                        className="block px-6 py-4 hover:bg-purple-800"
                    >
                        💸 Transfer
                    </Link>

                    <Link
                        href="/customer/profile"
                        className="block px-6 py-4 hover:bg-purple-800"
                    >
                        👤 Profile
                    </Link>

                    <Link
                        href="/customer/settings"
                        className="block px-6 py-4 hover:bg-purple-800"
                    >
                        ⚙ Settings
                    </Link>

                    <Link
                        href="/customer/logout"
                        method="post"
                        as="button"
                        className="w-full text-left px-6 py-4 hover:bg-red-700"
                    >
                        🚪 Sign Out
                    </Link>

                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1">

                <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold text-purple-900">
                            Comericafin
                        </h1>

                        <p className="text-gray-500 text-sm">
                            Customer Banking Portal
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold text-purple-900">
                            {user?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            Customer
                        </p>
                    </div>

                </header>

                <div className="p-8">
                    {children}
                </div>

            </main>

        </div>
    );
}