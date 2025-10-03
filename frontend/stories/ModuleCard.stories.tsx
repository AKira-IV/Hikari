import type { Meta, StoryObj } from '@storybook/react';
import { ModuleCard } from '@/components/modules/ModuleCard';

const meta: Meta<typeof ModuleCard> = {
  title: 'Hikari/ModuleCard',
  component: ModuleCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de módulo del sistema hospitalario. Cada módulo representa una funcionalidad específica como Pacientes, Agenda, etc. Incluye estados deshabilitados y badges para funcionalidades en desarrollo.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del módulo'
    },
    description: {
      control: 'text',
      description: 'Descripción de la funcionalidad del módulo'
    },
    icon: {
      control: 'text',
      description: 'Emoji o icono representativo'
    },
    href: {
      control: 'text',
      description: 'URL de destino del módulo'
    },
    bgColor: {
      control: 'color',
      description: 'Color de fondo de la tarjeta'
    },
    iconColor: {
      control: 'color',
      description: 'Color del área del icono'
    },
    disabled: {
      control: 'boolean',
      description: 'Si el módulo está deshabilitado (en desarrollo)'
    },
    badge: {
      control: 'text',
      description: 'Texto del badge (ej: "Próximo")'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Patients: Story = {
  args: {
    title: 'Pacientes',
    description: 'Gestión completa de historias clínicas y datos de pacientes',
    icon: '👥',
    href: '/demo/patients',
    iconColor: 'var(--color-primary)',
    bgColor: 'var(--color-primary-alpha)',
    disabled: false
  }
};

export const Appointments: Story = {
  args: {
    title: 'Agenda',
    description: 'Programación y gestión de citas médicas',
    icon: '📅',
    href: '/demo/appointments',
    iconColor: 'var(--color-success)',
    bgColor: 'rgba(163, 190, 140, 0.1)',
    disabled: false
  }
};

export const Professionals: Story = {
  args: {
    title: 'Profesionales',
    description: 'Administración de médicos, enfermeras y personal',
    icon: '👨‍⚕️',
    href: '/demo/professionals',
    iconColor: 'var(--color-info)',
    bgColor: 'rgba(139, 165, 202, 0.1)',
    disabled: false
  }
};

export const Users: Story = {
  args: {
    title: 'Usuarios',
    description: 'Gestión de cuentas y permisos del sistema',
    icon: '🔐',
    href: '/demo/users',
    iconColor: 'var(--color-warning)',
    bgColor: 'rgba(235, 203, 139, 0.1)',
    disabled: false
  }
};

export const ComingSoon: Story = {
  args: {
    title: 'Inventario',
    description: 'Control de medicamentos y suministros médicos',
    icon: '📦',
    href: '/demo/inventory',
    iconColor: 'var(--color-warning)',
    bgColor: 'rgba(235, 203, 139, 0.1)',
    disabled: true,
    badge: 'Próximo'
  }
};

export const DisabledModule: Story = {
  args: {
    title: 'Facturación',
    description: 'Sistema de facturación y gestión financiera',
    icon: '💰',
    href: '/demo/billing',
    iconColor: 'var(--color-success)',
    bgColor: 'rgba(163, 190, 140, 0.1)',
    disabled: true,
    badge: 'Q1 2025'
  }
};

export const Audit: Story = {
  args: {
    title: 'Auditoría',
    description: 'Logs de seguridad y auditoría de accesos',
    icon: '🔍',
    href: '/demo/audit',
    iconColor: 'var(--color-danger)',
    bgColor: 'rgba(208, 127, 143, 0.1)',
    disabled: false
  }
};
