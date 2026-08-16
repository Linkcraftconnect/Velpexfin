import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ administrator }) {

    const toggleStatus = () => {
        router.patch(
            `/admin/administrators/${administrator.id}/toggle-status`
        );
    };

    return (
        <AdminLayout>

            <Head title="Administrator Profile" />

            <div className="p-6">

                <div className="bg-white rounded-xl shadow p-8">

                    <h1 className="text-3xl font-bold text-purple-900 mb-6">
                        Administrator Profile
                    </h1>


                    <div className="space-y-4">

                        <div>
                            <p className="text-gray-500">
                                Name
                            </p>

                            <p className="font-semibold">
                                {administrator.name}
                            </p>
                        </div>


                        <div>
                            <p className="text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold">
                                {administrator.email}
                            </p>
                        </div>


                        <div>
                            <p className="text-gray-500">
                                Role
                            </p>

                            <p className="font-semibold">
                                Administrator
                            </p>
                        </div>


                        <div>
                            <p className="text-gray-500">
                                Status
                            </p>

                            {administrator.status === 'active' ? (
                                <p className="text-green-600 font-bold">
                                    🟢 Active
                                </p>
                            ) : (
                                <p className="text-red-600 font-bold">
                                    🔴 Disabled
                                </p>
                            )}

                        </div>


                        <div>
                            <p className="text-gray-500">
                                Created
                            </p>

                            <p className="font-semibold">
                                {administrator.created_at}
                            </p>
                        </div>


                    </div>


                    <div className="mt-8 flex gap-4">

                        <Link
                            href={`/admin/administrators/${administrator.id}/edit`}
                            className="bg-purple-700 text-white px-5 py-2 rounded-lg"
                        >
                            Edit Administrator
                        </Link>


                        <button
                            onClick={toggleStatus}
                            className={`px-5 py-2 rounded-lg text-white ${
                                administrator.status === 'active'
                                    ? 'bg-red-600'
                                    : 'bg-green-600'
                            }`}
                        >
                            {administrator.status === 'active'
                                ? 'Disable Administrator'
                                : 'Enable Administrator'}
                        </button>


                        <Link
                            href="/admin/administrators"
                            className="border px-5 py-2 rounded-lg"
                        >
                            Back
                        </Link>

                    </div>


                </div>

            </div>

        </AdminLayout>
    );
}