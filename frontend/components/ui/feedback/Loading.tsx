'use client';

import { ReactNode, CSSProperties } from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  style?: CSSProperties;
}

const sizeMap = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px'
};

const colorMap = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-text-muted)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)'
};

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  style
}: LoadingSpinnerProps) {
  return (
    <div
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `2px solid ${colorMap[color]}20`,
        borderTop: `2px solid ${colorMap[color]}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        ...style
      }}
    />
  );
}

// Componente de Loading con texto
export interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  centered?: boolean;
  style?: CSSProperties;
}

export function Loading({
  text = 'Cargando...',
  size = 'md',
  color = 'primary',
  centered = true,
  style
}: LoadingProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      justifyContent: centered ? 'center' : 'flex-start',
      ...style
    }}>
      <LoadingSpinner size={size} color={color} />
      {text && (
        <span style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          fontWeight: '500'
        }}>
          {text}
        </span>
      )}
    </div>
  );
}
