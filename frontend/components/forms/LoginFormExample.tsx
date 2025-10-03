'use client';

import React from 'react';
import { Form } from './Form';
import { FormEmailInput } from './FormEmailInput';
import { FormPasswordInput } from './FormPasswordInput';
import { FormTextInput } from './FormTextInput';
import { Button } from '@/components/ui/button';
import type { LoginFormData } from './validation-schemas';

export function LoginFormExample() {
  const handleSubmit = async (data: LoginFormData) => {
    console.log('Form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '400px' }}>
          <FormEmailInput
            name="email"
            label="Correo electrónico"
            placeholder="tu@email.com"
          />

          <FormPasswordInput
            name="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
          />

          <FormTextInput
            name="tenantSubdomain"
            label="Organización"
            placeholder="mi-hospital"
            minLength={2}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            style={{
              marginTop: 'var(--space-2)',
              fontSize: '1rem',
              padding: 'var(--space-5)',
            }}
          >
            {isSubmitting ? 'Verificando...' : 'Iniciar sesión'}
          </Button>
        </div>
      )}
    </Form>
  );
}
