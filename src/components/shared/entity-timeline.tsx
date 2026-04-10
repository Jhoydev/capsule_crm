'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TimelineIcon, TimelineItem } from '@/lib/timeline';
import { BadgeEuro, FileText, Home, ImageIcon, Link2, Mail, MapPinned, Phone, ShieldCheck, Sparkles, UserRound } from 'lucide-react';

const iconMap: Record<TimelineIcon, React.ComponentType<{ className?: string }>> = {
    user: UserRound,
    mail: Mail,
    phone: Phone,
    note: FileText,
    shield: ShieldCheck,
    link: Link2,
    home: Home,
    price: BadgeEuro,
    image: ImageIcon,
    map: MapPinned,
    sparkles: Sparkles,
};

type EntityTimelineProps = {
    title: string;
    description: string;
    items: TimelineItem[];
    className?: string;
};

export function EntityTimeline({ title, description, items, className }: EntityTimelineProps) {
    return (
        <Card className={cn('border bg-card text-card-foreground shadow-sm', className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                        No timeline events available yet.
                    </div>
                ) : (
                    <div className="space-y-0">
                        {items.map((item, index) => {
                            const Icon = iconMap[item.icon ?? 'sparkles'];
                            const isLast = index === items.length - 1;

                            return (
                                <div key={item.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        {!isLast && <div className="min-h-8 w-px flex-1 bg-border" />}
                                    </div>
                                    <div className={cn('pb-8 pt-1', isLast && 'pb-0')}>
                                        {item.meta && (
                                            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                                {item.meta}
                                            </div>
                                        )}
                                        <div className="text-sm font-semibold">{item.title}</div>
                                        <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
