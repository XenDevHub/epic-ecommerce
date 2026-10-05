import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_8px_25px_rgba(108,71,255,0.4)] hover:-translate-y-0.5",
      secondary:
        "bg-bg-card border border-white/10 text-text-primary hover:bg-bg-card-hover hover:border-white/20",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
      danger:
        "bg-gradient-to-r from-accent-2 to-[#FF6B8A] text-white hover:shadow-[0_8px_25px_rgba(255,61,113,0.4)]",
      accent:
        "bg-gradient-to-r from-accent to-[#00E8BC] text-bg-primary font-semibold hover:shadow-[0_8px_25px_rgba(0,212,170,0.4)]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-7 py-3.5 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
