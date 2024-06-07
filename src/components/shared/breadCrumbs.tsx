import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePathname} from "next/navigation";
import Link from "next/link";
import React from "react";
import {Slash} from "lucide-react";

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter((part) => part);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                {pathParts.map((part, index) => {
                    const path = `/${pathParts.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathParts.length - 1;
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={isLast ? undefined : path}>{part}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default Breadcrumbs;