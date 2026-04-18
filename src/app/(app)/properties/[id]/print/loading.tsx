export default function Loading() {
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="h-28 animate-pulse rounded-2xl border bg-muted/50" />
                    <div className="h-28 animate-pulse rounded-2xl border bg-muted/50" />
                    <div className="h-28 animate-pulse rounded-2xl border bg-muted/50" />
                </div>
                <div className="h-[65vh] animate-pulse rounded-3xl border bg-muted/50" />
            </div>
        </div>
    );
}
