import { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "badge badge-default",
  primary: "badge badge-primary",
  success: "badge badge-success",
  warning: "badge badge-warning",
  danger: "badge badge-danger",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "badge-sm",
  md: "badge-md",
};

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  return (
    <span className={clsx(variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </span>
  );
}
