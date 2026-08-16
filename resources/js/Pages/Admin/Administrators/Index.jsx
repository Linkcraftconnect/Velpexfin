import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
export default function Index({ administrators }) {
    return (
        <AdminLayout>
            <Head title="Administrators" />

            <div className="p-6">

                <PageHeader
                    title="Administrators"
                    description="Manage Comericafin administrator accounts and permissions."
                    buttonText="Create Administrator"
                    buttonLink="/admin/administrators/create"
                />


                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-semibold mb-4">
                        Administrator List
                    </h2>


                    {administrators.length === 0 ? (

                        <p className="text-gray-500">
                            No administrators found.
                        </p>

                    ) : (

                        <table className="w-full">

                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">
                                        Name
                                    </th>

                                    <th className="text-left p-3">
                                        Email
                                    </th>

                                    <th className="text-left p-3">
                                        Role
                                    </th>

                                    <th className="text-left p-3">
                                        Status
                                    </th>

                                    <th className="text-left p-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>


                            <tbody>

                                {administrators.map((admin) => (

                                    <tr key={admin.id} className="border-b">

                                        <td className="p-3">
                                            {admin.name}
                                        </td>

                                        <td className="p-3">
                                            {admin.email}
                                        </td>

                                        <td className="p-3">
                                            Administrator
                                        </td>

                                        <td className="p-3">
                                            {admin.status === 'active' ? (
                                                <span className="text-green-600 font-semibold">
                                                    🟢 Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">
                                                    🔴 Disabled
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <Link
                                                href={`/admin/administrators/${admin.id}`}
                                                className="text-purple-700 mr-3"
                                            >
                                                👁 View
                                            </Link>

                                            <Link
                                                href={`/admin/administrators/${admin.id}/edit`}
                                                className="text-blue-700"
                                            >
                                                ✏ Edit
                                            </Link>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>
        </AdminLayout>
    );
}