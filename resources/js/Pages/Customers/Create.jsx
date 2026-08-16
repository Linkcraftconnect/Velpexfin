import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        routing_number: '',
        account_number: '',
        balance: '',
        savings_balance: '',
        password: '',
        password_confirmation: '',
        profile_picture: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/admin/customers', {
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/customers"
                    className="text-purple-900 hover:text-purple-700 font-medium"
                >
                    ← Back to Customers
                </Link>

                <h1 className="text-3xl font-bold text-purple-900 mt-4">
                    Create Customer
                </h1>

                <p className="mt-2 text-gray-600">
                    Create a new Comericafin customer account
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={submit}
                className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl"
            >
                {/* Profile Picture */}
                <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Profile Picture
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData('profile_picture', e.target.files[0])
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />

                    {errors.profile_picture && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.profile_picture}
                        </p>
                    )}
                </div>

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
                            placeholder="Enter first name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.first_name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.first_name}
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
                            placeholder="Enter last name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.last_name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.last_name}
                            </p>
                        )}
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
                            placeholder="customer@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Enter customer password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            placeholder="Confirm customer password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.password_confirmation && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password_confirmation}
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
                            placeholder="Enter phone number"
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
                            value={data.routing_number}
                            onChange={(e) =>
                                setData('routing_number', e.target.value)
                            }
                            placeholder="Enter virtual routing number"
                            maxLength="9"
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
                            placeholder="Enter virtual account number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.account_number && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.account_number}
                            </p>
                        )}
                    </div>

                    {/* Initial Balance */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Checking Balance
                        </label>

                        <input
                            type="number"
                            value={data.balance}
                            onChange={(e) =>
                                setData('balance', e.target.value)
                            }
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.balance && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.balance}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Savings Balance
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.savings_balance}
                            onChange={(e) => setData('savings_balance', e.target.value)}
                            placeholder="0.00"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.savings_balance && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.savings_balance}
                            </p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <Link
                        href="/admin/customers"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800 disabled:opacity-50"
                    >
                        {processing ? 'Creating...' : 'Create Customer'}
                    </button>
                </div>
            </form>
        </div>
    );
}