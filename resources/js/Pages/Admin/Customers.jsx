import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Customers({ customers = [], user }) {
    const [search, setSearch] = useState('');

    const totalCustomers = customers.length;

    const activeAccounts = customers.filter(
        (customer) => customer.status === 'active'
    ).length;

    const virtualBalance = customers.reduce(
        (total, customer) =>
            total + Number(customer.balance || 0),
        0
    );

    const filteredCustomers = customers.filter((customer) => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return true;
        }

        return (
            customer.name?.toLowerCase().includes(searchText) ||
            customer.email?.toLowerCase().includes(searchText) ||
            customer.account_number
                ?.toLowerCase()
                .includes(searchText) ||
            customer.status?.toLowerCase().includes(searchText)
        );
    });

    const formatBalance = (balance) => {
        return Number(balance || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <AdminLayout user={user}>

            <div className="w-full max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

                    <div className="min-w-0">

                        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                            Customers
                        </h1>

                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            Manage Comericafin customer accounts
                        </p>

                    </div>

                    <Link
                        href="/admin/customers/create"
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-purple-900 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition"
                    >
                        + Create Customer
                    </Link>

                </div>


                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

                    {/* Total Customers */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

                        <p className="text-sm sm:text-base text-gray-500">
                            Total Customers
                        </p>

                        <p className="text-3xl sm:text-4xl font-bold text-purple-900 mt-2">
                            {totalCustomers}
                        </p>

                    </div>


                    {/* Active Accounts */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">

                        <p className="text-sm sm:text-base text-gray-500">
                            Active Accounts
                        </p>

                        <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">
                            {activeAccounts}
                        </p>

                    </div>


                    {/* Virtual Balance */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 sm:col-span-2 lg:col-span-1">

                        <p className="text-sm sm:text-base text-gray-500">
                            Virtual Balance
                        </p>

                        <p className="text-2xl sm:text-3xl font-bold text-purple-900 mt-2 break-words">
                            ${formatBalance(virtualBalance)}
                        </p>

                    </div>

                </div>


                {/* Customer Accounts */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Search Header */}
                    <div className="p-5 sm:p-6 border-b border-gray-200">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                Customer Accounts
                            </h2>

                            <div className="w-full sm:w-72">

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search customers..."
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Desktop / Tablet Table */}
                    <div className="hidden md:block overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-purple-900 text-white">

                                <tr>

                                    <th className="text-left px-5 lg:px-6 py-4 text-sm">
                                        Customer
                                    </th>

                                    <th className="text-left px-5 lg:px-6 py-4 text-sm">
                                        Account Number
                                    </th>

                                    <th className="text-left px-5 lg:px-6 py-4 text-sm">
                                        Balance
                                    </th>

                                    <th className="text-left px-5 lg:px-6 py-4 text-sm">
                                        Status
                                    </th>

                                    <th className="text-left px-5 lg:px-6 py-4 text-sm">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredCustomers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-12 text-gray-500"
                                        >
                                            {search
                                                ? 'No customers match your search.'
                                                : 'No customers found.'}
                                        </td>

                                    </tr>

                                ) : (

                                    filteredCustomers.map((customer) => (

                                        <tr
                                            key={customer.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition"
                                        >

                                            {/* Customer */}
                                            <td className="px-5 lg:px-6 py-4">

                                                <div className="min-w-0">

                                                    <p className="font-semibold text-gray-800 break-words">
                                                        {customer.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500 break-all mt-1">
                                                        {customer.email}
                                                    </p>

                                                </div>

                                            </td>


                                            {/* Account */}
                                            <td className="px-5 lg:px-6 py-4 text-gray-700 break-all">
                                                {customer.account_number || '—'}
                                            </td>


                                            {/* Balance */}
                                            <td className="px-5 lg:px-6 py-4 font-semibold text-purple-900 whitespace-nowrap">
                                                ${formatBalance(customer.balance)}
                                            </td>


                                            {/* Status */}
                                            <td className="px-5 lg:px-6 py-4">

                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize ${
                                                        customer.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {customer.status}
                                                </span>

                                            </td>


                                            {/* Actions */}
                                            <td className="px-5 lg:px-6 py-4">

                                                <Link
                                                    href={`/admin/customers/${customer.id}`}
                                                    className="inline-flex items-center justify-center text-purple-700 font-semibold hover:text-purple-900"
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


                    {/* Mobile Customer Cards */}
                    <div className="md:hidden">

                        {filteredCustomers.length === 0 ? (

                            <div className="text-center py-12 px-5 text-gray-500">

                                {search
                                    ? 'No customers match your search.'
                                    : 'No customers found.'}

                            </div>

                        ) : (

                            <div className="divide-y divide-gray-200">

                                {filteredCustomers.map((customer) => (

                                    <div
                                        key={customer.id}
                                        className="p-5"
                                    >

                                        {/* Customer Header */}
                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <h3 className="font-bold text-gray-800 text-base break-words">
                                                    {customer.name}
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-1 break-all">
                                                    {customer.email}
                                                </p>

                                            </div>

                                            <span
                                                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                    customer.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {customer.status}
                                            </span>

                                        </div>


                                        {/* Account Information */}
                                        <div className="mt-4 grid grid-cols-1 gap-3">

                                            <div className="bg-gray-50 rounded-xl p-3">

                                                <p className="text-xs text-gray-500">
                                                    Account Number
                                                </p>

                                                <p className="font-semibold text-gray-800 mt-1 break-all">
                                                    {customer.account_number || '—'}
                                                </p>

                                            </div>


                                            <div className="bg-purple-50 rounded-xl p-3">

                                                <p className="text-xs text-gray-500">
                                                    Balance
                                                </p>

                                                <p className="font-bold text-purple-900 text-lg mt-1">
                                                    ${formatBalance(customer.balance)}
                                                </p>

                                            </div>

                                        </div>


                                        {/* View Button */}
                                        <Link
                                            href={`/admin/customers/${customer.id}`}
                                            className="mt-4 w-full inline-flex items-center justify-center bg-purple-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-800 transition"
                                        >
                                            View Customer
                                        </Link>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>


                {/* Search Result Count */}
                {search && (
                    <p className="text-sm text-gray-500 mt-3">
                        Showing {filteredCustomers.length} of {customers.length} customers
                    </p>
                )}

            </div>

        </AdminLayout>
    );
}