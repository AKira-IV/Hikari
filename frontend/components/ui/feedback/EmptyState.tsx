'use client';

import { ReactNode, CSSProperties } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  style?: CSSProperties;
}

export function EmptyState({
  icon = '📂',
  title,
  description,
  action,
  style
}: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-12)',
      gap: 'var(--space-4)',
      ...style
    }}>
      <div style={{
        fontSize: '4rem',
        opacity: 0.6
      }}>
        {icon}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: 0
        }}>
          {title}
        </h3>

        {description && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            maxWidth: '400px'
          }}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <div style={{ marginTop: 'var(--space-2)' }}>
          {action}
        </div>
      )}
    </div>
  );
}
