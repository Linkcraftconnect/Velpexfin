import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Reports({ user }) {
    return (
        <AdminLayout user={user}>
            <Head title="Reports" />

            <div className="space-y-8">

                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-purple-900">
                        Reports
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage Comericafin virtual banking reports.
                    </p>
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {/* Customer Reports */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl mb-5">
                            👥
                        </div>

                        <h2 className="text-xl font-bold text-purple-900">
                            Customer Reports
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View customer account information and account activity.
                        </p>

                        <Link
                            href="/admin/customers"
                            className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-900 hover:text-purple-700"
                        >
                            View Report
                            <span>→</span>
                        </Link>
                    </div>

                    {/* Transaction Reports */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl mb-5">
                            💸
                        </div>

                        <h2 className="text-xl font-bold text-purple-900">
                            Transaction Reports
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Review virtual transaction activity within the simulation.
                        </p>

                        <Link
                            href="/admin/transfers"
                            className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-900 hover:text-purple-700"
                        >
                            View Report
                            <span>→</span>
                        </Link>
                    </div>

                    {/* Administrator Reports */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl mb-5">
                            🛡️
                        </div>

                        <h2 className="text-xl font-bold text-purple-900">
                            Administrator Reports
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Review administrator accounts and system activity.
                        </p>

                        <Link
                            href="/admin/administrators"
                            className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-900 hover:text-purple-700"
                        >
                            View Report
                            <span>→</span>
                        </Link>
                    </div>

                    {/* System Reports */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl mb-5">
                            📊
                        </div>

                        <h2 className="text-xl font-bold text-purple-900">
                            System Reports
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View overall virtual banking system information.
                        </p>

                        <Link
                            href="/admin/dashboard"
                            className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-900 hover:text-purple-700"
                        >
                            View Report
                            <span>→</span>
                        </Link>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}