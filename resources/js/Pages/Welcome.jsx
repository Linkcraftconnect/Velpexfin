import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [loginOpen, setLoginOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submitLogin = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                setLoginOpen(false);
            },
        });
    };

    return (
        <>
            <Head title="Comericafin" />

            <div className="min-h-screen bg-[#eef0f3] text-slate-900">

                {/* =========================================================
                    HEADER
                ========================================================= */}
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                        <div className="flex items-center">
                            <img
                                src="/images/comericafin-logo.png"
                                alt="Comericafin"
                                className="h-16 w-auto object-contain"
                            />
                        </div>

                        <div className="hidden items-center gap-8 lg:flex">

                            <a href="#personal" className="text-sm font-semibold text-slate-700 transition hover:text-purple-800">
                                Personal Banking
                            </a>

                            <a href="#business" className="text-sm font-semibold text-slate-700 transition hover:text-purple-800">
                                Business Banking
                            </a>

                            <a href="#services" className="text-sm font-semibold text-slate-700 transition hover:text-purple-800">
                                Services
                            </a>

                            <a href="#about" className="text-sm font-semibold text-slate-700 transition hover:text-purple-800">
                                About Us
                            </a>

                            <a href="#contact" className="text-sm font-semibold text-slate-700 transition hover:text-purple-800">
                                Contact
                            </a>

                            <button
                                type="button"
                                onClick={() => setLoginOpen(true)}
                                className="rounded-lg bg-purple-700 px-6 py-3 text-white shadow-md transition hover:bg-purple-800"
                            >
                                Customer Login
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setLoginOpen(true)}
                            className="rounded-lg bg-purple-700 px-6 py-3 text-white shadow-md transition hover:bg-purple-800 lg:hidden"
                        >
                            Login
                        </button>
                    </nav>
                </header>


                {/* =========================================================
                    HERO
                ========================================================= */}
                <section className="relative overflow-hidden bg-[#e5e7eb]">

                    <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-100 blur-3xl" />
                    <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-100 blur-3xl" />

                    <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">

                        {/* HERO TEXT */}
                        <div className="relative z-10">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-800 shadow-sm">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Banking built around you
                            </div>

                            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                                Your financial
                                <span className="block text-purple-800">
                                    future starts here.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                                Manage your accounts, monitor activity, transfer
                                virtual funds, and stay connected to your finances
                                through a modern Comericafin banking experience.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-4">

                                <button
                                    type="button"
                                    onClick={() => setLoginOpen(true)}
                                    className="rounded-lg bg-purple-700 px-6 py-3 text-white shadow-md transition hover:bg-purple-800"
                                >
                                    Customer Login
                                </button>

                                <a
                                    href="#services"
                                    className="rounded-md border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:border-purple-300 hover:text-purple-800"
                                >
                                    Explore Banking
                                </a>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">

                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Secure access
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Easy account management
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                        ✓
                                    </span>
                                    Convenient transfers
                                </div>
                            </div>
                        </div>


                        {/* HERO IMAGE AREA */}
                        <div className="relative">

                            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-yellow-400/30 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-200">

                                <img
                                    src="/images/banking-hero.jpg"
                                    alt="Comericafin banking"
                                    className="h-[430px] w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/10 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                                    <p className="text-sm font-medium text-purple-200">
                                        Comericafin Digital Banking
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        Banking designed around you.
                                    </h2>

                                    <div className="mt-5 flex flex-wrap gap-3">

                                        <div className="rounded-xl bg-white/15 px-4 py-2 text-sm backdrop-blur">
                                            Account Management
                                        </div>

                                        <div className="rounded-xl bg-white/15 px-4 py-2 text-sm backdrop-blur">
                                            Transfers
                                        </div>

                                        <div className="rounded-xl bg-white/15 px-4 py-2 text-sm backdrop-blur">
                                            Security
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* DASHBOARD FLOATING IMAGE */}
                            <div className="absolute -bottom-10 -left-8 w-72 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl sm:w-80">

                                <img
                                    src="/images/banking-dashboard.png"
                                    alt="Digital banking dashboard"
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                                        Digital Banking
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-900">
                                        Account overview
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* =========================================================
                    QUICK ACCESS
                ========================================================= */}
                <section className="border-b border-slate-200 bg-[#eef0f3]">

                    <div className="mx-auto grid max-w-7xl divide-y border-x border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                        <a href="#personal" className="group p-7 transition hover:bg-purple-50">

                            <p className="text-xs font-bold uppercase tracking-widest text-purple-700">
                                Personal
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-purple-800">
                                Personal Banking
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Manage your everyday banking needs with ease.
                            </p>
                        </a>

                        <a href="#business" className="group p-7 transition hover:bg-purple-50">

                            <p className="text-xs font-bold uppercase tracking-widest text-purple-700">
                                Business
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-purple-800">
                                Business Banking
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Banking tools designed for organizations and businesses.
                            </p>
                        </a>

                        <a href="#services" className="group p-7 transition hover:bg-purple-50">

                            <p className="text-xs font-bold uppercase tracking-widest text-purple-700">
                                Services
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-purple-800">
                                Banking Services
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Explore convenient account and financial management tools.
                            </p>
                        </a>

                    </div>
                </section>


                {/* =========================================================
                    PERSONAL BANKING
                ========================================================= */}
                <section id="personal" className="px-6 py-24 lg:px-8">

                    <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                Personal Banking
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Banking that works
                                <span className="block text-purple-800">
                                    around your life.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                Access your account, review balances, transfer
                                virtual funds, and keep track of your financial
                                activity from one convenient place.
                            </p>

                            <div className="mt-8 grid gap-5 sm:grid-cols-2">

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="text-2xl text-purple-800">
                                        $
                                    </div>

                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Account Management
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Keep your account information organized
                                        and accessible.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="text-2xl text-purple-800">
                                        ↗
                                    </div>

                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Money Transfers
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Transfer virtual funds conveniently through
                                        your account.
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* FINANCIAL GROWTH IMAGE */}
                        <div className="relative">

                            <div className="absolute -inset-4 rounded-[2rem] bg-purple-100/70 blur-2xl" />

                            <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-slate-200">

                                <img
                                    src="/images/financial-growth.png"
                                    alt="Financial growth graphic"
                                    className="h-[430px] w-full rounded-2xl object-cover"
                                />

                                <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/30 bg-white/90 p-5 shadow-xl backdrop-blur">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Financial overview
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-slate-900">
                                                Account Activity
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                {/* =========================================================
                    BUSINESS
                ========================================================= */}
                <section id="business" className="bg-slate-50 px-6 py-24 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="grid items-center gap-14 lg:grid-cols-2">

                            <div>

                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                    Business Banking
                                </p>

                                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                                    Built for the way
                                    <span className="block text-purple-800">
                                        businesses operate.
                                    </span>
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600">
                                    Organized account management and professional
                                    financial tools help businesses maintain control
                                    over their banking activities.
                                </p>

                                <div className="mt-10 grid gap-5 sm:grid-cols-2">

                                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-800">
                                            ◇
                                        </div>

                                        <h3 className="mt-5 font-bold">
                                            Business Accounts
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            Organized account information and convenient
                                            access to banking tools.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-800">
                                            ↗
                                        </div>

                                        <h3 className="mt-5 font-bold">
                                            Transactions
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            Keep track of account activity and transfer history.
                                        </p>
                                    </div>

                                </div>
                            </div>


                            {/* MONEY TRANSFER IMAGE */}
                            <div className="relative">

                                <div className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl ring-1 ring-slate-200">

                                    <img
                                        src="/images/money-transfer.png"
                                        alt="Money transfer illustration"
                                        className="h-[420px] w-full rounded-2xl object-cover"
                                    />

                                    <div className="mt-4 flex items-center justify-between px-3 pb-3">

                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-purple-700">
                                                Transfer Center
                                            </p>

                                            <p className="mt-1 font-bold text-slate-900">
                                                Convenient virtual transfers
                                            </p>
                                        </div>

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                            ↗
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* =========================================================
                    SERVICES
                ========================================================= */}
                <section id="services" className="px-6 py-24 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="text-center">

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                Our Services
                            </p>

                            <h2 className="mt-4 text-4xl font-bold text-slate-900">
                                Everything you need,
                                <span className="block text-purple-800">
                                    in one place.
                                </span>
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-slate-600">
                                Access convenient banking services designed around
                                account management and everyday financial activity.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                            {[
                                ['Account Management', 'Manage your account information and balances.'],
                                ['Money Transfers', 'Transfer virtual funds between supported accounts.'],
                                ['Transaction History', 'Review recent account activity.'],
                                ['Card Services', 'Manage card requests and account services.'],
                            ].map(([title, description]) => (
                                <div
                                    key={title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-800">
                                        +
                                    </div>

                                    <h3 className="mt-6 font-bold text-slate-900">
                                        {title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {description}
                                    </p>

                                    <div className="mt-6 text-sm font-bold text-purple-800">
                                        Learn more →
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =========================================================
                    SECURITY
                ========================================================= */}
                <section className="bg-purple-950 px-6 py-24 text-white lg:px-8">

                    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
                                Security
                            </p>

                            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                                Security is built into
                                <span className="block text-yellow-400">
                                    every experience.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-purple-100">
                                Comericafin is designed with controlled access,
                                authentication, account protection, and transaction
                                tracking at the center of the customer experience.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    'Secure customer authentication',
                                    'Controlled account access',
                                    'Protected account management',
                                    'Transaction activity tracking',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3">

                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-purple-950">
                                            ✓
                                        </div>

                                        <span className="text-purple-100">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* SECURITY IMAGE */}
                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[3rem] bg-yellow-400/10 blur-3xl" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">

                                <img
                                    src="/images/security-shield.png"
                                    alt="Security protection illustration"
                                    className="h-[440px] w-full rounded-2xl object-cover"
                                />

                                <div className="absolute bottom-9 left-9 right-9 rounded-2xl bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                                            ✓
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Account protection
                                            </p>

                                            <p className="font-bold">
                                                Security Active
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                {/* =========================================================
                    ABOUT
                ========================================================= */}
                <section id="about" className="px-6 py-24 lg:px-8">

                    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                                About Comericafin
                            </p>

                            <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
                                A modern approach to
                                <span className="block text-purple-800">
                                    digital banking.
                                </span>
                            </h2>
                        </div>

                        <div className="text-lg leading-8 text-slate-600">

                            <p>
                                Comericafin provides a structured digital banking
                                environment focused on convenient account management,
                                financial activity, and a professional customer
                                experience.
                            </p>

                            <p className="mt-6">
                                Our platform brings essential banking functions
                                together through a clean, intuitive interface designed
                                to make managing your account straightforward.
                            </p>

                            <div className="mt-8 rounded-2xl border border-purple-100 bg-purple-50 p-5 text-sm leading-6 text-purple-900">
                                <strong>Simulation platform:</strong> Comericafin is
                                designed as a virtual banking environment for account
                                management and financial activity simulation.
                            </div>

                        </div>
                    </div>
                </section>


                {/* =========================================================
                    CONTACT / CTA
                ========================================================= */}
                <section id="contact" className="bg-[#f4f6f8] px-6 py-20 lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="relative overflow-hidden rounded-3xl bg-purple-900 px-8 py-14 text-center shadow-2xl sm:px-16">

                            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[30px] border-white/5" />

                            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[30px] border-white/5" />

                            <div className="relative">

                                <h2 className="text-4xl font-bold text-white">
                                    Ready to access your account?
                                </h2>

                                <p className="mx-auto mt-5 max-w-2xl text-purple-100">
                                    Sign in to your Comericafin account to manage your
                                    banking activity and access your available services.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setLoginOpen(true)}
                                    className="mt-8 rounded-lg bg-yellow-400 px-7 py-4 text-sm font-bold text-purple-950 shadow-lg transition hover:bg-yellow-300"
                                >
                                    Customer Login
                                </button>

                            </div>
                        </div>
                    </div>
                </section>


                {/* =========================================================
                    FOOTER
                ========================================================= */}
                <footer className="bg-[#160625] px-6 py-14 text-white lg:px-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="grid gap-12 md:grid-cols-4">

                            <div className="md:col-span-2">

                                <img
                                    src="/images/comericafin-logo.png"
                                    alt="Comericafin"
                                    className="h-16 w-auto object-contain brightness-0 invert"
                                />

                                <p className="mt-5 max-w-md text-sm leading-6 text-purple-200">
                                    A modern digital banking simulation experience
                                    focused on convenient account management and
                                    professional financial interfaces.
                                </p>
                            </div>

                            <div>

                                <h3 className="font-bold text-white">
                                    Banking
                                </h3>

                                <div className="mt-5 space-y-3 text-sm text-purple-200">

                                    <a href="#personal" className="block hover:text-white">
                                        Personal Banking
                                    </a>

                                    <a href="#business" className="block hover:text-white">
                                        Business Banking
                                    </a>

                                    <a href="#services" className="block hover:text-white">
                                        Services
                                    </a>
                                </div>
                            </div>

                            <div>

                                <h3 className="font-bold text-white">
                                    Support
                                </h3>

                                <div className="mt-5 space-y-3 text-sm text-purple-200">

                                    <a href="#contact" className="block hover:text-white">
                                        Contact Us
                                    </a>

                                    <button
                                        type="button"
                                        onClick={() => setLoginOpen(true)}
                                        className="text-left hover:text-white"
                                    >
                                        Customer Login
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="mt-12 border-t border-purple-900 pt-6 text-center text-sm text-purple-300">
                            © {new Date().getFullYear()} Comericafin. All Rights Reserved.
                        </div>

                    </div>
                </footer>


                {/* =========================================================
                    RIGHT-SIDE LOGIN OVERLAY
                ========================================================= */}
                {loginOpen && (
                    <div className="fixed inset-0 z-[100]">

                        {/* BACKDROP */}
                        <div
                            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                            onClick={() => setLoginOpen(false)}
                        />

                        {/* LOGIN PANEL */}
                        <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

                            {/* HEADER */}
                            <div className="relative overflow-hidden bg-purple-900 px-8 py-9 text-white">

                                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border-[25px] border-white/10" />

                                <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full border-[20px] border-white/10" />

                                <div className="relative flex items-start justify-between">

                                    <div>

                                        <p className="text-sm font-medium text-purple-200">
                                            Welcome back
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold">
                                            Customer Login
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-purple-200">
                                            Sign in securely to access your Comericafin account.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setLoginOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
                                        aria-label="Close login"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>


                            {/* FORM */}
                            <div className="flex-1 overflow-y-auto px-8 py-9">

                                <form onSubmit={submitLogin} className="space-y-6">

                                    <div>

                                        <label className="mb-2 block text-sm font-bold text-slate-700">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            required
                                            autoFocus
                                        />

                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>


                                    <div>

                                        <label className="mb-2 block text-sm font-bold text-slate-700">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-700 focus:ring-4 focus:ring-purple-100"
                                            required
                                        />

                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>


                                    <label className="flex cursor-pointer items-center gap-3">

                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                            className="h-4 w-4 rounded border-slate-300 text-purple-800 focus:ring-purple-600"
                                        />

                                        <span className="text-sm text-slate-600">
                                            Remember me
                                        </span>
                                    </label>


                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-lg bg-purple-800 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Signing in...' : 'Sign In'}
                                    </button>

                                </form>


                                {/* SECURITY MESSAGE */}
                                <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <div className="flex gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                                            ✓
                                        </div>

                                        <div>

                                            <p className="text-sm font-bold text-slate-900">
                                                Secure Account Access
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                Your account information is protected
                                                through secure authentication and
                                                controlled access.
                                            </p>

                                        </div>
                                    </div>
                                </div>


                                <button
                                    type="button"
                                    onClick={() => setLoginOpen(false)}
                                    className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
