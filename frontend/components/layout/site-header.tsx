import Link from 'next/link';
import { mainNavigation } from '@/config/site';

const buttonBase =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-sky-400">
          Hikari Cloud
        </Link>
        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          {mainNavigation.map((item) => (
            <Link key={item.href} href={item.href as any} className="transition hover:text-sky-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`${buttonBase} border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 focus-visible:outline-slate-500 hidden md:inline-flex`}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className={`${buttonBase} bg-sky-500 text-slate-900 hover:bg-sky-400 focus-visible:outline-sky-300`}
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </header>
  );
}
