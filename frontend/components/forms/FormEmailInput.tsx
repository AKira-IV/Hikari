'use client';

import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface FormEmailInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  style?: React.CSSProperties;
  className?: string;
}

export function FormEmailInput({
  name,
  label,
  placeholder,
  variant,
  style,
  className,
}: FormEmailInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${label || 'Este campo'} es obligatorio`,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Ingresa un correo electrónico válido',
      },
    },
  });

  const inputVariant = error ? 'error' : variant;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }} className={className}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-family-base)',
          }}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Input
        {...field}
        id={name}
        type="email"
        placeholder={placeholder}
      />
      {error && (
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--color-danger)',
          margin: 0,
          fontFamily: 'var(--font-family-base)',
        }}>
          {error.message}
        </p>
      )}
    </div>
  );
}
