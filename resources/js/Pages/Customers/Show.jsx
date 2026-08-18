import { Head, Link, router } from '@inertiajs/react';

export default function Show({
    customer,
    canManageDocumentAccess = false,
}) {
    const toggleStatus = () => {
        if (
            confirm(
                `Are you sure you want to ${
                    customer.status === 'active' ? 'disable' : 'enable'
                } this customer account?`
            )
        ) {
            router.patch(
                `/admin/customers/${customer.id}/toggle-status`
            );
        }
    };

    const deleteCustomer = () => {
        if (
            confirm(
                'Are you sure you want to permanently delete this customer account? This action cannot be undone.'
            )
        ) {
            router.delete(`/admin/customers/${customer.id}`);
        }
    };

    const formatMoney = (amount) => {
        return Number(amount || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const permissionStatus = (value) => {
        return value ? 'Enabled' : 'Disabled';
    };

    return (
        <>
            <Head title={`Customer - ${customer?.name || 'Customer'}`} />

            <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                                Customer Details
                            </h1>

                            <p className="mt-1 text-sm sm:text-base text-gray-600">
                                View and manage this Comericafin customer account.
                            </p>
                        </div>

                        <Link
                            href="/admin/customers"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            ← Back to Customers
                        </Link>

                    </div>

                    {/* Customer Header */}
                    <div className="mb-6 rounded-2xl bg-purple-900 p-6 sm:p-8 text-white shadow-lg">

                        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

                            <div className="flex items-center gap-4 sm:gap-5">

                                <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-2xl sm:text-3xl font-bold text-purple-900">
                                    {customer?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || 'C'}
                                </div>

                                <div className="min-w-0">

                                    <h2 className="text-2xl sm:text-3xl font-bold break-words">
                                        {customer?.name}
                                    </h2>

                                    <p className="mt-1 break-all text-purple-200">
                                        {customer?.email}
                                    </p>

                                </div>

                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-bold ${
                                    customer?.status === 'active'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                }`}
                            >
                                {customer?.status === 'active'
                                    ? 'ACTIVE'
                                    : 'INACTIVE'}
                            </span>

                        </div>

                    </div>

                    {/* Personal + Account Information */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Personal Information */}
                        <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-lg">

                            <h3 className="mb-6 text-xl font-bold text-purple-900">
                                👤 Personal Information
                            </h3>

                            <div className="space-y-5">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {customer?.name || 'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Address
                                    </p>

                                    <p className="mt-1 break-all font-semibold text-gray-800">
                                        {customer?.email || 'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {customer?.phone || 'Not provided'}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Account Information */}
                        <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-lg">

                            <h3 className="mb-6 text-xl font-bold text-purple-900">
                                🏦 Account Information
                            </h3>

                            <div className="space-y-5">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Account Number
                                    </p>

                                    <p className="mt-1 break-all font-semibold text-gray-800">
                                        {customer?.account_number ||
                                            'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Routing Number
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {customer?.routing_number ||
                                            'Not provided'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Checking Balance
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-purple-900">
                                        $
                                        {formatMoney(
                                            customer?.balance
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Savings Balance
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-purple-900">
                                        $
                                        {formatMoney(
                                            customer?.savings_balance
                                        )}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Document Permissions */}
                    <div className="mt-6 rounded-2xl bg-white p-6 sm:p-7 shadow-lg">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h3 className="text-xl font-bold text-purple-900">
                                    📄 Statement & Receipt Access
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Control which customer documents can be accessed and downloaded.
                                </p>
                            </div>

                            {!canManageDocumentAccess && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600">
                                    View Only
                                </span>
                            )}

                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Statement Access */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <p className="text-sm font-semibold text-gray-700">
                                    Statement Access
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                        customer?.statement_access
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {permissionStatus(
                                        customer?.statement_access
                                    )}
                                </span>

                            </div>

                            {/* Statement PDF */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <p className="text-sm font-semibold text-gray-700">
                                    Statement PDF Download
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                        customer?.statement_pdf_access
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {permissionStatus(
                                        customer?.statement_pdf_access
                                    )}
                                </span>

                            </div>

                            {/* Statement PNG */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <p className="text-sm font-semibold text-gray-700">
                                    Statement PNG Download
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                        customer?.statement_png_access
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {permissionStatus(
                                        customer?.statement_png_access
                                    )}
                                </span>

                            </div>

                            {/* Receipt PDF */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <p className="text-sm font-semibold text-gray-700">
                                    Receipt PDF Download
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                        customer?.receipt_pdf_access
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {permissionStatus(
                                        customer?.receipt_pdf_access
                                    )}
                                </span>

                            </div>

                            {/* Receipt PNG */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <p className="text-sm font-semibold text-gray-700">
                                    Receipt PNG Download
                                </p>

                                <span
                                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                        customer?.receipt_png_access
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {permissionStatus(
                                        customer?.receipt_png_access
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Account Management */}
                    <div className="mt-6 rounded-2xl bg-white p-6 sm:p-7 shadow-lg">

                        <h3 className="mb-5 text-xl font-bold text-purple-900">
                            Account Management
                        </h3>

                        <div className="flex flex-wrap gap-3 sm:gap-4">

                            {/* IMPORTANT: CUSTOMER EDIT ROUTE */}
                            <Link
                                href={`/admin/customers/${customer.id}/edit`}
                                className="inline-flex items-center justify-center rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800 transition"
                            >
                                ✏️ Edit Customer
                            </Link>

                            <button
                                type="button"
                                onClick={toggleStatus}
                                className={`rounded-xl px-6 py-3 font-semibold text-white transition ${
                                    customer?.status === 'active'
                                        ? 'bg-orange-500 hover:bg-orange-600'
                                        : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {customer?.status === 'active'
                                    ? '🚫 Disable Account'
                                    : '🟢 Enable Account'}
                            </button>

                            <button
                                type="button"
                                onClick={deleteCustomer}
                                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition"
                            >
                                🗑️ Delete Customer
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}