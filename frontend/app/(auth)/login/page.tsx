'use client';

import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-background)',
      padding: 'var(--space-6)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-8)',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: '0 0 var(--space-2) 0',
            fontFamily: 'var(--font-family-base)',
          }}>
            Bienvenido a Hikari
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: '1.5',
          }}>
            Accede a tu cuenta para gestionar tu centro médico
          </p>
        </div>

        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border-light)',
        }}>
          <LoginForm />
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
        }}>
          <span style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.95rem',
          }}>
            ¿Aún no tienes cuenta?{' '}
          </span>
          <Link
            href="/register"
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
            }}
          >
            Crear organización
          </Link>
        </div>
      </div>
    </div>
  );
}
