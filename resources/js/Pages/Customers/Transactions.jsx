import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

const formatCurrency = (amount) => {
    const number = Number(amount ?? 0);

    if (Number.isNaN(number)) {
        return '$0.00';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

const formatDate = (date) => {
    if (!date) return '—';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return '—';
    }

    return parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
    };

    switch (name) {
        case 'transactions':
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 8h10" />
                    <path d="M7 12h6" />
                    <path d="M7 16h4" />
                </svg>
            );

        case 'arrow-up':
            return (
                <svg {...common}>
                    <path d="M12 19V5" />
                    <path d="m6 11 6-6 6 6" />
                </svg>
            );

        case 'arrow-down':
            return (
                <svg {...common}>
                    <path d="M12 5v14" />
                    <path d="m18 13-6 6-6-6" />
                </svg>
            );

        case 'calendar':
            return (
                <svg {...common}>
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                </svg>
            );

        case 'check':
            return (
                <svg {...common}>
                    <path d="m5 12 4 4L19 6" />
                </svg>
            );

        case 'clock':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );

        case 'shield':
            return (
                <svg {...common}>
                    <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        default:
            return null;
    }
};

export default function Transactions({
    transactions = [],
    customerId,
}) {
    const sentCount = transactions.filter(
        (transaction) =>
            Number(transaction.sender_id) === Number(customerId)
    ).length;

    const receivedCount = transactions.length - sentCount;

    return (
        <>
            <Head title="Transactions" />

            <div className="min-h-full bg-[#faf9fc] text-[#17152b]">
                <div className="mx-auto w-full max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">

                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}
                    <div className="mb-7">
                        <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0e7f8] text-[#51169a] shadow-sm">
                                <Icon name="transactions" size={23} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-[#35106e] sm:text-3xl">
                                    Transactions
                                </h1>

                                <p className="mt-1 text-sm text-[#625d73]">
                                    View your Comericafin account transaction history.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        SUMMARY CARDS
                    ====================================================== */}

                    <div className="mb-5">
                        <Link
                            href={route('customer.dashboard')}
                            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#51169a] transition hover:text-[#35106e]"
                        >
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>

                            Back to Dashboard
                        </Link>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                        {/* Total */}
                        <div className="rounded-2xl border border-[#e5e1ea] bg-white p-5 shadow-[0_4px_18px_rgba(39,19,70,0.06)]">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#81798e]">
                                        Total Transactions
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#35106e]">
                                        {transactions.length}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0e7f8] text-[#51169a]">
                                    <Icon name="transactions" size={21} />
                                </div>

                            </div>
                        </div>

                        {/* Sent */}
                        <div className="rounded-2xl border border-[#e5e1ea] bg-white p-5 shadow-[0_4px_18px_rgba(39,19,70,0.06)]">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#81798e]">
                                        Sent
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#b42318]">
                                        {sentCount}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0ef] text-[#b42318]">
                                    <Icon name="arrow-up" size={21} />
                                </div>

                            </div>
                        </div>

                        {/* Received */}
                        <div className="rounded-2xl border border-[#e5e1ea] bg-white p-5 shadow-[0_4px_18px_rgba(39,19,70,0.06)]">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#81798e]">
                                        Received
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#16834b]">
                                        {receivedCount}
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf9f0] text-[#16834b]">
                                    <Icon name="arrow-down" size={21} />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* =====================================================
                        TRANSACTION TABLE
                    ====================================================== */}
                    <section className="overflow-hidden rounded-2xl border border-[#e5e1ea] bg-white shadow-[0_5px_24px_rgba(39,19,70,0.07)]">

                        {/* Card header */}
                        <div className="flex flex-col gap-3 border-b border-[#eeeaf1] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                            <div>
                                <h2 className="text-lg font-bold text-[#35106e]">
                                    Transaction History
                                </h2>

                                <p className="mt-1 text-xs text-[#756e80]">
                                    Your recent account activity
                                </p>
                            </div>

                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f8f2fc] px-3 py-1.5 text-xs font-semibold text-[#51169a]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#22a45a]" />
                                Account Activity
                            </div>

                        </div>

                        {transactions.length > 0 ? (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[900px]">

                                    <thead className="bg-[#faf8fc]">
                                        <tr>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Description
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Reference
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Type
                                            </th>

                                            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#756e80]">
                                                Status
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#eeeaf1]">

                                        {transactions.map((transaction) => {

                                            const isOutgoing =
                                                Number(transaction.sender_id) ===
                                                Number(customerId);

                                            const status =
                                                transaction.status || 'pending';

                                            const isCompleted =
                                                status.toLowerCase() ===
                                                'completed';

                                            return (
                                                <tr
                                                    key={transaction.id}
                                                    className="transition hover:bg-[#fcfaff]"
                                                >

                                                    {/* Date */}
                                                    <td className="whitespace-nowrap px-6 py-5">

                                                        <div className="flex items-center gap-3">

                                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f3fa] text-[#6b6380]">
                                                                <Icon
                                                                    name="calendar"
                                                                    size={16}
                                                                />
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-semibold text-[#3b3548]">
                                                                    {formatDate(
                                                                        transaction.created_at
                                                                    )}
                                                                </p>

                                                                <p className="mt-0.5 text-[11px] text-[#898294]">
                                                                    Transaction date
                                                                </p>
                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Description */}
                                                    <td className="px-6 py-5">

                                                        <p className="text-sm font-semibold text-[#211c32]">
                                                            {transaction.description ||
                                                                (isOutgoing
                                                                    ? 'Transfer sent'
                                                                    : 'Transfer received')}
                                                        </p>

                                                        <p className="mt-1 text-xs text-[#756e80]">
                                                            {isOutgoing
                                                                ? `To ${
                                                                      transaction
                                                                          .recipient
                                                                          ?.name ||
                                                                      'Customer'
                                                                  }`
                                                                : `From ${
                                                                      transaction
                                                                          .sender
                                                                          ?.name ||
                                                                      'Customer'
                                                                  }`}
                                                        </p>

                                                    </td>

                                                    {/* Reference */}
                                                    <td className="px-6 py-5">

                                                        <span className="rounded-lg bg-[#f8f5fa] px-2.5 py-1.5 font-mono text-xs font-medium text-[#5e576c]">
                                                            {transaction.reference ||
                                                                'N/A'}
                                                        </span>

                                                    </td>

                                                    {/* Type */}
                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                                isOutgoing
                                                                    ? 'bg-[#fff0ef] text-[#b42318]'
                                                                    : 'bg-[#eaf9f0] text-[#16834b]'
                                                            }`}
                                                        >

                                                            <Icon
                                                                name={
                                                                    isOutgoing
                                                                        ? 'arrow-up'
                                                                        : 'arrow-down'
                                                                }
                                                                size={13}
                                                            />

                                                            {isOutgoing
                                                                ? 'Sent'
                                                                : 'Received'}

                                                        </span>

                                                    </td>

                                                    {/* Amount */}
                                                    <td
                                                        className={`whitespace-nowrap px-6 py-5 text-right text-sm font-bold ${
                                                            isOutgoing
                                                                ? 'text-[#b42318]'
                                                                : 'text-[#16834b]'
                                                        }`}
                                                    >
                                                        {isOutgoing ? '-' : '+'}
                                                        {formatCurrency(
                                                            transaction.amount
                                                        )}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                                isCompleted
                                                                    ? 'bg-[#eaf9f0] text-[#16834b]'
                                                                    : 'bg-[#fff8e8] text-[#9a6900]'
                                                            }`}
                                                        >

                                                            {isCompleted ? (
                                                                <Icon
                                                                    name="check"
                                                                    size={13}
                                                                />
                                                            ) : (
                                                                <Icon
                                                                    name="clock"
                                                                    size={13}
                                                                />
                                                            )}

                                                            <span className="capitalize">
                                                                {status}
                                                            </span>

                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        })}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            /* =================================================
                               EMPTY STATE
                            ================================================== */
                            <div className="px-6 py-20 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0e7f8] text-[#51169a]">
                                    <Icon
                                        name="transactions"
                                        size={27}
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-[#35106e]">
                                    No transactions yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#716a7c]">
                                    Your transaction history will appear here
                                    when activity is recorded on your account.
                                </p>

                            </div>

                        )}

                    </section>

                    {/* =====================================================
                        SECURITY NOTICE
                    ====================================================== */}
                    <div className="mt-6 rounded-2xl border border-[#e4d8ef] bg-[#f8f2fc] p-4 sm:p-5">

                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5a1b99] text-white">
                                <Icon name="shield" size={17} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#35106e]">
                                    Transaction history
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#655d72]">
                                    Transactions shown here are part of your
                                    Comericafin customer account.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}