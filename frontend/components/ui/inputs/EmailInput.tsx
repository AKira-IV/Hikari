'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

export interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  fullWidth?: boolean;
  validateEmail?: boolean;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({
    label,
    error,
    helpText,
    variant = 'default',
    fullWidth = false,
    validateEmail = true,
    style,
    onChange,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validateEmail && e.target.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
          e.target.setCustomValidity('Por favor ingresa un email válido');
        } else {
          e.target.setCustomValidity('');
        }
      }
      onChange?.(e);
    };

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

        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            type="email"
            style={{
              width: '100%',
              padding: 'var(--space-3) 48px var(--space-3) var(--space-3)',
              border: `1px solid ${borderColor}`,
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = focusBorderColor;
              e.target.style.boxShadow = `0 0 0 3px ${focusBorderColor}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = 'none';
            }}
            onChange={handleChange}
            {...props}
          />

          <div style={{
            position: 'absolute',
            right: 'var(--space-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
            fontSize: '1rem',
            pointerEvents: 'none'
          }}>
            📧
          </div>
        </div>

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

EmailInput.displayName = 'EmailInput';
