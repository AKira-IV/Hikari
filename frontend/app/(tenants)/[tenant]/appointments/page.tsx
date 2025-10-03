import { Card } from '@/components/ui/card';

interface AppointmentsPageProps {
  params: { tenant: string };
}

export default function AppointmentsPage({ params }: AppointmentsPageProps) {
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
          Agenda Médica
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          margin: 0
        }}>
          Gestión de citas y programación para {tenant}
        </p>
      </div>

      <Card style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: 'var(--space-4)'
        }}>
          📅
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: '0 0 var(--space-3) 0'
        }}>
          Sistema de Citas en Desarrollo
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto var(--space-6) auto'
        }}>
          El módulo de agenda incluirá funcionalidades completas de programación:
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
              Calendario Interactivo
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Vista diaria, semanal y mensual con disponibilidad en tiempo real
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
              Recordatorios
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Notificaciones automáticas por SMS/email a pacientes
            </p>
          </div>
          <div style={{
            padding: 'var(--space-4)',
            backgroundColor: 'rgba(235, 203, 139, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-warning)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--color-warning)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Lista de Espera
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              Gestión inteligente de cancelaciones y reagendamientos
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
