'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  fullWidth?: boolean;
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({
    label,
    error,
    helpText,
    variant = 'default',
    fullWidth = false,
    showToggle = true,
    style,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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

        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            style={{
              width: '100%',
              padding: showToggle ? 'var(--space-3) 48px var(--space-3) var(--space-3)' : 'var(--space-3)',
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
            {...props}
          />

          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 'var(--space-3)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                fontSize: '1rem',
                padding: 'var(--space-1)',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          )}
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

PasswordInput.displayName = 'PasswordInput';
