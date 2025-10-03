'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { TenantProvider } from '@/components/providers/tenant-provider';

interface TenantLayoutProps {
  children: ReactNode;
  params: { tenant: string };
}

const tenantNav = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/patients', label: 'Pacientes', icon: '👥' },
  { href: '/professionals', label: 'Profesionales', icon: '👨‍⚕️' },
  { href: '/appointments', label: 'Agenda', icon: '📅' },
];

export default function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenant } = params;

  return (
    <TenantProvider tenant={tenant}>
      <section style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        background: 'linear-gradient(to bottom, var(--color-surface), var(--color-surface-subtle))'
      }}>
        <div style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          maxWidth: '1200px',
          padding: 'var(--space-10) var(--space-4)'
        }}>
          <div>
            <p style={{
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-muted)'
            }}>
              Tenant seleccionado
            </p>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              margin: '0'
            }}>
              {tenant}
            </h1>
          </div>
          <nav style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            fontSize: '0.875rem'
          }}>
            {tenantNav.map((item) => (
              <Link
                key={item.href}
                href={`/${tenant}${item.href}`}
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid transparent',
                  padding: 'var(--space-2) var(--space-3)',
                  transition: 'all 0.2s ease',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-alpha)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div style={{
        margin: '0 auto',
        maxWidth: '1200px',
        padding: 'var(--space-10) var(--space-4)'
      }}>
        {children}
      </div>
    </TenantProvider>
  );
}
