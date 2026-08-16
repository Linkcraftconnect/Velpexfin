import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Customers({ customers = [], user }) {
    const totalCustomers = customers.length;

    const activeAccounts = customers.filter(
        (customer) => customer.status === 'active'
    ).length;

    const virtualBalance = customers.reduce(
        (total, customer) => total + Number(customer.balance || 0),
        0
    );

    return (
        <AdminLayout user={user}>
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-purple-900">
                            Customers
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage Comericafin customer accounts
                        </p>
                    </div>

                    <Link
                        href="/admin/customers/create"
                        className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800"
                    >
                        + Create Customer
                    </Link>

                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <p className="text-gray-500">
                            Total Customers
                        </p>

                        <p className="text-3xl font-bold text-purple-900 mt-2">
                            {totalCustomers}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <p className="text-gray-500">
                            Active Accounts
                        </p>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {activeAccounts}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <p className="text-gray-500">
                            Virtual Balance
                        </p>

                        <p className="text-3xl font-bold text-purple-900 mt-2">
                            ${virtualBalance.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>

                </div>

                {/* Customer Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-bold text-gray-800">
                                Customer Accounts
                            </h2>

                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-purple-900 text-white">
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

                                    <th className="text-left px-6 py-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {customers.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-12 text-gray-500"
                                        >
                                            No customers found.
                                        </td>
                                    </tr>

                                ) : (

                                    customers.map((customer) => (

                                        <tr
                                            key={customer.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {customer.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {customer.account_number || '—'}
                                            </td>

                                            <td className="px-6 py-4 font-semibold text-purple-900">
                                                ${Number(
                                                    customer.balance || 0
                                                ).toLocaleString('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        customer.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {customer.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">

                                                <Link
                                                    href={`/admin/customers/${customer.id}`}
                                                    className="text-purple-700 font-semibold hover:text-purple-900"
                                                >
                                                    View
                                                </Link>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}