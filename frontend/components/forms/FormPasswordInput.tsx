'use client';

import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface FormPasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function FormPasswordInput({
  name,
  label,
  placeholder,
  style,
  className,
}: FormPasswordInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${label || 'Este campo'} es obligatorio`,
      minLength: {
        value: 6,
        message: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
  });

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
        type="password"
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
