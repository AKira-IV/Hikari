import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Programada',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Activo',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pendiente',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Cancelada',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    children: 'Pequeño',
  },
};

export const MedicalStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', color: 'var(--color-text)' }}>Estados de Pacientes:</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="success">Activo</Badge>
          <Badge variant="warning">En Tratamiento</Badge>
          <Badge variant="danger">Inactivo</Badge>
          <Badge variant="primary">Nuevo</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', color: 'var(--color-text)' }}>Estados de Citas:</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="primary">Programada</Badge>
          <Badge variant="success">Confirmada</Badge>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="danger">Cancelada</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', color: 'var(--color-text)' }}>Prioridades:</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="danger" size="sm">Urgente</Badge>
          <Badge variant="warning" size="sm">Alta</Badge>
          <Badge variant="primary" size="sm">Media</Badge>
          <Badge variant="default" size="sm">Baja</Badge>
        </div>
      </div>
    </div>
  ),
};
