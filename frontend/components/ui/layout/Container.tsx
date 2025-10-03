'use client';

import { ReactNode, CSSProperties } from 'react';

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  style?: CSSProperties;
}

const maxWidthMap = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1400px',
  full: '100%'
};

const paddingMap = {
  none: '0',
  sm: 'var(--space-4)',
  md: 'var(--space-6)',
  lg: 'var(--space-8)',
  xl: 'var(--space-12)'
};

export function Container({
  children,
  maxWidth = 'xl',
  padding = 'md',
  centered = true,
  style
}: ContainerProps) {
  return (
    <div style={{
      width: '100%',
      maxWidth: maxWidthMap[maxWidth],
      margin: centered ? '0 auto' : '0',
      padding: paddingMap[padding],
      ...style
    }}>
      {children}
    </div>
  );
}
