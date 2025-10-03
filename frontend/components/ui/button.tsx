"use client";

import { ButtonHTMLAttributes, forwardRef, CSSProperties } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, style, variant = "primary", fullWidth, disabled, ...rest }, ref) => {
    const getVariantStyles = (): CSSProperties => {
      const base: CSSProperties = {
        padding: fullWidth ? 'var(--space-4)' : 'var(--space-3) var(--space-6)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.95rem',
        fontWeight: '600',
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-family-base)',
        letterSpacing: '0.01em',
      };

      switch (variant) {
        case "primary":
          return {
            ...base,
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            boxShadow: 'var(--shadow-sm)',
          };
        case "secondary":
          return {
            ...base,
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          };
        case "ghost":
          return {
            ...base,
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
          };
      }
    };

    return (
      <button
        ref={ref}
        style={{ ...getVariantStyles(), ...style }}
        disabled={disabled}
        onMouseEnter={(e) => {
          if (!disabled) {
            if (variant === "primary") {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            } else if (variant === "secondary") {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
            } else if (variant === "ghost") {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            if (variant === "primary") {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            } else if (variant === "secondary") {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            } else if (variant === "ghost") {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
