import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "danger" | "warning" | "neutral";
  className?: string;
}

const badgeVariants = {
  primary:
    "bg-primary/15 text-primary-light border border-primary/30",
  success:
    "bg-accent/15 text-accent border border-accent/30",
  danger:
    "bg-accent-2/15 text-accent-2 border border-accent-2/30",
  warning:
    "bg-accent-3/15 text-accent-3 border border-accent-3/30",
  neutral:
    "bg-white/5 text-text-secondary border border-white/10",
};

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
