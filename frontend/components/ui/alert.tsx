import { ReactNode } from "react";
import clsx from "clsx";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
  info: "alert alert-info",
  success: "alert alert-success",
  warning: "alert alert-warning",
  danger: "alert alert-danger",
};

export function Alert({ variant = "info", children }: AlertProps) {
  return <div className={clsx(variantClasses[variant])}>{children}</div>;
}
