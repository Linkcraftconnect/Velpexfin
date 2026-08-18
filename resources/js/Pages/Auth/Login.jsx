import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Customer Login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800">
                    🛡 Customer Login
                </div>

                <h2 className="mt-5 text-3xl font-bold text-purple-900">
                    Welcome Back
                </h2>

                <p className="mt-2 text-gray-500">
                    Sign in to access your Comericafin account securely.
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="📧 Email Address"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.email}
                        className="mt-2"
                    />
                </div>

                <div className="mt-5">
                    <InputLabel
                        htmlFor="password"
                        value="🔒 Password"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    e.target.checked
                                )
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember Me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-purple-700 hover:text-purple-900"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>

                <PrimaryButton
                    className="mt-8 w-full justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 py-3 text-base font-bold text-white shadow-lg"
                    disabled={processing}
                >
                    🔒 Secure Sign In
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}