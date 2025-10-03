"use client";

import { forwardRef, InputHTMLAttributes, CSSProperties } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ style, ...rest }, ref) => (
  <input
    ref={ref}
    style={{
      width: '100%',
      padding: 'var(--space-4)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      fontSize: '1rem',
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      boxShadow: 'none',
      outline: 'none',
      ...style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = 'var(--color-text)';
      e.target.style.boxShadow = '0 0 0 2px var(--color-primary-alpha)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'var(--color-border)';
      e.target.style.boxShadow = 'none';
    }}
    {...rest}
  />
));Input.displayName = "Input";
