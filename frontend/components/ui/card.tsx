import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={clsx('rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40 backdrop-blur-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-400">{children}</div>;
}
