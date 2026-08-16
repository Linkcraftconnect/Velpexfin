import { Link } from "@inertiajs/react";

export default function PageHeader({
    title,
    description,
    buttonText,
    buttonLink,
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

            <div>
                <h1 className="text-3xl font-bold text-purple-900">
                    {title}
                </h1>

                <p className="text-gray-500 mt-2">
                    {description}
                </p>
            </div>

            {buttonText && buttonLink && (
                <Link
                    href={buttonLink}
                    className="inline-flex items-center px-5 py-3 bg-purple-800 hover:bg-purple-900 text-white font-semibold rounded-xl transition"
                >
                    + {buttonText}
                </Link>
            )}

        </div>
    );
}