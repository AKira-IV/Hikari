import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)',
        background: 'linear-gradient(to bottom, var(--color-background), var(--color-surface-subtle))'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at top, var(--color-primary-alpha), transparent 55%)'
        }} />
        <div style={{
          position: 'relative',
          margin: '0 auto',
          display: 'flex',
          maxWidth: '1200px',
          flexDirection: 'column',
          gap: 'var(--space-10)',
          padding: 'var(--space-12) var(--space-6)',
        }}>
          <div style={{ maxWidth: '768px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-success)',
              backgroundColor: 'rgba(163, 190, 140, 0.1)',
              padding: 'var(--space-1) var(--space-3)',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-success)',
              width: 'fit-content'
            }}>
              Sistema Gratuito 2025
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0
            }}>
              Sistema de Gestión Hospitalaria 100% Gratuito para Centros de Salud
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              color: 'var(--color-text-muted)',
              lineHeight: '1.6',
              margin: 0
            }}>
              Hikari es un sistema completamente gratuito y de código abierto diseñado para hospitales públicos,
              centros de salud rurales y clínicas comunitarias en países en desarrollo.
              Sin costos de licencia, para siempre.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-4)' }}>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <Button
                  variant="primary"
                  style={{
                    fontSize: '1rem',
                    padding: 'var(--space-4) var(--space-6)',
                    backgroundColor: 'var(--color-success)',
                    borderColor: 'var(--color-success)'
                  }}
                >
                  Comenzar Gratis Ahora
                </Button>
              </Link>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="secondary"
                  style={{
                    fontSize: '1rem',
                    padding: 'var(--space-4) var(--space-6)'
                  }}
                >
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)'
      }}>
        <div style={{
          margin: '0 auto',
          maxWidth: '1200px',
          padding: 'var(--space-12) var(--space-6)'
        }}>
          <div style={{
            marginBottom: 'var(--space-12)',
            maxWidth: '768px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: '600',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0
            }}>
              Diseñado para la salud mundial
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              lineHeight: '1.6',
              margin: 0
            }}>
              Sistema completamente gratuito para hospitales públicos, centros de salud rurales y clínicas comunitarias.
              Tecnología de calidad mundial accesible para todos.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gap: 'var(--space-6)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}>
            {highlights.map((item) => (
              <Card key={item.title}>
                <CardHeader title={item.title} subtitle={item.description} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="security" style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface-subtle)'
      }}>
        <div style={{
          margin: '0 auto',
          display: 'grid',
          maxWidth: '1200px',
          gap: 'var(--space-10)',
          padding: 'var(--space-12) var(--space-6)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0
            }}>
              Seguridad y transparencia garantizadas
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)'
            }}>
              <li style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)'
              }}>
                <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>•</span>
                Cumplimiento completo OWASP Top 10 para máxima seguridad.
              </li>
              <li style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)'
              }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}>•</span>
                Código 100% abierto para auditoría y transparencia total.
              </li>
              <li style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)'
              }}>
                <span style={{ color: 'var(--color-info)', marginTop: '2px' }}>•</span>
                Protección reCAPTCHA v3 contra ataques automatizados.
              </li>
              <li style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)'
              }}>
                <span style={{ color: 'var(--color-warning)', marginTop: '2px' }}>•</span>
                Auditoría multi-tenant con alertas y métricas exportables.
              </li>
              <li style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: '1.5',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)'
              }}>
                <span style={{ color: 'var(--color-danger)', marginTop: '2px' }}>•</span>
                Validación anti-inyección y sanitización centralizada.
              </li>
            </ul>
          </div>
          <Card style={{ backgroundColor: 'var(--color-surface)' }}>
            <CardHeader
              title="API REST completa y documentada"
              subtitle="Documentación Swagger automática para integración fácil con sistemas existentes en tu hospital."
            />
            <div style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-subtle)',
              padding: 'var(--space-4)',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)'
            }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
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

      <section id="commitment" style={{ backgroundColor: 'var(--color-background)' }}>
        <div style={{
          margin: '0 auto',
          maxWidth: '1200px',
          padding: 'var(--space-12) var(--space-6)'
        }}>
          <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)'
          }}>
            <h3 style={{
              fontSize: '3rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0
            }}>
              Compromiso de Gratuidad Total
            </h3>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Hikari es y siempre será completamente gratuito. Nuestro compromiso es con la salud mundial,
              especialmente para centros de salud que más lo necesitan.
            </p>
          </div>
          <div style={{
            marginTop: 'var(--space-12)',
            display: 'grid',
            gap: 'var(--space-6)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <Card style={{
              backgroundColor: 'rgba(163, 190, 140, 0.1)',
              borderColor: 'var(--color-success)'
            }}>
              <CardHeader
                title="Para Todos"
                subtitle="Sistema gratuito para hospitales públicos, centros rurales, clínicas comunitarias y organizaciones humanitarias en todo el mundo."
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                fontSize: '0.95rem',
                color: 'var(--color-success)'
              }}>
                <div>• Sin costos de licencia</div>
                <div>• Sin límites de usuarios</div>
                <div>• Sin restricciones comerciales</div>
                <div>• Código 100% abierto</div>
              </div>
            </Card>
            <Card style={{
              backgroundColor: 'var(--color-primary-alpha)',
              borderColor: 'var(--color-primary)'
            }}>
              <CardHeader
                title="Casos de Uso"
                subtitle="Perfecto para digitalizar procesos hospitalarios en centros de salud con recursos limitados."
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                fontSize: '0.95rem',
                color: 'var(--color-primary)'
              }}>
                <div>• Gestión de pacientes</div>
                <div>• Agenda de citas médicas</div>
                <div>• Control de profesionales</div>
                <div>• Historias clínicas digitales</div>
                <div>• Reportes y estadísticas</div>
              </div>
            </Card>
            <Card style={{
              backgroundColor: 'rgba(235, 203, 139, 0.1)',
              borderColor: 'var(--color-warning)'
            }}>
              <CardHeader
                title="Comunidad"
                subtitle="Desarrollado por y para la comunidad médica mundial. Contribuciones bienvenidas."
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                fontSize: '0.95rem',
                color: 'var(--color-warning)'
              }}>
                <div>• Reportar bugs</div>
                <div>• Sugerir mejoras</div>
                <div>• Contribuir código</div>
                <div>• Mejorar documentación</div>
                <div>• Traducir a tu idioma</div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(163, 190, 140, 0.1)',
              border: '1px solid var(--color-success)',
              padding: 'var(--space-6)',
            }}>
              <span style={{
                color: 'var(--color-success)',
                fontWeight: '600'
              }}>
                Si Hikari ayuda a tu centro de salud, ¡comparte tu experiencia!
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
