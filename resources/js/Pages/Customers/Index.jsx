import { Link } from '@inertiajs/react';

export default function Index({ customers }) {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-purple-900">
                        Customers
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage Comericafin customer accounts
                    </p>
                </div>

                <Link
                    href="/admin/customers/create"
                    className="px-6 py-3 rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800"
                >
                    + Create Customer
                </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">Total Customers</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                        {customers.length}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">Active Accounts</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                        {customers.filter(
                            (customer) => customer.status === 'active'
                        ).length}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <p className="text-gray-500">Virtual Balance</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                        $
                        {customers
                            .reduce(
                                (total, customer) =>
                                    total + Number(customer.balance || 0),
                                0
                            )
                            .toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                    </p>
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-purple-900">
                        Customer Accounts
                    </h2>
                </div>

                {customers.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No customers found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4">
                                        Customer
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        Account Number
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        Balance
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {customer.profile_picture ? (
                                                    <img
                                                        src={`/storage/${customer.profile_picture}`}
                                                        alt={customer.name}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-900 font-bold">
                                                        {customer.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {customer.account_number}
                                        </td>

                                        <td className="px-6 py-4 font-semibold">
                                            $
                                            {Number(
                                                customer.balance || 0
                                            ).toLocaleString('en-US', {
                                                minimumFractionDigits: 2,
                                            })}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                                {customer.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}