import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from '@/components/ui/UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'Hikari/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de perfil de usuario personalizable basado en el diseño de la imagen de referencia, con soporte para diferentes roles médicos y colores específicos.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: { type: 'select' },
      options: ['admin', 'doctor', 'nurse', 'staff'],
      description: 'Rol del usuario que determina el color del anillo y el título'
    },
    name: {
      control: 'text',
      description: 'Nombre completo del usuario'
    },
    tenant: {
      control: 'text',
      description: 'Nombre del tenant/hospital'
    },
    department: {
      control: 'text',
      description: 'Departamento o área de trabajo'
    },
    specialty: {
      control: 'text',
      description: 'Especialidad médica (opcional)'
    },
    onFollow: {
      action: 'followed',
      description: 'Función llamada al hacer click en seguir'
    },
    isFollowing: {
      control: 'boolean',
      description: 'Estado de si ya está siguiendo al usuario'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Doctor: Story = {
  args: {
    name: 'Dr. Noah Thompson',
    role: 'doctor',
    tenant: 'Hospital Central',
    department: 'Cardiología',
    specialty: 'Cardiología Interventiva',
    stats: {
      likes: '72.9K',
      posts: '828',
      views: '342.9K'
    },
    onFollow: undefined,
    isFollowing: false
  }
};

export const DoctorWithFollow: Story = {
  args: {
    name: 'Dr. Noah Thompson',
    role: 'doctor',
    tenant: 'Hospital Central',
    department: 'Cardiología',
    specialty: 'Cardiología Interventiva',
    stats: {
      likes: '72.9K',
      posts: '828',
      views: '342.9K'
    },
    isFollowing: false
  }
};

export const DoctorFollowing: Story = {
  args: {
    name: 'Dr. Noah Thompson',
    role: 'doctor',
    tenant: 'Hospital Central',
    department: 'Cardiología',
    specialty: 'Cardiología Interventiva',
    stats: {
      likes: '72.9K',
      posts: '828',
      views: '342.9K'
    },
    isFollowing: true
  }
};

export const Admin: Story = {
  args: {
    name: 'Carlos Mendoza',
    role: 'admin',
    tenant: 'Hospital Central',
    department: 'Administración',
    stats: {
      likes: '45.2K',
      posts: '156',
      views: '128.7K'
    },
    isFollowing: false
  }
};

export const Nurse: Story = {
  args: {
    name: 'Enf. Ana López',
    role: 'nurse',
    tenant: 'Clínica San José',
    department: 'Urgencias',
    specialty: 'Enfermería de Emergencias',
    stats: {
      likes: '28.4K',
      posts: '342',
      views: '95.3K'
    },
    isFollowing: false
  }
};

export const Staff: Story = {
  args: {
    name: 'María Rodríguez',
    role: 'staff',
    tenant: 'Centro de Salud',
    department: 'Recepción',
    stats: {
      likes: '12.1K',
      posts: '89',
      views: '45.2K'
    },
    isFollowing: false
  }
};

export const WithoutStats: Story = {
  args: {
    name: 'Dr. José García',
    role: 'doctor',
    tenant: 'Hospital Regional',
    department: 'Medicina General',
    isFollowing: false
  }
};
