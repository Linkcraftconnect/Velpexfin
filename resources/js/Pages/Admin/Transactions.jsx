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
    if (!value) {
        return '—';
    }

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
            return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200';

        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200';

        case 'failed':
        case 'cancelled':
        case 'canceled':
            return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200';

        default:
            return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200';
    }
};

export default function Transactions({ transfers }) {
    return (
        <AdminLayout>
            <Head title="Transactions" />

            <div className="space-y-6">

                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
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

                            <div>
                                <h1 className="text-3xl font-bold text-purple-900">
                                        Transactions
                                    </h1>

                                    <p className="text-gray-500 mt-2">
                                        View and manage customer transactions.
                                    </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-purple-100 bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Total Transactions
                        </p>

                        <p className="mt-1 text-xl font-bold text-purple-900">
                            {transfers.length}
                        </p>
                    </div>
                </div>

                {/* Transactions Card */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_5px_24px_rgba(39,19,70,0.06)]">

                    {/* Card Header */}
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:px-6">
                        <h2 className="text-lg font-bold text-purple-950">
                            Transaction History
                        </h2>

                        <p className="text-sm text-gray-500">
                            Review transfers between Comericafin customer accounts.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="border-b border-gray-100 bg-purple-950">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Reference
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Sender
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Recipient
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-white">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {transfers.length > 0 ? (
                                    transfers.map((transfer) => (
                                        <tr
                                            key={transfer.id}
                                            className="transition hover:bg-purple-50/40"
                                        >
                                            {/* Reference */}
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {transfer.reference || '—'}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Transaction #{transfer.id}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Sender */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-800">
                                                        {transfer.sender?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || '—'}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {transfer.sender?.name || 'N/A'}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            {transfer.sender?.account_number
                                                                ? `•••• ${String(
                                                                      transfer.sender.account_number
                                                                  ).slice(-4)}`
                                                                : 'No account number'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Recipient */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                                                        {transfer.recipient?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || '—'}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {transfer.recipient?.name || 'N/A'}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            {transfer.recipient?.account_number
                                                                ? `•••• ${String(
                                                                      transfer.recipient.account_number
                                                                  ).slice(-4)}`
                                                                : 'No account number'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-5 text-right">
                                                <span className="font-bold text-gray-900">
                                                    {formatCurrency(transfer.amount)}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses(
                                                        transfer.status
                                                    )}`}
                                                >
                                                    {transfer.status || 'Unknown'}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-medium text-gray-700">
                                                    {formatDate(transfer.created_at)}
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
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                                    <svg
                                                        width="25"
                                                        height="25"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
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

                                                <h3 className="mt-4 text-base font-bold text-gray-900">
                                                    No transactions found
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-gray-500">
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

                    {/* Footer */}
                    {transfers.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">
                            <p className="text-xs text-gray-500">
                                Showing{' '}
                                <span className="font-semibold text-gray-700">
                                    {transfers.length}
                                </span>{' '}
                                transaction{transfers.length === 1 ? '' : 's'}.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </AdminLayout>
    );
}