
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ customer }) {
    const toggleStatus = () => {
        if (
            confirm(
                `Are you sure you want to ${
                    customer.status === 'active' ? 'disable' : 'enable'
                } this customer account?`
            )
        ) {
            router.patch(`/admin/customers/${customer.id}/toggle-status`);
        }
    };

    const deleteCustomer = () => {
        if (
            confirm(
                'Are you sure you want to permanently delete this customer account? This action cannot be undone.'
            )
        ) {
            router.delete(`/admin/customers/${customer.id}`);
        }
    };

    return (
        <>
            <Head title={`Customer - ${customer.name}`} />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-purple-900">
                                Customer Details
                            </h1>

                            <p className="mt-1 text-gray-600">
                                View and manage this Comericafin customer account.
                            </p>
                        </div>

                        <Link
                            href="/admin/customers"
                            className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            ← Back to Customers
                        </Link>
                    </div>

                    <div className="mb-6 rounded-2xl bg-purple-900 p-8 text-white shadow-lg">
                        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

                            <div className="flex items-center gap-5">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-3xl font-bold text-purple-900">
                                    {customer.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {customer.name}
                                    </h2>

                                    <p className="mt-1 text-purple-200">
                                        {customer.email}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-bold ${
                                    customer.status === 'active'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                }`}
                            >
                                {customer.status === 'active'
                                    ? 'ACTIVE'
                                    : 'INACTIVE'}
                            </span>

                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl bg-white p-7 shadow-lg">
                            <h3 className="mb-6 text-xl font-bold text-purple-900">
                                👤 Personal Information
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {customer.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {customer.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {customer.phone || 'Not provided'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-7 shadow-lg">
                            <h3 className="mb-6 text-xl font-bold text-purple-900">
                                🏦 Account Information
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Account Number
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {customer.account_number ||
                                            'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Routing Number
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {customer.routing_number ||
                                            'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Virtual Balance
                                    </p>

                                    <p className="text-2xl font-bold text-purple-900">
                                        $
                                        {Number(
                                            customer.balance || 0
                                        ).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 rounded-2xl bg-white p-7 shadow-lg">
                        <h3 className="mb-5 text-xl font-bold text-purple-900">
                            Account Management
                        </h3>

                        <div className="flex flex-wrap gap-4">

                            <Link
                                href={`/admin/customers/${customer.id}/edit`}
                                className="rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
                            >
                                ✏️ Edit Customer
                            </Link>

                            <button
                                type="button"
                                onClick={toggleStatus}
                                className={`rounded-lg px-6 py-3 font-semibold text-white ${
                                    customer.status === 'active'
                                        ? 'bg-orange-500 hover:bg-orange-600'
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {customer.status === 'active'
                                    ? '🚫 Disable Account'
                                    : '🟢 Enable Account'}
                            </button>

                            <button
                                type="button"
                                onClick={deleteCustomer}
                                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                            >
                                🗑️ Delete Customer
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
