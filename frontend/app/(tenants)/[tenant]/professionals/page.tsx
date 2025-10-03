import { Card } from '@/components/ui/card';

interface ProfessionalsPageProps {
  params: { tenant: string };
}

export default function ProfessionalsPage({ params }: ProfessionalsPageProps) {
  const { tenant } = params;

  return (
    <div style={{
      padding: 'var(--space-8)',
      backgroundColor: 'var(--color-background)',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: '0 0 var(--space-2) 0'
        }}>
          Gestión de Profesionales
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          margin: 0
        }}>
          Administración del personal médico y sanitario de {tenant}
        </p>
      </div>

      <Card style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: 'var(--space-4)'
        }}>
          👨‍⚕️
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: '0 0 var(--space-3) 0'
        }}>
          Directorio Médico en Desarrollo
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto var(--space-6) auto'
        }}>
          El módulo de profesionales permitirá la gestión completa del equipo médico:
        </p>
        <div style={{
          display: 'grid',
          gap: 'var(--space-3)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: 'var(--space-6)',
          textAlign: 'left'
        }}>
          <div style={{
            padding: 'var(--space-4)',
            backgroundColor: 'rgba(139, 165, 202, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-info)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--color-info)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Perfiles Profesionales
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Especialidades, certificaciones, horarios y contacto
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-primary-alpha)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-primary)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Control de Turnos
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Programación de guardias y disponibilidad
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            backgroundColor: 'rgba(163, 190, 140, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-success)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--color-success)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Evaluaciones
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Sistema de performance y desarrollo profesional
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
