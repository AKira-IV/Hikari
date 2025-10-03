'use client';

import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface FormSelectInputProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function FormSelectInput({
  name,
  label,
  options,
  placeholder,
  required = true,
  style,
  className,
}: FormSelectInputProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? `${label || 'Este campo'} es obligatorio` : false,
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
      <select
        {...field}
        id={name}
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
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
