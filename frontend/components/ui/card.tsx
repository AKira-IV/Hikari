import { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Card({ className, style, children }: CardProps) {
  return <div className={clsx("card-frame", className)} style={style}>{children}</div>;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="card-header">
      <h2 className="card-title">{title}</h2>
      {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card-footer">{children}</div>;
}
