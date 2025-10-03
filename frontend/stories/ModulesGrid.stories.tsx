import type { Meta, StoryObj } from '@storybook/react';
import { ModulesGrid } from '@/components/modules/ModulesGrid';

const meta: Meta<typeof ModulesGrid> = {
  title: 'Hikari/ModulesGrid',
  component: ModulesGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Grid de módulos que cambia según el rol del usuario. Similar a sistemas como SIGEHOS, muestra diferentes módulos según si el usuario es administrador, doctor, enfermera o personal administrativo.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    userRole: {
      control: { type: 'select' },
      options: ['admin', 'doctor', 'nurse', 'staff'],
      description: 'Rol del usuario que determina qué módulos se muestran'
    },
    tenant: {
      control: 'text',
      description: 'Nombre del tenant/hospital para las URLs'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminView: Story = {
  args: {
    userRole: 'admin',
    tenant: 'demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista completa para administradores con todos los módulos disponibles incluyendo gestión de usuarios, configuración, reportes y auditoría.'
      }
    }
  }
};

export const DoctorView: Story = {
  args: {
    userRole: 'doctor',
    tenant: 'hospital'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista para doctores enfocada en módulos médicos: pacientes, agenda, profesionales, mis pacientes y prescripciones.'
      }
    }
  }
};

export const NurseView: Story = {
  args: {
    userRole: 'nurse',
    tenant: 'clinica'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista para enfermeras con módulos específicos: pacientes, agenda, profesionales, triaje, signos vitales y medicación.'
      }
    }
  }
};

export const StaffView: Story = {
  args: {
    userRole: 'staff',
    tenant: 'centro-salud'
  },
  parameters: {
    docs: {
      description: {
        story: 'Vista para personal administrativo con acceso limitado: pacientes, agenda y archivo físico.'
      }
    }
  }
};
