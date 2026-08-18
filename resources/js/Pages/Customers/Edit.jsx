import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({
    customer,
    canManageDocumentAccess = false,
}) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        routing_number: customer?.routing_number || '',
        account_number: customer?.account_number || '',
        balance: customer?.balance || '0.00',
        savings_balance: customer?.savings_balance || '0.00',
        status: customer?.status || 'active',

        statement_access: Boolean(
            customer?.statement_access
        ),

        statement_pdf_access: Boolean(
            customer?.statement_pdf_access
        ),

        statement_png_access: Boolean(
            customer?.statement_png_access
        ),

        receipt_pdf_access: Boolean(
            customer?.receipt_pdf_access
        ),

        receipt_png_access: Boolean(
            customer?.receipt_png_access
        ),
    });

    if (!customer) {
        return (
            <AdminLayout>
                <Head title="Customer Not Found" />

                <div className="p-6">
                    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

                        <h1 className="text-2xl font-bold text-red-600">
                            Customer Not Found
                        </h1>

                        <p className="mt-2 text-gray-600">
                            The customer information could not be loaded.
                        </p>

                        <Link
                            href="/admin/customers"
                            className="mt-6 inline-flex rounded-xl bg-purple-900 px-6 py-3 font-semibold text-white hover:bg-purple-800"
                        >
                            ← Back to Customers
                        </Link>

                    </div>
                </div>
            </AdminLayout>
        );
    }

    function submit(e) {
        e.preventDefault();

        put(`/admin/customers/${customer.id}`);
    }

    return (
        <AdminLayout>

            <Head title={`Edit Customer - ${customer.name}`} />

            <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

                <div className="mx-auto max-w-4xl">

                    {/* Back */}
                    <Link
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center text-sm sm:text-base font-semibold text-purple-900 hover:text-purple-700"
                    >
                        ← Back to Customer
                    </Link>

                    {/* Header */}
                    <div className="mt-4 mb-6">

                        <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                            Edit Customer
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Update customer account information and document access.
                        </p>

                    </div>

                    <form onSubmit={submit} className="space-y-6">

                        {/* Personal Information */}
                        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">

                            <h2 className="mb-6 text-xl font-bold text-purple-900">
                                👤 Personal Information
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Name */}
                                <div className="md:col-span-2">

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}

                                </div>

                                {/* Email */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
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
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}

                                </div>

                                {/* Phone */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Phone
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
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Account Information */}
                        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg">

                            <h2 className="mb-6 text-xl font-bold text-purple-900">
                                🏦 Account Information
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Routing Number */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Routing Number
                                    </label>

                                    <input
                                        type="text"
                                        maxLength="9"
                                        value={data.routing_number}
                                        onChange={(e) =>
                                            setData(
                                                'routing_number',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.routing_number && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.routing_number}
                                        </p>
                                    )}

                                </div>

                                {/* Account Number */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
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
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />

                                    {errors.account_number && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.account_number}
                                        </p>
                                    )}

                                </div>

                                {/* Checking Balance */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Checking Balance
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                                            $
                                        </span>

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
                                            className="w-full rounded-xl border border-gray-300 p-3 pl-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />

                                    </div>

                                    {errors.balance && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.balance}
                                        </p>
                                    )}

                                </div>

                                {/* Savings Balance */}
                                <div>

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Savings Balance
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                                            $
                                        </span>

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
                                            className="w-full rounded-xl border border-gray-300 p-3 pl-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />

                                    </div>

                                    {errors.savings_balance && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.savings_balance}
                                        </p>
                                    )}

                                </div>

                                {/* Status */}
                                <div className="md:col-span-2">

                                    <label className="mb-2 block font-semibold text-gray-700">
                                        Account Status
                                    </label>

                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                'status',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>

                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.status}
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Document Permissions */}
                        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 sm:p-8 shadow-lg">

                            <div className="mb-6">

                                <h2 className="text-xl font-bold text-purple-900">
                                    📄 Statement & Receipt Permissions
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Choose which documents this customer can access and download.
                                </p>

                            </div>

                            {!canManageDocumentAccess && (
                                <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                                    <p className="text-sm font-semibold text-yellow-800">
                                        Document permissions are currently locked.
                                    </p>

                                    <p className="mt-1 text-sm text-yellow-700">
                                        You do not have permission to change these settings.
                                    </p>

                                </div>
                            )}

                            <div className="space-y-4">

                                {/* Statement Access */}
                                <label
                                    className={`flex items-start gap-3 rounded-xl border bg-white p-4 ${
                                        canManageDocumentAccess
                                            ? 'cursor-pointer border-gray-200'
                                            : 'cursor-not-allowed border-gray-200 opacity-60'
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.statement_access}
                                        disabled={!canManageDocumentAccess}
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
                                            Statement Access
                                        </div>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow the customer to access their account statements.
                                        </p>

                                    </div>

                                </label>

                                {/* Statement PDF */}
                                <label
                                    className={`flex items-start gap-3 rounded-xl border bg-white p-4 ${
                                        canManageDocumentAccess
                                            ? 'cursor-pointer border-gray-200'
                                            : 'cursor-not-allowed border-gray-200 opacity-60'
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.statement_pdf_access}
                                        disabled={!canManageDocumentAccess}
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

                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow the customer to download statements as PDF files.
                                        </p>

                                    </div>

                                </label>

                                {/* Statement PNG */}
                                <label
                                    className={`flex items-start gap-3 rounded-xl border bg-white p-4 ${
                                        canManageDocumentAccess
                                            ? 'cursor-pointer border-gray-200'
                                            : 'cursor-not-allowed border-gray-200 opacity-60'
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.statement_png_access}
                                        disabled={!canManageDocumentAccess}
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

                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow the customer to download statements as PNG images.
                                        </p>

                                    </div>

                                </label>

                                {/* Receipt PDF */}
                                <label
                                    className={`flex items-start gap-3 rounded-xl border bg-white p-4 ${
                                        canManageDocumentAccess
                                            ? 'cursor-pointer border-gray-200'
                                            : 'cursor-not-allowed border-gray-200 opacity-60'
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.receipt_pdf_access}
                                        disabled={!canManageDocumentAccess}
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

                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow the customer to download transaction receipts as PDF files.
                                        </p>

                                    </div>

                                </label>

                                {/* Receipt PNG */}
                                <label
                                    className={`flex items-start gap-3 rounded-xl border bg-white p-4 ${
                                        canManageDocumentAccess
                                            ? 'cursor-pointer border-gray-200'
                                            : 'cursor-not-allowed border-gray-200 opacity-60'
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.receipt_png_access}
                                        disabled={!canManageDocumentAccess}
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

                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow the customer to download transaction receipts as PNG images.
                                        </p>

                                    </div>

                                </label>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">

                            <Link
                                href={`/admin/customers/${customer.id}`}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-xl bg-purple-900 px-6 py-3 font-semibold text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving Changes...'
                                    : 'Save Changes'}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}