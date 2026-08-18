import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ administrator, auth }) {
    const isSuperAdmin = auth?.user?.role === 'super_admin';

    const { data, setData, put, errors, processing } = useForm({
        name: administrator.name ?? '',
        email: administrator.email ?? '',
        status: administrator.status ?? 'active',
        password: '',
        password_confirmation: '',
        can_manage_document_access:
            Boolean(administrator.can_manage_document_access),
    });

    function submit(e) {
        e.preventDefault();

        put(`/admin/administrators/${administrator.id}`);
    }

    return (
        <AdminLayout>
            <Head title="Edit Administrator" />

            <div className="p-6">
                <div className="bg-white rounded-xl shadow p-8 max-w-3xl">

                    <h1 className="text-3xl font-bold text-purple-900 mb-2">
                        Edit Administrator
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Manage administrator account information and permissions.
                    </p>

                    <form onSubmit={submit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded-lg p-3"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                className="w-full border rounded-lg p-3"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Status
                            </label>

                            <select
                                className="w-full border rounded-lg p-3"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                            >
                                <option value="active">
                                    Active
                                </option>

                                <option value="disabled">
                                    Disabled
                                </option>
                            </select>

                            {errors.status && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        {/* Document Access Permission */}
                        {isSuperAdmin && (
                            <div className="border border-purple-200 rounded-xl bg-purple-50 p-5">

                                <div className="flex items-start gap-4">

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
                                        className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                    />

                                    <div>
                                        <label
                                            htmlFor="can_manage_document_access"
                                            className="font-bold text-purple-900 cursor-pointer"
                                        >
                                            Allow Customer Document Access Management
                                        </label>

                                        <p className="text-sm text-gray-600 mt-1">
                                            When enabled, this administrator
                                            can choose document access
                                            permissions for customers they
                                            create.
                                        </p>

                                        <div className="mt-3 text-sm text-gray-700">
                                            <p className="font-semibold mb-1">
                                                Available customer permissions:
                                            </p>

                                            <ul className="list-disc ml-5 space-y-1">
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
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.can_manage_document_access}
                                    </p>
                                )}

                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Leave blank to keep current password"
                                className="w-full border rounded-lg p-3"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg p-3"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                            />

                            {errors.password_confirmation && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t">

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </AdminLayout>
    );
}
