import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const services = [
    {
        title: 'Account Management',
        description:
            'Keep your account information organized and accessible. Review account details, maintain your information, and stay informed about your account activity.',
        icon: '01',
    },
    {
        title: 'Money Transfers',
        description:
            'Move funds between supported accounts with a simple and convenient transfer experience designed around everyday banking needs.',
        icon: '02',
    },
    {
        title: 'Transaction History',
        description:
            'Review your account activity, monitor transfers, and keep track of your recent financial transactions in one convenient place.',
        icon: '03',
    },
    {
        title: 'Card Services',
        description:
            'Explore card services, submit card requests, and manage card-related account services through your customer account.',
        icon: '04',
    },
];

export default function CreateAccount({ selectedService = '' }) {
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        full_name: '',
        phone: '',
        email: '',
        service: selectedService || '',
        message: '',
    });

    const openForm = (service = '') => {
        if (service) {
            setData('service', service);
        }

        setFormVisible(true);

        setTimeout(() => {
            document
                .getElementById('account-request-form')
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
        }, 100);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.account-request.store'), {
            preserveScroll: true,

            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    if (submitted) {
        return (
            <>
                <Head title="Request Submitted" />

                <div className="min-h-screen bg-[#f5f6f8] text-slate-900">

                    {/* Header */}
                    <header className="border-b border-slate-200 bg-white">
                        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                            <Link href="/">
                                <img
                                    src="/Images/comericafin-logo.png"
                                    alt="Comericafin"
                                    className="h-14 w-auto object-contain"
                                />
                            </Link>

                            <Link
                                href="/"
                                className="text-sm font-semibold text-purple-800 hover:text-purple-950"
                            >
                                Back to Home
                            </Link>

                        </div>
                    </header>

                    <main className="px-6 py-20 lg:px-8">

                        <div className="mx-auto max-w-2xl">

                            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
                                    <svg
                                        width="38"
                                        height="38"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                </div>

                                <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                    Thank You
                                </p>

                                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                                    Your request has been submitted.
                                </h1>

                                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
                                    Thank you for contacting Comericafin.
                                    An account manager will review your request
                                    and contact you using the details you
                                    provided.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                                    <Link
                                        href="/"
                                        className="rounded-lg bg-purple-800 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-purple-900"
                                    >
                                        Return Home
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormVisible(true);
                                        }}
                                        className="rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Submit Another Request
                                    </button>

                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Create Your Account" />

            <div className="min-h-screen bg-[#f5f6f8] text-slate-900">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">

                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                        <Link href="/">
                            <img
                                src="/Images/comericafin-logo.png"
                                alt="Comericafin"
                                className="h-14 w-auto object-contain"
                            />
                        </Link>

                        <div className="flex items-center gap-6">

                            <a
                                href="#services"
                                className="hidden text-sm font-semibold text-slate-600 transition hover:text-purple-800 sm:block"
                            >
                                Services
                            </a>

                            <a
                                href="#contact"
                                className="hidden text-sm font-semibold text-slate-600 transition hover:text-purple-800 sm:block"
                            >
                                Contact
                            </a>

                            <Link
                                href="/"
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-purple-300 hover:text-purple-800"
                            >
                                Back Home
                            </Link>

                        </div>
                    </div>
                </header>


                {/* =====================================================
                    HERO
                ===================================================== */}
                <section className="relative overflow-hidden bg-white">

                    <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-purple-100 blur-3xl" />
                    <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-100 blur-3xl" />

                    <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                Banking Services
                            </p>

                            <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                                Banking services
                                <span className="block text-purple-800">
                                    built around you.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                                Whether you are managing your account, moving
                                funds, reviewing activity, or exploring card
                                services, Comericafin brings essential account
                                services together in one convenient experience.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-4">

                                <button
                                    type="button"
                                    onClick={() => openForm(selectedService)}
                                    className="rounded-lg bg-purple-800 px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-purple-900"
                                >
                                    Create Your Account
                                </button>

                                <a
                                    href="#services"
                                    className="rounded-lg border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-purple-300 hover:text-purple-800"
                                >
                                    Explore Services
                                </a>

                            </div>

                            <div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-600">

                                <div className="flex items-center gap-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Account management
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Convenient transfers
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Account support
                                </div>

                            </div>

                        </div>


                        {/* HERO IMAGE */}
                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[3rem] bg-purple-100/70 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl ring-1 ring-slate-200">

                                <img
                                    src="/Images/banking-hero.jpg"
                                    alt="Banking services"
                                    className="h-[470px] w-full rounded-[1.5rem] object-cover"
                                />

                                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur">

                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-purple-700">
                                        Comericafin Services
                                    </p>

                                    <p className="mt-2 text-xl font-bold text-slate-900">
                                        Everything you need, in one place.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* =====================================================
                    ARTICLE
                ===================================================== */}
                <section className="border-y border-slate-200 bg-[#f7f8fa] px-6 py-20 lg:px-8">

                    <div className="mx-auto max-w-4xl">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                            Our Approach
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                            A simpler way to manage your financial activity.
                        </h2>

                        <div className="mt-7 space-y-6 text-base leading-8 text-slate-600">

                            <p>
                                Managing financial activity should feel
                                straightforward. Comericafin brings common
                                account services together so customers can
                                access important information, review activity,
                                and manage everyday account needs from one
                                organized experience.
                            </p>

                            <p>
                                Account management provides a central place for
                                customer information and account details.
                                Transfer services make it easier to move funds
                                between supported accounts, while transaction
                                history provides visibility into recent
                                activity.
                            </p>

                            <p>
                                Card services provide another convenient way to
                                manage account-related requests and keep
                                important services together. Whether you are
                                looking for everyday account support or a
                                specific service, the goal is to make the next
                                step clear and simple.
                            </p>

                        </div>

                    </div>
                </section>


                {/* =====================================================
                    SERVICES
                ===================================================== */}
                <section id="services" className="px-6 py-24 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="max-w-3xl">

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                Our Services
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Everything you need,
                                <span className="block text-purple-800">
                                    in one place.
                                </span>
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Explore the services available to help you
                                manage your account and everyday financial
                                activity.
                            </p>

                        </div>

                        <div className="mt-14 grid gap-6 md:grid-cols-2">

                            {services.map((service) => (
                                <div
                                    key={service.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl sm:p-8"
                                >

                                    <div className="flex items-start justify-between gap-5">

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-sm font-bold text-purple-800">
                                            {service.icon}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openForm(service.title)
                                            }
                                            className="text-sm font-bold text-purple-800 transition hover:text-purple-950"
                                        >
                                            Get Started →
                                        </button>

                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-slate-900">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                                        {service.description}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>
                </section>


                {/* =====================================================
                    CONTACT ACCOUNT MANAGER CTA
                ===================================================== */}
                <section id="contact" className="px-6 pb-24 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#35106e] via-[#51169a] to-[#6b27b5] px-7 py-12 shadow-2xl sm:px-12 sm:py-16">

                            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[35px] border-white/5" />
                            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[35px] border-white/5" />

                            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">

                                <div className="max-w-3xl">

                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
                                        Get Started
                                    </p>

                                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                                        Ready to create your account?
                                    </h2>

                                    <p className="mt-5 text-base leading-7 text-purple-100">
                                        Complete a short request form with your
                                        full name, phone number, and email
                                        address. An account manager can then
                                        review your request and contact you
                                        about the service you are interested
                                        in.
                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white p-6 shadow-xl sm:min-w-[320px]">

                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-purple-700">
                                        Contact an Account Manager
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                                        Start your account request
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Tell us how we can help and we will
                                        follow up with you.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openForm(selectedService)
                                        }
                                        className="mt-5 w-full rounded-lg bg-purple-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-purple-900"
                                    >
                                        Create Account / Contact Manager
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                {/* =====================================================
                    REQUEST FORM
                ===================================================== */}
                {formVisible && (
                    <section
                        id="account-request-form"
                        className="border-t border-slate-200 bg-white px-6 py-24 lg:px-8"
                    >

                        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                            {/* FORM INTRO */}
                            <div>

                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                    Account Request
                                </p>

                                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                                    Tell us how we can help.
                                </h2>

                                <p className="mt-5 text-base leading-7 text-slate-600">
                                    Complete the form and provide your preferred
                                    contact information. An account manager can
                                    use these details to follow up with you.
                                </p>

                                <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f8f7fa] p-5">

                                    <p className="text-sm font-bold text-slate-900">
                                        What happens next?
                                    </p>

                                    <div className="mt-4 space-y-4">

                                        <div className="flex gap-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-800">
                                                1
                                            </span>

                                            <p className="text-sm leading-6 text-slate-600">
                                                Submit your information and
                                                choose the service you are
                                                interested in.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-800">
                                                2
                                            </span>

                                            <p className="text-sm leading-6 text-slate-600">
                                                Your request is reviewed by an
                                                account manager.
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-800">
                                                3
                                            </span>

                                            <p className="text-sm leading-6 text-slate-600">
                                                An account manager contacts you
                                                using your preferred details.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>


                            {/* FORM */}
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

                                <form onSubmit={submit}>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* Full Name */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                value={data.full_name}
                                                onChange={(e) =>
                                                    setData(
                                                        'full_name',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your full name"
                                                className="w-full rounded-lg border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            />

                                            {errors.full_name && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.full_name}
                                                </p>
                                            )}

                                        </div>

                                        {/* Phone */}
                                        <div>

                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'phone',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your phone number"
                                                className="w-full rounded-lg border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            />

                                            {errors.phone && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.phone}
                                                </p>
                                            )}

                                        </div>

                                        {/* Email */}
                                        <div>

                                            <label className="mb-2 block text-sm font-bold text-slate-700">
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
                                                placeholder="Enter your email address"
                                                className="w-full rounded-lg border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            />

                                            {errors.email && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}

                                        </div>

                                        {/* Service */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Service
                                            </label>

                                            <select
                                                value={data.service}
                                                onChange={(e) =>
                                                    setData(
                                                        'service',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            >
                                                <option value="">
                                                    Select a service
                                                </option>

                                                {services.map((service) => (
                                                    <option
                                                        key={service.title}
                                                        value={service.title}
                                                    >
                                                        {service.title}
                                                    </option>
                                                ))}
                                            </select>

                                            {errors.service && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.service}
                                                </p>
                                            )}

                                        </div>

                                        {/* Message */}
                                        <div className="md:col-span-2">

                                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                                Message
                                                <span className="ml-1 font-normal text-slate-400">
                                                    (optional)
                                                </span>
                                            </label>

                                            <textarea
                                                rows="5"
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        'message',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Tell us what you would like help with..."
                                                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            />

                                            {errors.message && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.message}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                    <div className="mt-6 rounded-xl border border-purple-100 bg-purple-50 p-4">
                                        <p className="text-xs leading-5 text-purple-900">
                                            Please make sure your contact
                                            information is correct so an
                                            account manager can reach you.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 w-full rounded-lg bg-purple-800 px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Submitting Request...'
                                            : 'Submit Request'}
                                    </button>

                                </form>

                            </div>

                        </div>
                    </section>
                )}


                {/* =====================================================
                    FOOTER
                ===================================================== */}
                <footer className="bg-[#160625] px-6 py-12 text-white lg:px-8">

                    <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <Link href="/">
                            <img
                                src="/Images/comericafin-logo.png"
                                alt="Comericafin"
                                className="h-14 w-auto object-contain brightness-0 invert"
                            />
                        </Link>

                        <div className="text-sm text-purple-200">
                            © {new Date().getFullYear()} Comericafin. All Rights Reserved.
                        </div>

                    </div>

                </footer>

            </div>
        </>
    );
}
