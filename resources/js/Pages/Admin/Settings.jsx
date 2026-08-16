import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings({ user }) {
    return (
        <AdminLayout user={user}>
            <Head title="Administrator Settings" />

            <div className="max-w-6xl mx-auto">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-purple-900">
                        Administrator Settings
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your administrator account and preferences
                    </p>
                </div>

                {/* Administrator Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        👤 Administrator Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                value={user?.name || ''}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Role
                            </label>

                            <input
                                type="text"
                                value={user?.role || 'Administrator'}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Account Status
                            </label>

                            <input
                                type="text"
                                value={user?.status || 'Active'}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                            />
                        </div>

                    </div>

                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        🔐 Change Password
                    </h2>

                    <div className="max-w-2xl space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Current Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter current password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <button
                            type="button"
                            className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800"
                        >
                            Update Password
                        </button>

                    </div>

                </div>

                {/* Security */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        🛡️ Security
                    </h2>

                    <div className="flex items-center justify-between border-b pb-5">

                        <div>
                            <p className="font-semibold text-gray-800">
                                Administrator Access
                            </p>

                            <p className="text-sm text-gray-500">
                                Your account has administrator privileges.
                            </p>
                        </div>

                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                            Active
                        </span>

                    </div>

                    <div className="flex items-center justify-between pt-5">

                        <div>
                            <p className="font-semibold text-gray-800">
                                Account Role
                            </p>

                            <p className="text-sm text-gray-500">
                                Current administrator role
                            </p>
                        </div>

                        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
                            {user?.role || 'Administrator'}
                        </span>

                    </div>

                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        🔔 Notifications
                    </h2>

                    <div className="space-y-5">

                        <label className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">
                                    Customer Activity
                                </p>

                                <p className="text-sm text-gray-500">
                                    Receive notifications about customer activity.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-5 h-5 accent-purple-900"
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">
                                    Transfer Activity
                                </p>

                                <p className="text-sm text-gray-500">
                                    Receive notifications about virtual transfers.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-5 h-5 accent-purple-900"
                            />
                        </label>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}