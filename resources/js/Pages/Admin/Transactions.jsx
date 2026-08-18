import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const formatCurrency = (value) => {
    const amount = Number(value ?? 0);

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
};

const formatDate = (value) => {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const statusClasses = (status) => {
    switch (String(status ?? '').toLowerCase()) {
        case 'completed':
        case 'complete':
        case 'success':
        case 'successful':
            return 'bg-emerald-50 text-emerald-700 border-emerald-200';

        case 'pending':
            return 'bg-amber-50 text-amber-700 border-amber-200';

        case 'failed':
        case 'cancelled':
        case 'canceled':
            return 'bg-red-50 text-red-700 border-red-200';

        default:
            return 'bg-gray-50 text-gray-700 border-gray-200';
    }
};

const getInitial = (name) => {
    if (!name) return '—';

    return String(name).charAt(0).toUpperCase();
};

const getAccountDisplay = (accountNumber) => {
    if (!accountNumber) {
        return 'No account number';
    }

    const account = String(accountNumber);

    return `•••• ${account.slice(-4)}`;
};

export default function Transactions({ transfers = [], user }) {
    return (
        <AdminLayout user={user}>
            <Head title="Transactions" />

            <div className="w-full max-w-7xl mx-auto space-y-5 sm:space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">
                        <div className="flex items-center gap-3">

                            <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 7h13l-3-3" />
                                    <path d="m20 7-3 3" />
                                    <path d="M17 17H4l3 3" />
                                    <path d="m4 17 3-3" />
                                </svg>
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                                    Transactions
                                </h1>

                                <p className="mt-1 text-sm sm:text-base text-gray-500">
                                    View and manage customer transactions.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Total */}
                    <div className="w-full sm:w-auto rounded-xl border border-purple-100 bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Total Transactions
                        </p>

                        <p className="mt-1 text-xl font-bold text-purple-900">
                            {transfers.length}
                        </p>
                    </div>

                </div>


                {/* Main Card */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Card Header */}
                    <div className="border-b border-gray-100 px-4 py-5 sm:px-6">

                        <h2 className="text-lg sm:text-xl font-bold text-purple-950">
                            Transaction History
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review transfers between Comericafin customer accounts.
                        </p>

                    </div>


                    {/* ========================= */}
                    {/* DESKTOP TABLE */}
                    {/* ========================= */}

                    <div className="hidden lg:block overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-gray-100 bg-purple-950">

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Reference
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Sender
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Recipient
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-white">
                                        Amount
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Date
                                    </th>

                                </tr>
                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {transfers.length > 0 ? (

                                    transfers.map((transfer) => (

                                        <tr
                                            key={transfer.id}
                                            className="hover:bg-purple-50/40 transition"
                                        >

                                            {/* Reference */}
                                            <td className="px-5 py-5">

                                                <p className="font-semibold text-gray-900 break-all">
                                                    {transfer.reference || '—'}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Transaction #{transfer.id}
                                                </p>

                                            </td>


                                            {/* Sender */}
                                            <td className="px-5 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-800">
                                                        {getInitial(
                                                            transfer.sender?.name
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="font-medium text-gray-900 truncate">
                                                            {transfer.sender?.name || 'N/A'}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            {getAccountDisplay(
                                                                transfer.sender?.account_number
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Recipient */}
                                            <td className="px-5 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                                                        {getInitial(
                                                            transfer.recipient?.name
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="font-medium text-gray-900 truncate">
                                                            {transfer.recipient?.name || 'External Recipient'}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            {getAccountDisplay(
                                                                transfer.recipient?.account_number
                                                            )}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Amount */}
                                            <td className="px-5 py-5 text-right">

                                                <span className="font-bold text-gray-900">
                                                    {formatCurrency(
                                                        transfer.amount
                                                    )}
                                                </span>

                                            </td>


                                            {/* Status */}
                                            <td className="px-5 py-5">

                                                <span
                                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClasses(
                                                        transfer.status
                                                    )}`}
                                                >
                                                    {transfer.status || 'Unknown'}
                                                </span>

                                            </td>


                                            {/* Date */}
                                            <td className="px-5 py-5">

                                                <p className="text-sm font-medium text-gray-700">
                                                    {formatDate(
                                                        transfer.created_at
                                                    )}
                                                </p>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-16 text-center"
                                        >

                                            <div className="mx-auto max-w-sm">

                                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-800">

                                                    <svg
                                                        width="25"
                                                        height="25"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                    >
                                                        <rect
                                                            x="4"
                                                            y="3"
                                                            width="16"
                                                            height="18"
                                                            rx="2"
                                                        />
                                                        <path d="M8 8h8" />
                                                        <path d="M8 12h8" />
                                                        <path d="M8 16h5" />
                                                    </svg>

                                                </div>

                                                <h3 className="mt-4 font-bold text-gray-900">
                                                    No transactions found
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Transaction activity will appear
                                                    here when transfers are recorded.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* ========================= */}
                    {/* MOBILE / TABLET CARDS */}
                    {/* ========================= */}

                    <div className="lg:hidden">

                        {transfers.length > 0 ? (

                            <div className="divide-y divide-gray-100">

                                {transfers.map((transfer) => (

                                    <div
                                        key={transfer.id}
                                        className="p-4 sm:p-5"
                                    >

                                        {/* Top */}
                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <p className="font-semibold text-gray-900 break-all">
                                                    {transfer.reference || '—'}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    Transaction #{transfer.id}
                                                </p>

                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses(
                                                    transfer.status
                                                )}`}
                                            >
                                                {transfer.status || 'Unknown'}
                                            </span>

                                        </div>


                                        {/* Amount */}
                                        <div className="mt-4 rounded-xl bg-gray-50 p-4">

                                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                                Amount
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-purple-900">
                                                {formatCurrency(
                                                    transfer.amount
                                                )}
                                            </p>

                                        </div>


                                        {/* Sender */}
                                        <div className="mt-4">

                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Sender
                                            </p>

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-800">
                                                    {getInitial(
                                                        transfer.sender?.name
                                                    )}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="font-medium text-gray-900 truncate">
                                                        {transfer.sender?.name || 'N/A'}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {getAccountDisplay(
                                                            transfer.sender?.account_number
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Recipient */}
                                        <div className="mt-4">

                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Recipient
                                            </p>

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                                                    {getInitial(
                                                        transfer.recipient?.name
                                                    )}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="font-medium text-gray-900 truncate">
                                                        {transfer.recipient?.name ||
                                                            'External Recipient'}
                                                    </p>

                                                    <p className="text-xs text-gray-400">
                                                        {getAccountDisplay(
                                                            transfer.recipient?.account_number
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Date */}
                                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                                            <div>

                                                <p className="text-xs text-gray-400">
                                                    Date
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-700">
                                                    {formatDate(
                                                        transfer.created_at
                                                    )}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-xs text-gray-400">
                                                    Source
                                                </p>

                                                <p className="mt-1 text-sm font-medium capitalize text-gray-700">
                                                    {transfer.source_account ||
                                                        '—'}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="px-6 py-16 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-800">

                                    <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <rect
                                            x="4"
                                            y="3"
                                            width="16"
                                            height="18"
                                            rx="2"
                                        />
                                        <path d="M8 8h8" />
                                        <path d="M8 12h8" />
                                        <path d="M8 16h5" />
                                    </svg>

                                </div>

                                <h3 className="mt-4 font-bold text-gray-900">
                                    No transactions found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Transaction activity will appear here when
                                    transfers are recorded.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Footer */}
                    {transfers.length > 0 && (

                        <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 sm:px-6">

                            <p className="text-xs text-gray-500">
                                Showing{' '}
                                <span className="font-semibold text-gray-700">
                                    {transfers.length}
                                </span>{' '}
                                transaction
                                {transfers.length === 1 ? '' : 's'}.
                            </p>

                        </div>

                    )}

                </section>

            </div>
        </AdminLayout>
    );
}