'use client';

import Link from 'next/link';
import { Home, LayoutDashboard, Contact } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/stores/use-sidebar-store';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarExtended = () => {
    const pathname = usePathname();
    const { isCollapsed } = useSidebarStore();
    
    const statusLink: { default: string; active: string } = {
        active: 'bg-muted text-primary',
        default: 'text-muted-foreground'
    }

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/properties', label: 'Properties', icon: Home },
        { href: '/contacts', label: 'Contacts', icon: Contact },
        { href: '/ecard', label: 'E-Card', icon: Contact },
    ];

    return (
        <nav className={cn(
            "grid items-start px-2 text-sm font-medium lg:px-4 gap-1",
            isCollapsed && "px-1 lg:px-2"
        )}>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            isActive ? statusLink.active : statusLink.default,
                            isCollapsed && "justify-center px-0"
                        )}
                        prefetch={false}
                    >
                        <Icon className="h-5 w-5 shrink-0" />
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                );
            })}
        </nav>
    )
}
export default SidebarExtended
