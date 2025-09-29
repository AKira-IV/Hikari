import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';

const highlights = [
  {
    title: '100% Gratuito',
    description:
      'Sistema completamente gratuito y de código abierto. Sin costos de licencia, para siempre.',
  },
  {
    title: 'Multi-tenant nativo',
    description:
      'Cada hospital/clínica tiene su propia instancia aislada con datos seguros y auditoría completa.',
  },
  {
    title: 'Seguridad OWASP',
    description:
      'Cumplimiento completo OWASP Top 10, auditoría en tiempo real y protección avanzada.',
  },
  {
    title: 'Para países en desarrollo',
    description:
      'Diseñado específicamente para hospitales públicos y centros de salud con recursos limitados.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-32">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-200">
              Sistema Gratuito 2025
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
              Sistema de Gestión Hospitalaria 100% Gratuito para Centros de Salud
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Hikari es un sistema completamente gratuito y de código abierto diseñado para hospitales públicos,
              centros de salud rurales y clínicas comunitarias en países en desarrollo.
              Sin costos de licencia, para siempre.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
              >
                Comenzar Gratis Ahora
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-b border-slate-800/60 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <div className="mb-12 max-w-3xl space-y-4">
            <h2 className="text-3xl font-semibold text-slate-100 md:text-4xl">Diseñado para la salud mundial</h2>
            <p className="text-base text-slate-400">
              Sistema completamente gratuito para hospitales públicos, centros de salud rurales y clínicas comunitarias.
              Tecnología de calidad mundial accesible para todos.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <Card key={item.title}>
                <CardHeader title={item.title} subtitle={item.description} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-b border-slate-800/60 bg-slate-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-slate-100">Seguridad y transparencia garantizadas</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Cumplimiento completo OWASP Top 10 para máxima seguridad.</li>
              <li>• Código 100% abierto para auditoría y transparencia total.</li>
              <li>• Protección reCAPTCHA v3 contra ataques automatizados.</li>
              <li>• Auditoría multi-tenant con alertas y métricas exportables.</li>
              <li>• Validación anti-inyección y sanitización centralizada.</li>
            </ul>
          </div>
          <Card className="bg-slate-900/80">
            <CardHeader
              title="API REST completa y documentada"
              subtitle="Documentación Swagger automática para integración fácil con sistemas existentes en tu hospital."
            />
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
              <pre>
                <code>{`POST /auth/login
Content-Type: application/json
X-Tenant-Subdomain: demo

{
  "email": "admin@demo.com",
  "password": "admin123",
  "tenantSubdomain": "demo"
}

> 200 OK
{ "access_token": "...", "user": { "role": "admin" } }`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </section>

      <section id="commitment" className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <div className="text-center space-y-8">
            <h3 className="text-3xl font-semibold text-slate-100">Compromiso de Gratuidad Total</h3>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Hikari es y siempre será completamente gratuito. Nuestro compromiso es con la salud mundial,
              especialmente para centros de salud que más lo necesitan.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader
                title="Para Todos"
                subtitle="Sistema gratuito para hospitales públicos, centros rurales, clínicas comunitarias y organizaciones humanitarias en todo el mundo."
              />
              <div className="space-y-2 text-sm text-green-200">
                <div>• Sin costos de licencia</div>
                <div>• Sin límites de usuarios</div>
                <div>• Sin restricciones comerciales</div>
                <div>• Código 100% abierto</div>
              </div>
            </Card>
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardHeader
                title="Casos de Uso"
                subtitle="Perfecto para digitalizar procesos hospitalarios en centros de salud con recursos limitados."
              />
              <div className="space-y-2 text-sm text-blue-200">
                <div>• Gestión de pacientes</div>
                <div>• Agenda de citas médicas</div>
                <div>• Control de profesionales</div>
                <div>• Historias clínicas digitales</div>
                <div>• Reportes y estadísticas</div>
              </div>
            </Card>
            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardHeader
                title="Comunidad"
                subtitle="Desarrollado por y para la comunidad médica mundial. Contribuciones bienvenidas."
              />
              <div className="space-y-2 text-sm text-purple-200">
                <div>• Reportar bugs</div>
                <div>• Sugerir mejoras</div>
                <div>• Contribuir código</div>
                <div>• Mejorar documentación</div>
                <div>• Traducir a tu idioma</div>
              </div>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 rounded-full bg-green-500/10 border border-green-500/30 px-6 py-3">
              <span className="text-green-400 font-semibold">
                Si Hikari ayuda a tu centro de salud, ¡comparte tu experiencia!
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
