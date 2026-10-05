import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-bg-card via-bg-card-hover to-bg-card bg-[length:200%_100%] animate-shimmer rounded-lg",
        className
      )}
    />
  );
}

/** Skeleton for a product card */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-bg-card border border-white/5">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
