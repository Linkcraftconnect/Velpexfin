
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ customer }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: customer.name?.split(' ')[0] || '',
        last_name: customer.name?.split(' ').slice(1).join(' ') || '',
        email: customer.email || '',
        phone: customer.phone || '',
        routing_number: customer.routing_number || '',
        account_number: customer.account_number || '',
        balance: customer.balance || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/admin/customers/${customer.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* Header */}
            <div className="mb-8">
                <Link
                    href={`/admin/customers/${customer.id}`}
                    className="text-purple-900 hover:text-purple-700 font-medium"
                >
                    ← Back to Customer Details
                </Link>

                <h1 className="text-3xl font-bold text-purple-900 mt-4">
                    Edit Customer
                </h1>

                <p className="mt-2 text-gray-600">
                    Update this Comericafin customer account
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            First Name
                        </label>

                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Last Name
                        </label>

                        <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) =>
                                setData('phone', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.phone && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Routing Number */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Routing Number
                        </label>

                        <input
                            type="text"
                            maxLength="9"
                            value={data.routing_number}
                            onChange={(e) =>
                                setData('routing_number', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.routing_number && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.routing_number}
                            </p>
                        )}
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Account Number
                        </label>

                        <input
                            type="text"
                            value={data.account_number}
                            onChange={(e) =>
                                setData('account_number', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.account_number && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.account_number}
                            </p>
                        )}
                    </div>

                    {/* Balance */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Virtual Balance
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.balance}
                            onChange={(e) =>
                                setData('balance', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.balance && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.balance}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Leave blank to keep current password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">

                    <Link
                        href={`/admin/customers/${customer.id}`}
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>

                </div>

            </form>
        </div>
    );
}