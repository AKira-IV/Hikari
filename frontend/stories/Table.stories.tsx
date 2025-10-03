import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Dr. Ana García</TableCell>
          <TableCell>ana.garcia@hospital.com</TableCell>
          <TableCell>Cardióloga</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dr. Carlos López</TableCell>
          <TableCell>carlos.lopez@hospital.com</TableCell>
          <TableCell>Neurólogo</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const PatientsTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paciente</TableHead>
          <TableHead>DNI</TableHead>
          <TableHead>Próxima Cita</TableHead>
          <TableHead align="center">Estado</TableHead>
          <TableHead align="right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>María González</TableCell>
          <TableCell>12.345.678</TableCell>
          <TableCell>15/10/2025 10:30</TableCell>
          <TableCell align="center">
            <Badge variant="success">Activo</Badge>
          </TableCell>
          <TableCell align="right">
            <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
              Ver
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Juan Pérez</TableCell>
          <TableCell>87.654.321</TableCell>
          <TableCell>16/10/2025 14:00</TableCell>
          <TableCell align="center">
            <Badge variant="warning">Pendiente</Badge>
          </TableCell>
          <TableCell align="right">
            <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
              Ver
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ana Martínez</TableCell>
          <TableCell>11.222.333</TableCell>
          <TableCell>-</TableCell>
          <TableCell align="center">
            <Badge variant="danger">Inactivo</Badge>
          </TableCell>
          <TableCell align="right">
            <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
              Ver
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const AppointmentsTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha/Hora</TableHead>
          <TableHead>Paciente</TableHead>
          <TableHead>Profesional</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead align="center">Estado</TableHead>
          <TableHead align="right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow onClick={() => console.log('Cita clicked')}>
          <TableCell>15/10/2025 10:30</TableCell>
          <TableCell>María González</TableCell>
          <TableCell>Dr. Ana García</TableCell>
          <TableCell>Control Cardiológico</TableCell>
          <TableCell align="center">
            <Badge variant="primary">Programada</Badge>
          </TableCell>
          <TableCell align="right">
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                Editar
              </Button>
              <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                Cancelar
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow onClick={() => console.log('Cita clicked')}>
          <TableCell>15/10/2025 14:00</TableCell>
          <TableCell>Juan Pérez</TableCell>
          <TableCell>Dr. Carlos López</TableCell>
          <TableCell>Consulta Neurológica</TableCell>
          <TableCell align="center">
            <Badge variant="success">Confirmada</Badge>
          </TableCell>
          <TableCell align="right">
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                Editar
              </Button>
              <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>
                Cancelar
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SortableTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable onSort={() => console.log('Sort by name')}>
            Nombre
          </TableHead>
          <TableHead sortable onSort={() => console.log('Sort by date')}>
            Fecha Nacimiento
          </TableHead>
          <TableHead sortable onSort={() => console.log('Sort by visits')}>
            Visitas
          </TableHead>
          <TableHead align="center">Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ana Martínez</TableCell>
          <TableCell>15/03/1980</TableCell>
          <TableCell>12</TableCell>
          <TableCell align="center">
            <Badge variant="success">Activo</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carlos Ruiz</TableCell>
          <TableCell>22/07/1975</TableCell>
          <TableCell>8</TableCell>
          <TableCell align="center">
            <Badge variant="warning">Pendiente</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
