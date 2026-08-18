import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ auth }) {
    const isSuperAdmin = auth?.user?.role === 'super_admin';

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        can_manage_document_access: false,
    });

    function submit(e) {
        e.preventDefault();

        post('/admin/administrators');
    }

    return (
        <AdminLayout>
            <Head title="Create Administrator" />

            <div className="p-6">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-purple-900">
                        Create Administrator
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Create a new administrator account and assign permissions.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 max-w-2xl">

                    <form onSubmit={submit} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Enter administrator name"
                            />

                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="administrator@example.com"
                            />

                            {errors.email && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Enter password"
                            />

                            {errors.password && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm password"
                            />

                            {errors.password_confirmation && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>

                        {/* Document Access Permission */}
                        {isSuperAdmin && (
                            <div className="border border-purple-200 bg-purple-50 rounded-xl p-5">

                                <div className="flex items-start gap-3">

                                    <input
                                        type="checkbox"
                                        id="can_manage_document_access"
                                        checked={
                                            data.can_manage_document_access
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'can_manage_document_access',
                                                e.target.checked
                                            )
                                        }
                                        className="mt-1 h-5 w-5 text-purple-700 rounded focus:ring-purple-500"
                                    />

                                    <div>
                                        <label
                                            htmlFor="can_manage_document_access"
                                            className="font-bold text-purple-900 cursor-pointer"
                                        >
                                            Allow Customer Document Access Management
                                        </label>

                                        <p className="text-sm text-gray-600 mt-1">
                                            This allows the administrator to
                                            choose document permissions for
                                            customers they create.
                                        </p>

                                        <div className="mt-3 text-sm text-gray-700">
                                            <p className="font-semibold">
                                                The administrator will be able
                                                to control:
                                            </p>

                                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                                <li>
                                                    Statement page
                                                </li>
                                                <li>
                                                    Statement PDF download
                                                </li>
                                                <li>
                                                    Statement PNG download
                                                </li>
                                                <li>
                                                    Transfer receipt PDF
                                                </li>
                                                <li>
                                                    Transfer receipt PNG
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                {errors.can_manage_document_access && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.can_manage_document_access}
                                    </div>
                                )}

                            </div>
                        )}

                        {/* Submit */}
                        <div className="pt-4 border-t">

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Creating...'
                                    : 'Create Administrator'}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </AdminLayout>
    );
}
