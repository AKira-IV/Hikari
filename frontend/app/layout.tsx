import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CaptchaProvider } from '@/components/providers/captcha-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/components/providers/auth-context';
import { SiteHeader } from '@/components/layout/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hikari Cloud | Plataforma de gestión hospitalaria',
  description:
    'Plataforma multi-tenant para gestión hospitalaria, seguridad avanzada y experiencias digitales centradas en el paciente.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className} style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
        <ThemeProvider>
          <AuthProvider>
            <CaptchaProvider>
              <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
                <SiteHeader />
                <main style={{ flex: 1 }}>{children}</main>
                <footer style={{
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-5) 0',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)'
                }}>
                  © {new Date().getFullYear()} Hikari Cloud. Todos los derechos reservados.
                </footer>
              </div>
            </CaptchaProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
