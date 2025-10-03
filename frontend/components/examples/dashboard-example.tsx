import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DashboardStatsProps {
  title: string;
  value: string | number;
  change?: string;
  variant?: "success" | "warning" | "danger";
}

function DashboardStat({ title, value, change, variant }: DashboardStatsProps) {
  return (
    <Card>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '0.9rem',
          fontWeight: '500',
          color: 'var(--color-text-muted)',
          margin: '0 0 8px 0'
        }}>
          {title}
        </h3>
        <div style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--color-text)',
          margin: '0 0 4px 0'
        }}>
          {value}
        </div>
        {change && (
          <Badge variant={variant} size="sm">
            {change}
          </Badge>
        )}
      </div>
    </Card>
  );
}

export function DashboardExample() {
  return (
    <div style={{
      padding: 'var(--space-5)',
      backgroundColor: 'var(--color-background)',
      minHeight: '100vh',
      fontFamily: 'var(--font-family-base)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--color-text)',
          margin: '0 0 8px 0'
        }}>
          Dashboard Médico
        </h1>
        <p style={{
          color: 'var(--color-text-muted)',
          margin: '0',
          fontSize: '1rem'
        }}>
          Resumen general del sistema hospitalario
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)'
      }}>
        <DashboardStat
          title="Pacientes Activos"
          value="1,247"
          change="+12%"
          variant="success"
        />
        <DashboardStat
          title="Citas Hoy"
          value="87"
          change="+5%"
          variant="success"
        />
        <DashboardStat
          title="Citas Pendientes"
          value="23"
          change="-8%"
          variant="warning"
        />
        <DashboardStat
          title="Profesionales Disponibles"
          value="34"
          change="0%"
          variant="success"
        />
      </div>

      {/* Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-6)'
      }}>
        {/* Recent Appointments */}
        <Card>
          <CardHeader
            title="Próximas Citas"
            subtitle="Citas programadas para hoy"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Profesional</TableHead>
                <TableHead align="center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow onClick={() => console.log('Ver cita')}>
                <TableCell>09:00</TableCell>
                <TableCell>María González</TableCell>
                <TableCell>Dr. Ana García</TableCell>
                <TableCell align="center">
                  <Badge variant="success">Confirmada</Badge>
                </TableCell>
              </TableRow>
              <TableRow onClick={() => console.log('Ver cita')}>
                <TableCell>10:30</TableCell>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>Dr. Carlos López</TableCell>
                <TableCell align="center">
                  <Badge variant="primary">Programada</Badge>
                </TableCell>
              </TableRow>
              <TableRow onClick={() => console.log('Ver cita')}>
                <TableCell>14:00</TableCell>
                <TableCell>Ana Martínez</TableCell>
                <TableCell>Dra. Laura Sánchez</TableCell>
                <TableCell align="center">
                  <Badge variant="warning">Pendiente</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader
            title="Acciones Rápidas"
            subtitle="Tareas más frecuentes"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Button variant="primary" fullWidth>
              Nueva Cita
            </Button>
            <Button variant="secondary" fullWidth>
              Registrar Paciente
            </Button>
            <Button variant="secondary" fullWidth>
              Ver Agenda
            </Button>
            <Button variant="ghost" fullWidth>
              Generar Reporte
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader
          title="Pacientes Recientes"
          subtitle="Últimos pacientes registrados o actualizados"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead>Profesional Asignado</TableHead>
              <TableHead align="center">Estado</TableHead>
              <TableHead align="right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow onClick={() => console.log('Ver paciente')}>
              <TableCell>Roberto Silva</TableCell>
              <TableCell>45.678.912</TableCell>
              <TableCell>10/10/2025</TableCell>
              <TableCell>Dr. Ana García</TableCell>
              <TableCell align="center">
                <Badge variant="success">Activo</Badge>
              </TableCell>
              <TableCell align="right">
                <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                  Ver Historial
                </Button>
              </TableCell>
            </TableRow>
            <TableRow onClick={() => console.log('Ver paciente')}>
              <TableCell>Carmen López</TableCell>
              <TableCell>33.445.567</TableCell>
              <TableCell>08/10/2025</TableCell>
              <TableCell>Dr. Carlos López</TableCell>
              <TableCell align="center">
                <Badge variant="warning">En Tratamiento</Badge>
              </TableCell>
              <TableCell align="right">
                <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                  Ver Historial
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
