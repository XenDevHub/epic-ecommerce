import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 14,
  className,
  showValue = false,
}: StarRatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = !filled && i < rating;

        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              filled
                ? "fill-amber-400 text-amber-400"
                : halfFilled
                ? "fill-amber-400/50 text-amber-400"
                : "fill-transparent text-text-muted"
            )}
          />
        );
      })}
      {showValue && (
        <span className="text-xs text-text-secondary ml-1 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
