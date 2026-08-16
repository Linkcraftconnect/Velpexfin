import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ administrator }) {

    const { data, setData, put, errors } = useForm({

        name: administrator.name,
        email: administrator.email,
        status: administrator.status,
        password: '',
        password_confirmation: '',

    });


    function submit(e) {

        e.preventDefault();

        put(`/admin/administrators/${administrator.id}`);

    }


    return (

        <AdminLayout>

            <Head title="Edit Administrator" />


            <div className="p-6">

                <div className="bg-white rounded-xl shadow p-8">


                    <h1 className="text-3xl font-bold text-purple-900 mb-6">
                        Edit Administrator
                    </h1>


                    <form onSubmit={submit} className="space-y-5">


                        <div>

                            <label className="block mb-2">
                                Name
                            </label>

                            <input
                                className="w-full border rounded-lg p-3"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />

                            {errors.name && (
                                <p className="text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>



                        <div>

                            <label className="block mb-2">
                                Email
                            </label>

                            <input
                                className="w-full border rounded-lg p-3"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />

                            {errors.email && (
                                <p className="text-red-500">
                                    {errors.email}
                                </p>
                            )}

                        </div>



                        <div>

                            <label className="block mb-2">
                                Status
                            </label>


                            <select
                                className="w-full border rounded-lg p-3"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >

                                <option value="active">
                                    Active
                                </option>


                                <option value="disabled">
                                    Disabled
                                </option>

                            </select>

                        </div>



                        <div>

                            <label className="block mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Leave blank to keep current password"
                                className="w-full border rounded-lg p-3"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />

                        </div>



                        <div>

                            <label className="block mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg p-3"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />

                        </div>



                        <button
                            className="bg-purple-700 text-white px-6 py-3 rounded-lg"
                        >
                            Save Changes
                        </button>


                    </form>


                </div>

            </div>


        </AdminLayout>

    );
}