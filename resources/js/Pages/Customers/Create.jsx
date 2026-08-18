import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    const { canManageDocumentAccess = false } = usePage().props;

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

        statement_access: false,
        statement_pdf_access: false,
        statement_png_access: false,
        receipt_pdf_access: false,
        receipt_png_access: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/admin/customers', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create Customer" />

            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

                <div className="w-full max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8">

                        <Link
                            href="/admin/customers"
                            className="inline-flex items-center text-purple-900 hover:text-purple-700 font-semibold mb-4"
                        >
                            ← Back to Customers
                        </Link>

                        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                            Create Customer
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                            Create a new Comericafin customer account.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-2xl shadow-lg p-5 sm:p-8"
                    >

                        {/* ============================= */}
                        {/* PROFILE PICTURE */}
                        {/* ============================= */}

                        <div className="mb-8">

                            <h2 className="text-xl font-bold text-purple-900 mb-4">
                                Profile
                            </h2>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Profile Picture
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'profile_picture',
                                        e.target.files[0] || null
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                            />

                            {errors.profile_picture && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.profile_picture}
                                </p>
                            )}

                        </div>


                        {/* ============================= */}
                        {/* CUSTOMER INFORMATION */}
                        {/* ============================= */}

                        <div className="border-t border-gray-200 pt-8">

                            <h2 className="text-xl font-bold text-purple-900 mb-5">
                                Customer Information
                            </h2>

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
                                            setData(
                                                'first_name',
                                                e.target.value
                                            )
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
                                            setData(
                                                'last_name',
                                                e.target.value
                                            )
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
                                            setData(
                                                'email',
                                                e.target.value
                                            )
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


                                {/* Phone */}
                                <div>

                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData(
                                                'phone',
                                                e.target.value
                                            )
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

                            </div>

                        </div>


                        {/* ============================= */}
                        {/* ACCOUNT INFORMATION */}
                        {/* ============================= */}

                        <div className="border-t border-gray-200 pt-8 mt-8">

                            <h2 className="text-xl font-bold text-purple-900 mb-5">
                                Account Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Routing Number */}
                                <div>

                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Routing Number
                                    </label>

                                    <input
                                        type="text"
                                        value={data.routing_number}
                                        onChange={(e) =>
                                            setData(
                                                'routing_number',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter 9-digit routing number"
                                        maxLength={9}
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
                                            setData(
                                                'account_number',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter account number"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.account_number && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.account_number}
                                        </p>
                                    )}

                                </div>


                                {/* Checking Balance */}
                                <div>

                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Checking Balance
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.balance}
                                        onChange={(e) =>
                                            setData(
                                                'balance',
                                                e.target.value
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.balance && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.balance}
                                        </p>
                                    )}

                                </div>


                                {/* Savings Balance */}
                                <div>

                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Savings Balance
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.savings_balance}
                                        onChange={(e) =>
                                            setData(
                                                'savings_balance',
                                                e.target.value
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.savings_balance && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.savings_balance}
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ============================= */}
                        {/* CUSTOMER PASSWORD */}
                        {/* ============================= */}

                        <div className="border-t border-gray-200 pt-8 mt-8">

                            <h2 className="text-xl font-bold text-purple-900 mb-5">
                                Login Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Password */}
                                <div>

                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target.value
                                            )
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
                                            setData(
                                                'password_confirmation',
                                                e.target.value
                                            )
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

                            </div>

                        </div>


                        {/* ======================================= */}
                        {/* DOCUMENT ACCESS PERMISSIONS */}
                        {/* ======================================= */}

                        {canManageDocumentAccess && (

                            <div className="border border-purple-200 rounded-2xl bg-purple-50 p-5 sm:p-6 mt-8">

                                <div className="mb-6">

                                    <h2 className="text-xl font-bold text-purple-900">
                                        Customer Document Access
                                    </h2>

                                    <p className="text-sm text-gray-600 mt-1">
                                        Choose which statement and receipt
                                        features this customer can access.
                                    </p>

                                </div>


                                <div className="space-y-5">

                                    {/* Statement Page */}
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.statement_access}
                                            onChange={(e) =>
                                                setData(
                                                    'statement_access',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                        />

                                        <div>

                                            <div className="font-semibold text-gray-800">
                                                Statement Page
                                            </div>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Allow this customer to view
                                                their account statement.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Statement PDF */}
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.statement_pdf_access}
                                            onChange={(e) =>
                                                setData(
                                                    'statement_pdf_access',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                        />

                                        <div>

                                            <div className="font-semibold text-gray-800">
                                                Statement PDF Download
                                            </div>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Allow this customer to download
                                                their statement as a PDF.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Statement PNG */}
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.statement_png_access}
                                            onChange={(e) =>
                                                setData(
                                                    'statement_png_access',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                        />

                                        <div>

                                            <div className="font-semibold text-gray-800">
                                                Statement PNG Download
                                            </div>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Allow this customer to download
                                                their statement as a PNG image.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Receipt PDF */}
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.receipt_pdf_access}
                                            onChange={(e) =>
                                                setData(
                                                    'receipt_pdf_access',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                        />

                                        <div>

                                            <div className="font-semibold text-gray-800">
                                                Receipt PDF Download
                                            </div>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Allow this customer to download
                                                completed transfer receipts as PDF.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Receipt PNG */}
                                    <label className="flex items-start gap-3 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.receipt_png_access}
                                            onChange={(e) =>
                                                setData(
                                                    'receipt_png_access',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                                        />

                                        <div>

                                            <div className="font-semibold text-gray-800">
                                                Receipt PNG Download
                                            </div>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Allow this customer to download
                                                completed transfer receipts as PNG.
                                            </p>

                                        </div>

                                    </label>

                                </div>

                            </div>

                        )}


                        {/* ============================= */}
                        {/* BUTTONS */}
                        {/* ============================= */}

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200">

                            <Link
                                href="/admin/customers"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-900 text-white font-semibold hover:bg-purple-800 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Creating...'
                                    : 'Create Customer'}
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}