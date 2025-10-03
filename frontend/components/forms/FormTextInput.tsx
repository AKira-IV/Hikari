'use client';

import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface FormTextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function FormTextInput({
  name,
  label,
  placeholder,
  required = true,
  minLength,
  maxLength,
  style,
  className,
}: FormTextInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? `${label || 'Este campo'} es obligatorio` : false,
      minLength: minLength ? {
        value: minLength,
        message: `Debe tener al menos ${minLength} caracteres`,
      } : undefined,
      maxLength: maxLength ? {
        value: maxLength,
        message: `No puede tener más de ${maxLength} caracteres`,
      } : undefined,
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
        type="text"
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
