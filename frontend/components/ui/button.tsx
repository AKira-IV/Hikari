'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', fullWidth, disabled, ...rest }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-sky-500 text-slate-900 hover:bg-sky-400 focus-visible:outline-sky-300',
      secondary: 'bg-slate-800 text-slate-50 hover:bg-slate-700 focus-visible:outline-slate-500',
      ghost: 'bg-transparent text-slate-200 hover:bg-slate-800 focus-visible:outline-slate-500',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variants[variant], fullWidth && 'w-full', className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
