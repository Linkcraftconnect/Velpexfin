import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.authenticate'));
    };

    return (
        <GuestLayout>
            <Head title="Administrator Login" />

            <div className="text-center mb-8">

                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    🔐 Administrator Portal
                </div>

                <h2 className="mt-5 text-3xl font-bold text-purple-900">
                    Administrator Login
                </h2>

                <p className="mt-2 text-gray-500">
                    Authorized personnel only.
                </p>

            </div>

            <form onSubmit={submit}>

                <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-600 focus:outline-none"
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-600 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 py-3 font-bold text-white hover:opacity-90"
                >
                    Administrator Sign In
                </button>

            </form>

        </GuestLayout>
    );
}