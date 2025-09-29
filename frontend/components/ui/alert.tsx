import { ReactNode } from 'react';
import clsx from 'clsx';

interface AlertProps {
  variant?: 'info' | 'error' | 'success';
  children: ReactNode;
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'border-sky-500/60 bg-sky-500/10 text-sky-100',
  error: 'border-rose-500/60 bg-rose-500/10 text-rose-100',
  success: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100',
};

export function Alert({ variant = 'info', children }: AlertProps) {
  return (
    <div className={clsx('w-full rounded-md border px-3 py-2 text-sm', variantStyles[variant])}>
      {children}
    </div>
  );
}
