'use client';

import { ReactNode, CSSProperties } from 'react';

export interface GridProps {
  children: ReactNode;
  columns?: number | 'auto-fit' | 'auto-fill';
  minItemWidth?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  style?: CSSProperties;
}

const gapMap = {
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-4)',
  lg: 'var(--space-6)',
  xl: 'var(--space-8)'
};

export function Grid({
  children,
  columns = 'auto-fit',
  minItemWidth = '300px',
  gap = 'md',
  fullWidth = true,
  style
}: GridProps) {
  const getGridTemplate = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    return `repeat(${columns}, minmax(${minItemWidth}, 1fr))`;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: getGridTemplate(),
      gap: gapMap[gap],
      width: fullWidth ? '100%' : 'auto',
      ...style
    }}>
      {children}
    </div>
  );
}
