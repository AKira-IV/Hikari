'use client';

import { ModulesGrid } from '@/components/modules/ModulesGrid';
import { UserProfile } from '@/components/ui/UserProfile';

interface DashboardPageProps {
  params: { tenant: string };
}

// Simulamos un usuario actual - en una app real esto vendría de la sesión/JWT
const getCurrentUser = (tenant: string) => {
  // Simular diferentes tipos de usuarios para demostración
  const users = {
    demo: {
      name: 'Dr. María García',
      role: 'doctor' as const,
      department: 'Cardiología',
      specialty: 'Cardiología Interventiva',
      stats: {
        likes: '72.9K',
        posts: '828',
        views: '342.9K'
      }
    },
    hospital: {
      name: 'Carlos Mendoza',
      role: 'admin' as const,
      department: 'Administración',
      stats: {
        likes: '45.2K',
        posts: '156',
        views: '128.7K'
      }
    },
    clinica: {
      name: 'Enf. Ana López',
      role: 'nurse' as const,
      department: 'Urgencias',
      specialty: 'Enfermería de Emergencias',
      stats: {
        likes: '28.4K',
        posts: '342',
        views: '95.3K'
      }
    }
  };

  return users[tenant as keyof typeof users] || users.demo;
};

export default function TenantDashboardPage({ params }: DashboardPageProps) {
  const { tenant } = params;
  const currentUser = getCurrentUser(tenant);

  return (
    <div style={{
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      backgroundColor: 'var(--color-background)',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--space-6)',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-subtle)',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--color-text-muted)',
              width: 'fit-content'
            }}>
              Tenant seleccionado
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0,
              textTransform: 'lowercase'
            }}>
              {tenant}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              fontSize: '1rem',
              color: 'var(--color-text-muted)'
            }}>
              <span>Resumen</span>
              <span>Pacientes</span>
              <span>Profesionales</span>
              <span>Agenda</span>
            </div>
          </div>

          {/* User Profile Card */}
          <div style={{ flexShrink: 0 }}>
            <UserProfile
              name={currentUser.name}
              role={currentUser.role}
              tenant={tenant}
              department={currentUser.department}
              specialty={'specialty' in currentUser ? currentUser.specialty : undefined}
              stats={currentUser.stats}
              onFollow={() => console.log('Follow clicked')}
              isFollowing={false}
            />
          </div>
        </div>

        <div style={{
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: '0 0 var(--space-2) 0'
          }}>
            Dashboard clínico
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
            margin: 0
          }}>
            Indicadores clave para <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{tenant}</span>.
            Integra tus fuentes de datos en esta vista con widgets configurables.
          </p>
        </div>
      </div>

      {/* Modules Section */}
      <div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: '0 0 var(--space-4) 0'
        }}>
          Módulos disponibles
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 var(--space-6) 0'
        }}>
          Accede a las funcionalidades del sistema según tu rol de {' '}
          <span style={{
            fontWeight: '600',
            color: currentUser.role === 'admin' ? 'var(--color-danger)' :
                  currentUser.role === 'doctor' ? 'var(--color-primary)' :
                  currentUser.role === 'nurse' ? 'var(--color-success)' : 'var(--color-warning)'
          }}>
            {currentUser.role === 'admin' ? 'Administrador' :
             currentUser.role === 'doctor' ? 'Doctor' :
             currentUser.role === 'nurse' ? 'Enfermera' : 'Personal'}
          </span>
        </p>

        <ModulesGrid userRole={currentUser.role} tenant={tenant} />
      </div>
    </div>
  );
}
