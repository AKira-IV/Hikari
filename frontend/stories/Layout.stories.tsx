import type { Meta, StoryObj } from '@storybook/react';
import { Container, Stack, Grid } from '@/components/ui/layout';
import { Card } from '@/components/ui/card';

const meta: Meta = {
  title: 'Hikari/Layout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Componentes de layout reutilizables para organizar contenido en el sistema hospitalario. Incluye Container, Stack y Grid con opciones flexibles de espaciado y alineación.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

// Container Stories
export const ContainerDemo: StoryObj = {
  name: 'Container - Responsive',
  render: () => (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: 'var(--space-4)' }}>
      <Stack gap="lg">
        <Container maxWidth="sm" style={{ backgroundColor: 'var(--color-primary-alpha)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Container SM (640px)</p>
        </Container>

        <Container maxWidth="md" style={{ backgroundColor: 'var(--color-success)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Container MD (768px)</p>
        </Container>

        <Container maxWidth="lg" style={{ backgroundColor: 'var(--color-warning)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Container LG (1024px)</p>
        </Container>

        <Container maxWidth="xl" style={{ backgroundColor: 'var(--color-info)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: 0, textAlign: 'center' }}>Container XL (1200px)</p>
        </Container>
      </Stack>
    </div>
  )
};

// Stack Stories
export const StackDemo: StoryObj = {
  name: 'Stack - Flexible Layout',
  render: () => (
    <Container maxWidth="lg" style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Stack gap="xl">
        {/* Stack Vertical */}
        <Card style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Stack Vertical (Column)</h3>
          <Stack direction="column" gap="md">
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-alpha)', borderRadius: 'var(--radius-md)' }}>Item 1</div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-md)' }}>Item 2</div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-warning)', color: 'white', borderRadius: 'var(--radius-md)' }}>Item 3</div>
          </Stack>
        </Card>

        {/* Stack Horizontal */}
        <Card style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Stack Horizontal (Row)</h3>
          <Stack direction="row" gap="md" wrap>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-alpha)', borderRadius: 'var(--radius-md)' }}>Item 1</div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-md)' }}>Item 2</div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-warning)', color: 'white', borderRadius: 'var(--radius-md)' }}>Item 3</div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-info)', color: 'white', borderRadius: 'var(--radius-md)' }}>Item 4</div>
          </Stack>
        </Card>

        {/* Stack con diferentes justificaciones */}
        <Card style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Stack con Justificación</h3>
          <Stack gap="md">
            <Stack direction="row" justify="space-between" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span>Izquierda</span>
              <span>Derecha</span>
            </Stack>
            <Stack direction="row" justify="center" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span>Centro</span>
            </Stack>
            <Stack direction="row" justify="space-evenly" style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
};

// Grid Stories
export const GridDemo: StoryObj = {
  name: 'Grid - Responsive Grid',
  render: () => (
    <Container maxWidth="xl" style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Stack gap="xl">
        {/* Grid Auto-fit */}
        <div>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Grid Auto-fit (300px min)</h3>
          <Grid columns="auto-fit" minItemWidth="300px" gap="md">
            <Card style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>Pacientes</h4>
              <p style={{ margin: 'var(--space-2) 0 0 0', color: 'var(--color-text-muted)' }}>1,234 registros</p>
            </Card>
            <Card style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <h4 style={{ margin: 0, color: 'var(--color-success)' }}>Citas Hoy</h4>
              <p style={{ margin: 'var(--space-2) 0 0 0', color: 'var(--color-text-muted)' }}>45 programadas</p>
            </Card>
            <Card style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <h4 style={{ margin: 0, color: 'var(--color-warning)' }}>Doctores</h4>
              <p style={{ margin: 'var(--space-2) 0 0 0', color: 'var(--color-text-muted)' }}>28 activos</p>
            </Card>
            <Card style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <h4 style={{ margin: 0, color: 'var(--color-info)' }}>Enfermeras</h4>
              <p style={{ margin: 'var(--space-2) 0 0 0', color: 'var(--color-text-muted)' }}>42 activas</p>
            </Card>
          </Grid>
        </div>

        {/* Grid Fixed Columns */}
        <div>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Grid 3 Columnas Fijas</h3>
          <Grid columns={3} gap="lg">
            <Card style={{ padding: 'var(--space-6)' }}>
              <h4 style={{ margin: '0 0 var(--space-3) 0' }}>📊 Estadísticas</h4>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Reportes y métricas del hospital</p>
            </Card>
            <Card style={{ padding: 'var(--space-6)' }}>
              <h4 style={{ margin: '0 0 var(--space-3) 0' }}>👥 Personal</h4>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Gestión de profesionales médicos</p>
            </Card>
            <Card style={{ padding: 'var(--space-6)' }}>
              <h4 style={{ margin: '0 0 var(--space-3) 0' }}>🏥 Recursos</h4>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Inventario y equipamiento</p>
            </Card>
          </Grid>
        </div>

        {/* Grid con diferentes gaps */}
        <div>
          <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Grid con diferentes gaps</h3>
          <Stack gap="lg">
            <div>
              <h5 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--color-text-muted)' }}>Gap XS</h5>
              <Grid columns={4} gap="xs">
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-primary-alpha)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    {i}
                  </div>
                ))}
              </Grid>
            </div>
            <div>
              <h5 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--color-text-muted)' }}>Gap XL</h5>
              <Grid columns={4} gap="xl">
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ padding: 'var(--space-2)', backgroundColor: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    {i}
                  </div>
                ))}
              </Grid>
            </div>
          </Stack>
        </div>
      </Stack>
    </Container>
  )
};
