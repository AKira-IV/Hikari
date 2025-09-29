interface DashboardPageProps {
  params: { tenant: string };
}

export default function TenantDashboardPage({ params }: DashboardPageProps) {
  const { tenant } = params;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100">Dashboard clínico</h2>
        <p className="text-sm text-slate-400">
          Indicadores clave para <span className="font-semibold text-sky-300">{tenant}</span>. Integra tus fuentes de datos
          en esta vista con widgets configurables.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-sm font-semibold text-slate-200">Alertas de seguridad</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• 0 intentos de acceso sospechosos en las últimas 24 horas.</li>
            <li>• Auditoría en tiempo real para endpoints críticos.</li>
            <li>• Activa MFA para roles administrativos.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-sm font-semibold text-slate-200">Roadmap operativo</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• Integración con módulo de citas y tablero en tiempo real.</li>
            <li>• Configurar flujos de onboarding para personal médico.</li>
            <li>• Monitoreo de SLA y alertas proactivas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
