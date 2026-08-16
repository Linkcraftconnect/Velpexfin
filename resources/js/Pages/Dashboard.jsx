import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ statistics, user }) {
    const isSuperAdmin = user?.role === 'super_admin';

    return (
        <AdminLayout user={user}>

            <Head title="Administrator Dashboard" />

            {/* Dashboard Header */}
            <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold text-purple-900">
                        Comericafin Administration
                    </h1>

                    <p className="text-gray-500">
                        Banking Management Portal
                    </p>
                </div>

                <div className="flex items-center gap-6">

                    <div className="text-right">
                        <p className="font-bold text-purple-900">
                            {user?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-lg font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                        Sign Out
                    </Link>

                </div>

            </header>

            <div className="p-8">

                {/* Welcome */}
                <h2 className="text-3xl font-bold text-purple-900">
                    Welcome, {user?.name}
                </h2>

                <p className="text-gray-500 mt-2">
                    Manage Comericafin's virtual banking system from one secure location.
                </p>


                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                    {/* Customers */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-gray-500">
                            Customers
                        </h3>

                        <p className="text-4xl font-bold text-purple-900 mt-2">
                            {statistics?.customers ?? 0}
                        </p>
                    </div>


                    {/* Administrators */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-gray-500">
                            Administrators
                        </h3>

                        <p className="text-4xl font-bold text-purple-900 mt-2">
                            {statistics?.administrators ?? 0}
                        </p>
                    </div>


                    {/* Virtual Balance */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-gray-500">
                            Virtual Balance
                        </h3>

                        <p className="text-4xl font-bold text-green-600 mt-2">
                            ${Number(statistics?.virtualBalance || 0).toLocaleString(
                                'en-US',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                        </p>
                    </div>


                    {/* Transaction */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-gray-500">
                            Transaction
                        </h3>

                        <p className="text-4xl font-bold text-purple-900 mt-2">
                            {statistics?.transactions ?? 0}
                        </p>
                    </div>

                </div>


                {/* Quick Actions */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">


                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-purple-900 mb-5">
                            Quick Actions
                        </h2>

                        <div className="grid gap-3">


                            {/* Super Administrator Only */}
                            {isSuperAdmin && (
                                <Link
                                    href="/admin/administrators/create"
                                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center justify-between"
                                >
                                    <span className="font-semibold text-purple-900">
                                        + Create Administrator
                                    </span>

                                    <span className="text-gray-400">
                                        →
                                    </span>
                                </Link>
                            )}


                            {/* Create Customer */}
                            <Link
                                href="/admin/customers/create"
                                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center justify-between"
                            >
                                <span className="font-semibold text-purple-900">
                                    + Create Customer
                                </span>

                                <span className="text-gray-400">
                                    →
                                </span>
                            </Link>


                            {/* Transaction */}
                            <Link
                                href="/admin/transfers"
                                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center justify-between"
                            >
                                <span className="font-semibold text-purple-900">
                                    + View Transaction
                                </span>

                                <span className="text-gray-400">
                                    →
                                </span>
                            </Link>


                            {/* Reports — Super Administrator Only */}
                            {isSuperAdmin && (
                                <Link
                                    href="/admin/reports"
                                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center justify-between"
                                >
                                    <span className="font-semibold text-purple-900">
                                        + Reports
                                    </span>

                                    <span className="text-gray-400">
                                        →
                                    </span>
                                </Link>
                            )}

                        </div>

                    </div>


                    {/* Recent Administrator Activity */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-purple-900 mb-5">
                            Recent Administrator Activity
                        </h2>

                        <div className="text-gray-500 text-sm space-y-3">

                            <p>
                                No administrator activity yet.
                            </p>

                            <p>
                                All future logins and actions will appear here.
                            </p>

                        </div>

                    </div>


                    {/* System Status */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-bold text-purple-900 mb-5">
                            System Status
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Database</span>

                                <span className="text-green-600 font-bold">
                                    Online
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Authentication</span>

                                <span className="text-green-600 font-bold">
                                    Secure
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Banking System</span>

                                <span className="text-green-600 font-bold">
                                    Running
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Security</span>

                                <span className="text-green-600 font-bold">
                                    Protected
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}s