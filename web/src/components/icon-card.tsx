import { cn } from "@/lib/utils";

type IconCardProps = {
    children: React.ReactNode;
    className?: string;
}

export function IconCard({ children, className }: IconCardProps) {
    return (
        <div className={cn(
            "border p-3 rounded-md bg-primary/10 text-primary",
            className
        )}>
            {children}
        </div>
    )
}