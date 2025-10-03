import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, Loading, EmptyState } from '@/components/ui/feedback';
import { Stack, Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';

const meta: Meta = {
  title: 'Hikari/Feedback',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componentes de feedback para informar al usuario sobre estados de carga, vacío y otros estados de la aplicación médica.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

// Loading Spinner Stories
export const LoadingSpinners: StoryObj = {
  name: 'Loading Spinners',
  render: () => (
    <Container style={{ backgroundColor: 'var(--color-background)', padding: 'var(--space-8)' }}>
      <Stack gap="xl">
        {/* Diferentes tamaños */}
        <div>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Tamaños</h3>
          <Stack direction="row" gap="lg" align="center">
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner size="sm" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Small</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner size="md" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Medium</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner size="lg" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Large</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner size="xl" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>X-Large</p>
            </div>
          </Stack>
        </div>

        {/* Diferentes colores */}
        <div>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Colores</h3>
          <Stack direction="row" gap="lg" align="center">
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner color="primary" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-primary)' }}>Primary</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner color="success" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-success)' }}>Success</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner color="warning" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-warning)' }}>Warning</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner color="danger" />
              <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem', color: 'var(--color-danger)' }}>Danger</p>
            </div>
          </Stack>
        </div>
      </Stack>
    </Container>
  )
};

// Loading with Text Stories
export const LoadingWithText: StoryObj = {
  name: 'Loading with Text',
  render: () => (
    <Container style={{ backgroundColor: 'var(--color-background)', padding: 'var(--space-8)' }}>
      <Stack gap="xl">
        <Loading text="Cargando pacientes..." />
        <Loading text="Guardando historia clínica..." color="success" />
        <Loading text="Procesando resultados de laboratorio..." color="warning" size="lg" />
        <Loading text="Conectando con el servidor..." color="danger" />
      </Stack>
    </Container>
  )
};

// Empty State Stories
export const EmptyStates: StoryObj = {
  name: 'Empty States',
  render: () => (
    <Container maxWidth="lg" style={{ backgroundColor: 'var(--color-background)', padding: 'var(--space-8)' }}>
      <Stack gap="xl">
        {/* Empty State básico */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <EmptyState
            icon="👥"
            title="No hay pacientes registrados"
            description="Comienza agregando el primer paciente al sistema para gestionar las historias clínicas."
          />
        </div>

        {/* Empty State con acción */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <EmptyState
            icon="📅"
            title="No hay citas programadas para hoy"
            description="El calendario está libre. Puedes programar nuevas citas para los pacientes."
            action={
              <Button variant="primary">
                Programar Nueva Cita
              </Button>
            }
          />
        </div>

        {/* Empty State para diferentes módulos */}
        <Stack direction="row" gap="lg">
          <div style={{ flex: 1, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <EmptyState
              icon="👨‍⚕️"
              title="Sin profesionales"
              description="Agrega médicos y enfermeras al equipo."
              action={
                <Button variant="secondary" style={{ fontSize: '0.875rem' }}>
                  Agregar Profesional
                </Button>
              }
            />
          </div>

          <div style={{ flex: 1, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
            <EmptyState
              icon="📊"
              title="Sin reportes"
              description="Los reportes aparecerán aquí cuando haya datos."
            />
          </div>
        </Stack>

        {/* Empty State para errores */}
        <div style={{ border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-lg)' }}>
          <EmptyState
            icon="⚠️"
            title="Error de conexión"
            description="No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta nuevamente."
            action={
              <Stack direction="row" gap="md">
                <Button variant="secondary">
                  Reintentar
                </Button>
                <Button variant="secondary">
                  Reportar Error
                </Button>
              </Stack>
            }
          />
        </div>
      </Stack>
    </Container>
  )
};

// Loading States en contexto
export const LoadingInContext: StoryObj = {
  name: 'Loading in Context',
  render: () => (
    <Container maxWidth="md" style={{ backgroundColor: 'var(--color-background)', padding: 'var(--space-8)' }}>
      <Stack gap="xl">
        {/* Card con loading */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface)'
        }}>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Lista de Pacientes</h3>
          <Loading text="Cargando lista de pacientes..." centered={false} />
        </div>

        {/* Modal loading */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
          backgroundColor: 'var(--color-surface)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 var(--space-6) 0' }}>Guardando Historia Clínica</h3>
          <Loading
            text="Por favor espera mientras se guarda la información..."
            size="lg"
            color="success"
          />
        </div>

        {/* Button loading state */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface)'
        }}>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Formulario de Paciente</h3>
          <Stack gap="md">
            <div style={{ height: '40px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}></div>
            <div style={{ height: '40px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}></div>
            <Button variant="primary" disabled style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <LoadingSpinner size="sm" color="secondary" />
              Guardando...
            </Button>
          </Stack>
        </div>
      </Stack>
    </Container>
  )
};
