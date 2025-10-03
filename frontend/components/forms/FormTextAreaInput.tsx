'use client';

import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface FormTextAreaInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function FormTextAreaInput({
  name,
  label,
  placeholder,
  required = false,
  minLength,
  maxLength,
  rows = 4,
  style,
  className,
}: FormTextAreaInputProps) {
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
      <textarea
        {...field}
        id={name}
        placeholder={placeholder}
        rows={rows}
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
          outline: 'none',
          resize: 'vertical',
        }}
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
