
import { Link, router } from '@inertiajs/react';

export default function Show({ customer }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this customer account?')) {
            router.delete(`/admin/customers/${customer.id}`);
        }
    };

    const handleToggleStatus = () => {
        router.patch(`/admin/customers/${customer.id}/toggle-status`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-purple-900">
                            Customer Account
                        </h1>

                        <p className="text-gray-500 mt-1">
                            View and manage customer information
                        </p>
                    </div>

                    <Link
                        href="/admin/customers"
                        className="bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700"
                    >
                        ← Back to Customers
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between border-b pb-6 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {customer.name}
                            </h2>

                            <p className="text-gray-500">
                                {customer.email}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                customer.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {customer.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Customer Name
                            </p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {customer.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {customer.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {customer.phone || 'Not provided'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Account Number
                            </p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {customer.account_number}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Routing Number
                            </p>
                            <p className="font-semibold text-gray-800 mt-1">
                                {customer.routing_number}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Virtual Balance
                            </p>
                            <p className="text-2xl font-bold text-purple-900 mt-1">
                                ${Number(customer.balance || 0).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>

                    </div>

                    <div className="flex gap-4 mt-8 pt-6 border-t">
                        <Link
                            href={`/admin/customers/${customer.id}/edit`}
                            className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800"
                        >
                            Edit Customer
                        </Link>

                        <button
                            onClick={handleToggleStatus}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600"
                        >
                            {customer.status === 'active'
                                ? 'Disable Account'
                                : 'Enable Account'}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
                        >
                            Delete Customer
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}