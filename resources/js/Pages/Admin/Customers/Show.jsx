import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({
    customer,
    canManageDocumentAccess = false,
    generatedTransferPin = null,
}) {
    const handleDelete = () => {
        if (
            confirm(
                'Are you sure you want to delete this customer account?'
            )
        ) {
            router.delete(`/admin/customers/${customer.id}`);
        }
    };

    const handleToggleStatus = () => {
        router.patch(
            `/admin/customers/${customer.id}/toggle-status`
        );
    };

    const handleGenerateTransferPin = () => {
        if (
            confirm(
                'Are you sure you want to generate a new Transfer PIN for this customer?'
            )
        ) {
            router.post(
                `/admin/customers/${customer.id}/generate-transfer-pin`
            );
        }
    };

    const formattedBalance = Number(
        customer.balance || 0
    ).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const [copied, setCopied] = useState(false);
    function copyPin() {
        if (!generatedTransferPin) return;

        navigator.clipboard.writeText(String(generatedTransferPin));
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <>
            <Head title={`Customer - ${customer.name}`} />

            <div className="min-h-screen bg-gray-100">

                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="min-w-0">

                                <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                                    Customer Account
                                </h1>

                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    View and manage customer information
                                </p>

                            </div>

                            <Link
                                href="/admin/customers"
                                className="inline-flex items-center justify-center w-full sm:w-auto bg-gray-600 text-white px-5 py-3 rounded-xl hover:bg-gray-700 transition font-medium"
                            >
                                ← Back to Customers
                            </Link>

                        </div>

                    </div>

                            {generatedTransferPin && (
                                <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-purple-900">
                                                Transfer PIN Generated
                                            </h3>
                                            <p className="mt-1 text-sm text-purple-700">
                                                The customer's new Transfer PIN is:
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-xl border border-purple-300 bg-white px-5 py-3 font-mono text-2xl font-bold tracking-[0.35em] text-purple-900 shadow-sm">
                                                {generatedTransferPin}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={copyPin}
                                                className="rounded-xl bg-purple-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                                            >
                                                {copied ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-3">
                                        <p className="text-xs font-medium text-yellow-800">
                                            Keep this PIN secure. It is used to authorize applicable transfer requests.
                                        </p>
                                    </div>
                                </div>
                            )}


                    
                    {/* Customer Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        {/* Customer Header */}
                        <div className="p-5 sm:p-8 border-b border-gray-200">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div className="min-w-0">

                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                                        {customer.name}
                                    </h2>

                                    <p className="text-sm sm:text-base text-gray-500 mt-1 break-all">
                                        {customer.email}
                                    </p>

                                </div>

                                <div className="shrink-0">

                                    <span
                                        className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                                            customer.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {customer.status}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Customer Information */}
                        <div className="p-5 sm:p-8">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                                {/* Customer Name */}
                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Customer Name
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-words">
                                        {customer.name}
                                    </p>

                                </div>


                                {/* Email */}
                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-all">
                                        {customer.email}
                                    </p>

                                </div>


                                {/* Phone */}
                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Phone
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-words">
                                        {customer.phone || 'Not provided'}
                                    </p>

                                </div>


                                {/* Account Number */}
                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Account Number
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-all">
                                        {customer.account_number || 'Not provided'}
                                    </p>

                                </div>


                                {/* Routing Number */}
                                <div className="bg-gray-50 rounded-xl p-4">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Routing Number
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1 break-all">
                                        {customer.routing_number || 'Not provided'}
                                    </p>

                                </div>


                                {/* Checking Balance */}
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Checking Balance
                                    </p>

                                    <p className="text-2xl sm:text-3xl font-bold text-purple-900 mt-1 break-words">
                                        ${formattedBalance}
                                    </p>

                                </div>


                                {/* Savings Balance */}
                                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">

                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Savings Balance
                                    </p>

                                    <p className="text-2xl sm:text-3xl font-bold text-purple-900 mt-1 break-words">
                                        $
                                        {Number(
                                            customer.savings_balance || 0
                                        ).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>

                                </div>

                            </div>


                            {/* Transfer PIN Management */}
                            <div className="mt-6 sm:mt-8 rounded-2xl border border-purple-200 bg-purple-50 p-5 sm:p-6">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                    <div>

                                        <h3 className="text-lg font-bold text-purple-900">
                                            Transfer PIN
                                        </h3>

                                        <p className="text-sm text-gray-600 mt-1">
                                            Generate a new 4-digit PIN for
                                            customer transfers.
                                        </p>

                                        {customer.has_transfer_pin && (
                                            <p className="text-sm font-semibold text-green-700 mt-2">
                                                ✓ Transfer PIN is currently set
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGenerateTransferPin}
                                        className="w-full sm:w-auto inline-flex items-center justify-center bg-purple-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition"
                                    >
                                        Generate Transfer PIN
                                    </button>

                                </div>

                            </div>


                            {/* Account Actions */}
                            <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">

                                <h3 className="text-lg font-bold text-gray-800 mb-4">
                                    Account Management
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

                                    <Link
                                        href={`/admin/customers/${customer.id}/edit`}
                                        className="w-full inline-flex items-center justify-center bg-purple-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-800 transition text-center"
                                    >
                                        Edit Customer
                                    </Link>


                                    <button
                                        type="button"
                                        onClick={handleToggleStatus}
                                        className="w-full inline-flex items-center justify-center bg-yellow-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
                                    >
                                        {customer.status === 'active'
                                            ? 'Disable Account'
                                            : 'Enable Account'}
                                    </button>


                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="w-full inline-flex items-center justify-center bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                                    >
                                        Delete Customer
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
