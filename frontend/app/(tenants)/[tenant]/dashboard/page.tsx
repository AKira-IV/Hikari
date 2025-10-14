'use client';

import { ModulesGrid } from '@/components/modules/ModulesGrid';
import { UserProfile } from '@/components/ui/UserProfile';
import { useAuth } from '@/components/providers/auth-context';

interface DashboardPageProps {
  params: { tenant: string };
}

// Función para generar datos de perfil basados en el rol
const generateProfileData = (user: any, tenant: string) => {
  const baseStats = {
    likes: Math.floor(Math.random() * 100) + 'K',
    posts: (Math.floor(Math.random() * 900) + 100).toString(),
    views: Math.floor(Math.random() * 500) + 50 + 'K'
  };

  switch (user.role?.toLowerCase()) {
    case 'admin':
      return {
        name: `${user.firstName} ${user.lastName}`,
        role: 'admin' as const,
        department: 'Administración',
        specialty: 'Gestión y Supervisión',
        stats: baseStats
      };
    case 'doctor':
      return {
        name: `Dr. ${user.firstName} ${user.lastName}`,
        role: 'doctor' as const,
        department: 'Medicina General', // En un futuro esto vendría de la BD
        specialty: 'Medicina Interna', // En un futuro esto vendría de la BD
        stats: baseStats
      };
    case 'nurse':
      return {
        name: `Enf. ${user.firstName} ${user.lastName}`,
        role: 'nurse' as const,
        department: 'Enfermería',
        specialty: 'Cuidados Generales',
        stats: baseStats
      };
    default:
      return {
        name: `${user.firstName} ${user.lastName}`,
        role: 'staff' as const,
        department: 'Personal',
        specialty: 'Soporte',
        stats: baseStats
      };
  }
};

export default function TenantDashboardPage({ params }: DashboardPageProps) {
  const { tenant } = params;
  const { user, isLoading } = useAuth();
  
  // Si está cargando o no hay usuario, mostrar un estado de carga
  if (isLoading || !user) {
    return (
      <div style={{
        padding: 'var(--space-8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  const currentUser = generateProfileData(user, tenant);
  const shouldShowProfile = user.role?.toLowerCase() === 'doctor' || user.role?.toLowerCase() === 'nurse';

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
              Centro de Salud Seleccionado
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-base)',
              margin: 0,
              textTransform: 'capitalize'
            }}>
              {user.tenant.name}
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

          {/* User Profile Card - Solo para profesionales de salud */}
          {shouldShowProfile && (
            <div style={{ flexShrink: 0 }}>
              <UserProfile
                name={currentUser.name}
                role={currentUser.role}
                tenant={user.tenant.name}
                department={currentUser.department}
                specialty={'specialty' in currentUser ? currentUser.specialty : undefined}
                stats={currentUser.stats}
                onFollow={() => console.log('Follow clicked')}
                isFollowing={false}
              />
            </div>
          )}
          
          {/* Admin Profile Card - Solo para administradores */}
          {user.role?.toLowerCase() === 'admin' && (
            <div style={{ flexShrink: 0 }}>
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                maxWidth: '320px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-danger)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: '600',
                  margin: '0 auto var(--space-4) auto'
                }}>
                  👨‍💼
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  margin: '0 0 var(--space-1) 0'
                }}>
                  {user.firstName} {user.lastName}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-danger)',
                  fontWeight: '600',
                  margin: '0 0 var(--space-1) 0'
                }}>
                  Administrador
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 var(--space-4) 0'
                }}>
                  {user.tenant.name}
                </p>
                <div style={{
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--color-danger-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  color: 'var(--color-danger-dark)'
                }}>
                  🛡️ Acceso total al sistema
                </div>
              </div>
            </div>
          )}
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
            Indicadores clave para <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{user.tenant.name}</span>.
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
