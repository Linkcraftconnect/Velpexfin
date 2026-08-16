import { Link } from '@inertiajs/react';

export default function PageHeader({
    title,
    description,
    buttonText,
    buttonLink
}) {
    return (
        <div className="flex justify-between items-center mb-6">

            <div>
                <h1 className="text-2xl font-bold text-purple-900">
                    {title}
                </h1>

                <p className="text-gray-600">
                    {description}
                </p>
            </div>


            {buttonText && (
                <Link
                    href={buttonLink}
                    className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800"
                >
                    + {buttonText}
                </Link>
            )}

        </div>
    );
}