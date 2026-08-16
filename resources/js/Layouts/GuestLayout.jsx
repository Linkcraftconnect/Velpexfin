import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-800 to-purple-600 relative overflow-hidden flex items-center justify-center px-6">

            {/* Background Blur */}
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

            <div className="w-full max-w-lg">

                {/* Logo */}
                <div className="text-center mb-6">
                    <Link href="/">
                        <img
                            src="/images/comericafin-logo.png"
                            alt="Comericafin"
                            className="w-48 mx-auto"
                        />
                    </Link>

                    <p className="mt-4 text-yellow-300 tracking-[4px] uppercase text-sm font-semibold">
                        Stronger Values. Smarter Futures.
                    </p>
                </div>

                {/* Security Badge */}
                <div className="mb-5 flex justify-center">
                    <div className="bg-green-500/20 border border-green-400 text-white rounded-full px-5 py-2 text-sm font-medium">
                        🟢 Secure Banking Portal
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Gold Top Bar */}
                    <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

                    <div className="p-10">

                        {children}

                        <hr className="my-8" />

                        <div className="space-y-3 text-sm text-gray-600">

                            <div>🔒 256-bit SSL Encryption</div>

                            <div>🛡 Protected Banking Session</div>

                            <div>✅ Trusted Digital Banking Experience</div>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-white/80 text-sm space-y-2">

                    <div className="space-x-4">
                        <span>Privacy</span>
                        <span>Security</span>
                        <span>Contact</span>
                    </div>

                    <div>
                        © 2026 Comericafin. All Rights Reserved.
                    </div>

                </div>

            </div>

        </div>
    );
}