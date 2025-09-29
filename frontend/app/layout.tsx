import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CaptchaProvider } from '@/components/providers/captcha-provider';
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
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <CaptchaProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-800/60 bg-slate-950/60 py-6 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} Hikari Cloud. Todos los derechos reservados.
            </footer>
          </div>
        </CaptchaProvider>
      </body>
    </html>
  );
}
