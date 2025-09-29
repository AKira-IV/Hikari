import { ReactNode } from 'react';
import Link from 'next/link';
import { TenantProvider } from '@/components/providers/tenant-provider';

interface TenantLayoutProps {
  children: ReactNode;
  params: { tenant: string };
}

const tenantNav = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/patients', label: 'Pacientes' },
  { href: '/professionals', label: 'Profesionales' },
  { href: '/appointments', label: 'Agenda' },
];

export default function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenant } = params;

  return (
    <TenantProvider tenant={tenant}>
      <section className="border-b border-slate-800/60 bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:px-8 md:py-12">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">Tenant seleccionado</p>
            <h1 className="text-3xl font-semibold text-sky-300">{tenant}</h1>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
            {tenantNav.map((item) => (
              <Link
                key={item.href}
                href={`/${tenant}${item.href}`}
                className="rounded-md border border-transparent px-3 py-2 transition hover:border-sky-400/50 hover:text-sky-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">{children}</div>
    </TenantProvider>
  );
}
