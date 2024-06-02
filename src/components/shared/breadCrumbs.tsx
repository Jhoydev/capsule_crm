import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter((part) => part);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2">
                <li>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Home
                    </Link>
                </li>
                {pathParts.map((part, index) => {
                    const path = `/${pathParts.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathParts.length - 1;

                    return (
                        <li key={path}>
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span className="text-gray-500">{part}</span>
                            ) : (
                                <Link href={path} className="text-blue-500 hover:underline">
                                    {part}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
