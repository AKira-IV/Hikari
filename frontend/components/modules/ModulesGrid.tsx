'use client';

import { ModuleCard } from './ModuleCard';

interface ModuleConfig {
  title: string;
  description: string;
  icon: string;
  href: string;
  iconColor: string;
  bgColor: string;
  disabled?: boolean;
  badge?: string;
}

interface ModulesGridProps {
  userRole: 'admin' | 'doctor' | 'nurse' | 'staff';
  tenant: string;
}

export function ModulesGrid({ userRole, tenant }: ModulesGridProps) {
  const baseModules: ModuleConfig[] = [
    {
      title: 'Pacientes',
      description: 'Gestión completa de historias clínicas y datos de pacientes',
      icon: '👥',
      href: `/${tenant}/patients`,
      iconColor: 'var(--color-primary)',
      bgColor: 'var(--color-primary-alpha)'
    },
    {
      title: 'Agenda',
      description: 'Programación y gestión de citas médicas',
      icon: '📅',
      href: `/${tenant}/appointments`,
      iconColor: 'var(--color-success)',
      bgColor: 'rgba(163, 190, 140, 0.1)'
    },
    {
      title: 'Profesionales',
      description: 'Administración de médicos, enfermeras y personal',
      icon: '👨‍⚕️',
      href: `/${tenant}/professionals`,
      iconColor: 'var(--color-info)',
      bgColor: 'rgba(139, 165, 202, 0.1)'
    }
  ];

  const adminModules: ModuleConfig[] = [
    ...baseModules,
    {
      title: 'Usuarios',
      description: 'Gestión de cuentas y permisos del sistema',
      icon: '🔐',
      href: `/${tenant}/users`,
      iconColor: 'var(--color-warning)',
      bgColor: 'rgba(235, 203, 139, 0.1)'
    },
    {
      title: 'Configuración',
      description: 'Configuración general del hospital/clínica',
      icon: '⚙️',
      href: `/${tenant}/settings`,
      iconColor: 'var(--color-text-muted)',
      bgColor: 'var(--color-surface-subtle)'
    },
    {
      title: 'Reportes',
      description: 'Estadísticas y reportes del sistema',
      icon: '📊',
      href: `/${tenant}/reports`,
      iconColor: 'var(--color-primary)',
      bgColor: 'var(--color-primary-alpha)'
    },
    {
      title: 'Auditoría',
      description: 'Logs de seguridad y auditoría de accesos',
      icon: '🔍',
      href: `/${tenant}/audit`,
      iconColor: 'var(--color-danger)',
      bgColor: 'rgba(208, 127, 143, 0.1)'
    },
    {
      title: 'Inventario',
      description: 'Control de medicamentos y suministros médicos',
      icon: '📦',
      href: `/${tenant}/inventory`,
      iconColor: 'var(--color-warning)',
      bgColor: 'rgba(235, 203, 139, 0.1)',
      disabled: true,
      badge: 'Próximo'
    },
    {
      title: 'Facturación',
      description: 'Sistema de facturación y gestión financiera',
      icon: '💰',
      href: `/${tenant}/billing`,
      iconColor: 'var(--color-success)',
      bgColor: 'rgba(163, 190, 140, 0.1)',
      disabled: true,
      badge: 'Próximo'
    }
  ];

  const doctorModules: ModuleConfig[] = [
    ...baseModules,
    {
      title: 'Mis Pacientes',
      description: 'Pacientes asignados a mi consulta',
      icon: '🩺',
      href: `/${tenant}/my-patients`,
      iconColor: 'var(--color-primary)',
      bgColor: 'var(--color-primary-alpha)'
    },
    {
      title: 'Prescripciones',
      description: 'Gestión de recetas y medicamentos',
      icon: '💊',
      href: `/${tenant}/prescriptions`,
      iconColor: 'var(--color-info)',
      bgColor: 'rgba(139, 165, 202, 0.1)',
      disabled: true,
      badge: 'Próximo'
    },
    {
      title: 'Resultados Lab',
      description: 'Consulta de resultados de laboratorio',
      icon: '🧪',
      href: `/${tenant}/lab-results`,
      iconColor: 'var(--color-warning)',
      bgColor: 'rgba(235, 203, 139, 0.1)',
      disabled: true,
      badge: 'Próximo'
    }
  ];

  const nurseModules: ModuleConfig[] = [
    ...baseModules,
    {
      title: 'Triaje',
      description: 'Clasificación y priorización de pacientes',
      icon: '🚨',
      href: `/${tenant}/triage`,
      iconColor: 'var(--color-danger)',
      bgColor: 'rgba(208, 127, 143, 0.1)',
      disabled: true,
      badge: 'Próximo'
    },
    {
      title: 'Signos Vitales',
      description: 'Registro de constantes vitales',
      icon: '🩺',
      href: `/${tenant}/vital-signs`,
      iconColor: 'var(--color-success)',
      bgColor: 'rgba(163, 190, 140, 0.1)',
      disabled: true,
      badge: 'Próximo'
    },
    {
      title: 'Medicación',
      description: 'Administración de medicamentos',
      icon: '💉',
      href: `/${tenant}/medication`,
      iconColor: 'var(--color-info)',
      bgColor: 'rgba(139, 165, 202, 0.1)',
      disabled: true,
      badge: 'Próximo'
    }
  ];

  const staffModules: ModuleConfig[] = [
    {
      title: 'Pacientes',
      description: 'Registro y consulta de datos de pacientes',
      icon: '👥',
      href: `/${tenant}/patients`,
      iconColor: 'var(--color-primary)',
      bgColor: 'var(--color-primary-alpha)'
    },
    {
      title: 'Agenda',
      description: 'Consulta de citas programadas',
      icon: '📅',
      href: `/${tenant}/appointments`,
      iconColor: 'var(--color-success)',
      bgColor: 'rgba(163, 190, 140, 0.1)'
    },
    {
      title: 'Archivo',
      description: 'Gestión de historias clínicas físicas',
      icon: '📁',
      href: `/${tenant}/archive`,
      iconColor: 'var(--color-warning)',
      bgColor: 'rgba(235, 203, 139, 0.1)',
      disabled: true,
      badge: 'Próximo'
    }
  ];

  const getModulesByRole = () => {
    switch (userRole) {
      case 'admin':
        return adminModules;
      case 'doctor':
        return doctorModules;
      case 'nurse':
        return nurseModules;
      case 'staff':
        return staffModules;
      default:
        return baseModules;
    }
  };

  const modules = getModulesByRole();

  return (
    <div style={{
      display: 'grid',
      gap: 'var(--space-4)',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      marginTop: 'var(--space-6)'
    }}>
      {modules.map((module, index) => (
        <ModuleCard
          key={index}
          title={module.title}
          description={module.description}
          icon={module.icon}
          href={module.href}
          iconColor={module.iconColor}
          bgColor={module.bgColor}
          disabled={module.disabled}
          badge={module.badge}
        />
      ))}
    </div>
  );
}
