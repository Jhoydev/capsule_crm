import Link from 'next/link';
import { Home, LayoutDashboard, Contact } from 'lucide-react';

const SidebarExtended = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            prefetch={false}
        >
            <LayoutDashboard />
            Dashboard
        </Link>
        <Link
            href="/properties"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            prefetch={false}
        >
            <Home />
            Properties
        </Link>
        <Link
            href="/contacts"
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            prefetch={false}
        >
            <Contact/>
            Contacts
        </Link>
    </nav>
)

export default SidebarExtended
