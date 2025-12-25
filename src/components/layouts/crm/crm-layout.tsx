'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReactNode } from 'react';
import SidebarExtended from '@/components/layouts/crm/sidebar-extended/sidebar-extended';
import AvatarDropdownMenu from '@/components/layouts/crm/avatar-dropdown-menu/avatar-dropdown-menu';
import SidebarSheet from '@/components/layouts/crm/sidebar-sheet/sidebar-sheet';
import { Bell, Pill } from 'lucide-react';
import { UserType } from '@/types/user.type';
import { ThemeProvider } from "@/components/structure/theme-provider";
import {ToogleTheme} from "@/components/shared/toggleTheme";
import { Toaster } from "@/components/ui/toaster"
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { cn } from "@/lib/utils";
import { SidebarToggle } from "@/components/layouts/crm/sidebar-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function CrmLayout({ user, children }: { user: UserType, children: ReactNode }) {
    const { isCollapsed } = useSidebarStore();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider>
                <div className={cn(
                    "grid h-screen w-full transition-all duration-300 ease-in-out",
                    isCollapsed 
                        ? "md:grid-cols-[70px_1fr] lg:grid-cols-[70px_1fr]" 
                        : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
                )}>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-screen sticky top-0 flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <Pill className="shrink-0"/>
                            {!isCollapsed && <span className="">Capsule CRM</span>}
                        </Link>
                        {!isCollapsed && (
                            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                <Bell className="h-4 w-4"/>
                                <span className="sr-only">Toggle notifications</span>
                            </Button>
                        )}
                    </div>
                    <div className="flex-1 overflow-auto">
                        <SidebarExtended />
                    </div>
                    <div className="mt-auto p-4 flex justify-center">
                        <SidebarToggle />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <SidebarSheet/>
                    <AvatarDropdownMenu user={user}/>
                    <ToogleTheme/>
                </header>
                <main className="flex flex-1 flex-col overflow-auto">
                    {children}
                    <Toaster />
                </main>
            </div>
        </div>
        </TooltipProvider>
        </ThemeProvider>
    )
}
