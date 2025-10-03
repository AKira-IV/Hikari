'use client';

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  bgColor?: string;
  iconColor?: string;
  disabled?: boolean;
  badge?: string;
}

export function ModuleCard({
  title,
  description,
  icon,
  href,
  bgColor = 'var(--color-surface)',
  iconColor = 'var(--color-primary)',
  disabled = false,
  badge
}: ModuleCardProps) {
  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(94, 129, 172, 0.15)';
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  };

  if (disabled) {
    return (
      <div style={{ display: 'block' }}>
        <Card style={{
          padding: 'var(--space-6)',
          backgroundColor: bgColor,
          border: `1px solid var(--color-border-muted)`,
          cursor: 'not-allowed',
          position: 'relative',
          opacity: 0.6,
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {badge && (
            <div style={{
              position: 'absolute',
              top: 'var(--space-2)',
              right: 'var(--space-2)',
              backgroundColor: 'var(--color-text-muted)',
              color: 'white',
              fontSize: '0.625rem',
              fontWeight: '600',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-md)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {badge}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-text-muted)20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'var(--color-text-muted)'
            }}>
              {icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: '1.2'
              }}>
                {title}
              </h3>
            </div>
          </div>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            {description}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <Link href={href as any} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          padding: 'var(--space-6)',
          backgroundColor: bgColor,
          border: `1px solid var(--color-border)`,
          borderRadius: 'var(--radius-lg)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          position: 'relative',
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {badge && (
          <div style={{
            position: 'absolute',
            top: 'var(--space-2)',
            right: 'var(--space-2)',
            backgroundColor: 'var(--color-success)',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: '600',
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-md)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {badge}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: iconColor + '20',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: iconColor
          }}>
            {icon}
          </div>
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              margin: 0,
              lineHeight: '1.2'
            }}>
              {title}
            </h3>
          </div>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {description}
        </p>
      </div>
    </Link>
  );
}
