'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Form, FormTextInput, FormEmailInput, FormPasswordInput } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Stack } from '@/components/ui/layout';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/feedback';

// Schema mejorado para el login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tenantSubdomain: z
    .string()
    .min(1, 'El tenant es requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginFormExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LoginFormData | null>(null);

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setResult(null);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setResult(data);
    console.log('Datos del formulario:', data);
  };

  return (
    <Card style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: 'var(--space-8)'
    }}>
      <Stack gap="lg">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: '0 0 var(--space-2) 0'
          }}>
            Iniciar Sesión
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            margin: 0
          }}>
            Accede al sistema hospitalario Hikari
          </p>
        </div>

        <Form
          defaultValues={{
            email: '',
            password: '',
            tenantSubdomain: 'demo'
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }: { isSubmitting: boolean; errors: any }) => (
            <Stack gap="md">
              <FormEmailInput
                name="email"
                label="Email"
                placeholder="tu@email.com"
              />

              <FormPasswordInput
                name="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
              />

              <FormTextInput
                name="tenantSubdomain"
                label="Tenant"
                placeholder="demo"
              />

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)'
                }}
              >
                {isSubmitting ? (
                  <>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              {/* Debug info */}
              {result && (
                <div style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-success)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}>
                  <strong>✅ Formulario enviado:</strong>
                  <pre style={{ margin: 'var(--space-2) 0 0 0', fontSize: '0.75rem' }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </Stack>
          )}
        </Form>
      </Stack>
    </Card>
  );
}
