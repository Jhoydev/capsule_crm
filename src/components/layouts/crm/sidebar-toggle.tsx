'use client';

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
    className?: string;
}

export function SidebarToggle({ className }: SidebarToggleProps) {
    const { isCollapsed, toggleSidebar } = useSidebarStore();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className={cn("h-8 w-8 rounded-full bg-background border", className)}
        >
            {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
            ) : (
                <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}
