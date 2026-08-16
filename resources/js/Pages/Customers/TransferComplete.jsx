import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { useEffect, useState } from 'react';

export default function TransferComplete({ transfer }) {
    const [processingTransfer, setProcessingTransfer] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProcessingTransfer(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <CustomerLayout>
            <Head
                title={
                    processingTransfer
                        ? 'Processing Transfer'
                        : 'Transfer Completed'
                }
            />

            <div className="min-h-screen bg-[#faf9fc] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-xl">

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                        {processingTransfer ? (
                            /* -------------------------------------------------
                             * PROCESSING SCREEN
                             * ------------------------------------------------- */
                            <div className="px-6 py-14 text-center sm:px-8">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-900"></div>
                                </div>

                                <h1 className="mt-7 text-2xl font-bold text-[#35106e]">
                                    Processing Transfer
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    Please wait while your transfer is being
                                    processed.
                                </p>

                                <div className="mx-auto mt-7 h-2 w-full max-w-sm overflow-hidden rounded-full bg-gray-200">
                                    <div className="h-full w-full origin-left animate-[transferProgress_5s_linear] rounded-full bg-purple-900"></div>
                                </div>

                                <p className="mt-4 text-xs text-gray-400">
                                    Please do not close this page.
                                </p>

                            </div>
                        ) : (
                            /* -------------------------------------------------
                             * COMPLETED SCREEN
                             * ------------------------------------------------- */
                            <>
                                <div className="bg-purple-900 px-6 py-8 text-center text-white">

                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl font-bold text-green-600">
                                        ✓
                                    </div>

                                    <h1 className="mt-5 text-2xl font-bold">
                                        Transfer Completed
                                    </h1>

                                    <p className="mt-2 text-sm text-purple-200">
                                        Your transfer has been successfully
                                        completed.
                                    </p>

                                </div>

                                <div className="space-y-5 p-6 sm:p-8">

                                    <div className="rounded-xl bg-gray-50 p-5">

                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-sm text-gray-500">
                                                Recipient
                                            </span>

                                            <span className="max-w-[60%] text-right text-sm font-semibold text-gray-900">
                                                {transfer.recipient_name}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-200 py-3">
                                            <span className="text-sm text-gray-500">
                                                Bank
                                            </span>

                                            <span className="text-sm font-semibold text-gray-900">
                                                {transfer.bank_name}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-200 py-3">
                                            <span className="text-sm text-gray-500">
                                                Amount
                                            </span>

                                            <span className="text-lg font-bold text-purple-900">
                                                $
                                                {Number(
                                                    transfer.amount
                                                ).toLocaleString(
                                                    'en-US',
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b border-gray-200 py-3">
                                            <span className="text-sm text-gray-500">
                                                Status
                                            </span>

                                            <span className="font-semibold text-green-600">
                                                Completed
                                            </span>
                                        </div>

                                        <div className="flex justify-between pt-3">
                                            <span className="text-sm text-gray-500">
                                                Reference
                                            </span>

                                            <span className="max-w-[60%] break-all text-right text-xs font-mono text-gray-700">
                                                {transfer.reference}
                                            </span>
                                        </div>

                                    </div>

                                    {transfer.description && (
                                        <div className="rounded-xl border border-gray-200 bg-white p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Description
                                            </p>

                                            <p className="mt-1 text-sm text-gray-700">
                                                {transfer.description}
                                            </p>
                                        </div>
                                    )}

                                    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                                        <p className="text-sm font-semibold text-purple-900">
                                            Transfer Successful
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-purple-700">
                                            The funds have been transferred to
                                            the recipient's Comericafin account.
                                        </p>
                                    </div>

                                    <Link
                                        href={route('customer.dashboard')}
                                        className="block w-full rounded-xl bg-purple-900 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-purple-800"
                                    >
                                        Cancel / Return to Dashboard
                                    </Link>

                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>

            <style>{`
                @keyframes transferProgress {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }
            `}</style>
        </CustomerLayout>
    );
}
