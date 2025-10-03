"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mainNavigation } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/components/providers/auth-context';
import { logout as apiLogout } from '@/lib/api-client';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
      logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      logout();
      window.location.href = '/';
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    
    // Si es ADMIN, mostrar "ADMIN"
    if (user.role?.toLowerCase() === 'admin') {
      return 'ADMIN';
    }
    
    // Si es profesional médico, mostrar su nombre
    if (user.role?.toLowerCase() === 'professional' || user.role?.toLowerCase() === 'doctor') {
      return `Dr. ${user.firstName} ${user.lastName}`;
    }
    
    // Para otros roles, mostrar nombre completo
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--color-border-light)',
      backgroundColor: 'var(--color-surface)',
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.3s ease',
      height: isScrolled ? '60px' : '80px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isScrolled ? 'var(--space-3) var(--space-6)' : 'var(--space-4) var(--space-6)',
        transition: 'padding 0.3s ease',
      }}>
        <Link href="/" style={{
          fontSize: isScrolled ? '1.25rem' : '1.5rem',
          fontWeight: '700',
          color: 'var(--color-primary)',
          textDecoration: 'none',
          fontFamily: 'var(--font-family-base)',
          transition: 'font-size 0.3s ease',
        }}>
          Hikari
        </Link>
        <nav style={{
          display: 'flex',
          gap: isScrolled ? 'var(--space-6)' : 'var(--space-8)',
          fontSize: isScrolled ? '0.9rem' : '0.95rem',
          color: 'var(--color-text)',
          transition: 'all 0.3s ease',
        }}>
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              style={{
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.15s ease',
                fontFamily: 'var(--font-family-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text)';
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--space-3)',
          transition: 'all 0.3s ease'
        }}>
          <ThemeToggle />
          {isAuthenticated && user ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-3)' 
            }}>
              <span style={{
                fontSize: isScrolled ? '0.85rem' : '0.9rem',
                fontWeight: '600',
                color: 'var(--color-primary)',
                padding: 'var(--space-2) var(--space-3)',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-primary)',
                transition: 'all 0.3s ease',
              }}>
                {getUserDisplayName()}
              </span>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                style={{ 
                  fontSize: isScrolled ? '0.85rem' : '0.9rem', 
                  padding: isScrolled ? 'var(--space-2) var(--space-3)' : 'var(--space-3) var(--space-4)',
                  transition: 'all 0.3s ease'
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="ghost" 
                  style={{ 
                    fontSize: isScrolled ? '0.85rem' : '0.95rem', 
                    padding: isScrolled ? 'var(--space-2) var(--space-3)' : 'var(--space-3) var(--space-4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="primary" 
                  style={{ 
                    fontSize: isScrolled ? '0.85rem' : '0.95rem', 
                    padding: isScrolled ? 'var(--space-2) var(--space-4)' : 'var(--space-3) var(--space-5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Crear cuenta
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
