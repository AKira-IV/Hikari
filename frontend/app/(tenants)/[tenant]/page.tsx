interface TenantPageProps {
  params: { tenant: string };
}

export default function TenantHomePage({ params }: TenantPageProps) {
  const { tenant } = params;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100">Panel general</h2>
        <p className="text-sm text-slate-400">
          Resumen ejecutivo para el tenant <span className="font-semibold text-sky-300">{tenant}</span>.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {['Pacientes activos', 'Profesionales', 'Citas para hoy'].map((title) => (
          <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-100">--</p>
            <p className="mt-1 text-xs text-slate-500">Integrar con métricas reales desde el backend</p>
          </div>
        ))}
      </div>
    </div>
  );
}
