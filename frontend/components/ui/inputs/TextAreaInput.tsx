'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  fullWidth?: boolean;
  resizable?: boolean;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({
    label,
    error,
    helpText,
    variant = 'default',
    fullWidth = false,
    resizable = true,
    style,
    ...props
  }, ref) => {
    const borderColor = {
      default: 'var(--color-border)',
      success: 'var(--color-success)',
      error: 'var(--color-danger)',
      warning: 'var(--color-warning)'
    }[error ? 'error' : variant];

    const focusBorderColor = {
      default: 'var(--color-primary)',
      success: 'var(--color-success)',
      error: 'var(--color-danger)',
      warning: 'var(--color-warning)'
    }[error ? 'error' : variant];

    return (
      <div style={{
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        ...style
      }}>
        {label && (
          <label style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--color-text)',
            display: 'block'
          }}>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          style={{
            width: '100%',
            padding: 'var(--space-3)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            outline: 'none',
            resize: resizable ? 'vertical' : 'none',
            minHeight: '100px',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = focusBorderColor;
            e.target.style.boxShadow = `0 0 0 3px ${focusBorderColor}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />

        {(error || helpText) && (
          <div style={{
            fontSize: '0.75rem',
            color: error ? 'var(--color-danger)' : 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)'
          }}>
            {error && <span>⚠️</span>}
            {error || helpText}
          </div>
        )}
      </div>
    );
  }
);

TextAreaInput.displayName = 'TextAreaInput';
