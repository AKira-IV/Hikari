'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  fullWidth?: boolean;
  placeholder?: string;
  options: SelectOption[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({
    label,
    error,
    helpText,
    variant = 'default',
    fullWidth = false,
    placeholder,
    options,
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

        <div style={{ position: 'relative' }}>
          <select
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
              cursor: 'pointer',
              appearance: 'none',
              paddingRight: '40px'
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
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div style={{
            position: 'absolute',
            right: 'var(--space-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            pointerEvents: 'none'
          }}>
            ▼
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

SelectInput.displayName = 'SelectInput';
