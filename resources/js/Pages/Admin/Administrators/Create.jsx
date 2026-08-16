import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();

        post('/admin/administrators');
    }

    return (
        <AdminLayout>
            <Head title="Create Administrator" />

            <div className="p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Create Administrator
                </h1>

                <div className="bg-white rounded-xl shadow p-6 max-w-xl">

                    <form onSubmit={submit}>

                        <div className="mb-4">
                            <label className="block mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded-lg p-3"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />

                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>


                        <div className="mb-4">
                            <label className="block mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="w-full border rounded-lg p-3"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                            />

                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>


                        <div className="mb-4">
                            <label className="block mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg p-3"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                        </div>


                        <div className="mb-4">
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
                            type="submit"
                            disabled={processing}
                            className="bg-purple-700 text-white px-6 py-3 rounded-lg"
                        >
                            Create Administrator
                        </button>

                    </form>

                </div>

            </div>
        </AdminLayout>
    );
}
