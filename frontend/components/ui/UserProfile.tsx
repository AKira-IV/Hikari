'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  tenant: string;
  department?: string;
  specialty?: string;
  avatar?: string;
  stats?: {
    likes?: string;
    posts?: string;
    views?: string;
  };
  onFollow?: () => void;
  isFollowing?: boolean;
}

const roleLabels = {
  admin: 'Administrador de',
  doctor: 'Dr.',
  nurse: 'Enf.',
  staff: 'Personal de'
};

const roleColors = {
  admin: 'var(--color-danger)',
  doctor: 'var(--color-primary)',
  nurse: 'var(--color-success)',
  staff: 'var(--color-warning)'
};

export function UserProfile({
  name,
  role,
  tenant,
  department,
  specialty,
  avatar,
  stats,
  onFollow,
  isFollowing = false
}: UserProfileProps) {
  const displayRole = role === 'admin'
    ? `${roleLabels[role]} ${tenant}`
    : `${roleLabels[role]} ${name}`;

  const displayLocation = department || tenant;
  const roleColor = roleColors[role];

  return (
    <Card style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      maxWidth: '320px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background sky */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 10px, transparent 11px),
          radial-gradient(circle at 60% 30%, rgba(255,255,255,0.6) 8px, transparent 9px),
          radial-gradient(circle at 80% 60%, rgba(255,255,255,0.7) 12px, transparent 13px)
        `,
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
      }} />

      {/* Follow/Add button */}
      <div style={{
        position: 'absolute',
        top: 'var(--space-4)',
        right: 'var(--space-4)',
        zIndex: 10
      }}>
        {onFollow ? (
          <Button
            variant={isFollowing ? "secondary" : "primary"}
            onClick={onFollow}
            style={{
              backgroundColor: isFollowing ? 'var(--color-surface)' : 'white',
              color: isFollowing ? 'var(--color-text)' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            {isFollowing ? 'Siguiendo' : 'Seguir'} {!isFollowing && '+'}
          </Button>
        ) : (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: 'var(--color-text)',
            cursor: 'pointer'
          }}>
            +
          </div>
        )}
      </div>

      {/* Avatar with role ring */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        marginTop: '60px',
        marginBottom: 'var(--space-4)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px'
        }}>
          {/* Role-colored ring */}
          <div style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            background: `conic-gradient(${roleColor}, ${roleColor}40, ${roleColor}, ${roleColor}40)`,
            padding: '3px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface)',
              padding: '3px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: avatar ? 'transparent' : '#8B5CF6',
                backgroundImage: avatar ? `url(${avatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: '600'
              }}>
                {!avatar && name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--space-6)'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-text)',
          margin: '0 0 var(--space-1) 0'
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: roleColor,
          fontWeight: '600',
          margin: '0 0 var(--space-1) 0'
        }}>
          {displayRole}
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          margin: 0
        }}>
          {specialty && `${specialty} • `}{displayLocation}
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-4) 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          {stats.likes && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--color-text)'
              }}>
                {stats.likes}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Likes
              </div>
            </div>
          )}
          {stats.posts && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--color-text)'
              }}>
                {stats.posts}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Posts
              </div>
            </div>
          )}
          {stats.views && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--color-text)'
              }}>
                {stats.views}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Views
              </div>
            </div>
          )}
        </div>
      )}

      {/* Social Links */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-6)'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          color: 'var(--color-text-muted)',
          cursor: 'pointer'
        }}>
          📱
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          color: 'var(--color-text-muted)',
          cursor: 'pointer'
        }}>
          ✉️
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          color: 'var(--color-text-muted)',
          cursor: 'pointer'
        }}>
          🌐
        </div>
      </div>
    </Card>
  );
}
