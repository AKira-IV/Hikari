'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api-client';
import { useAuth } from '@/components/providers/auth-context';
import type { LoginRequest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Form } from './Form';
import { FormEmailInput } from './FormEmailInput';
import { FormPasswordInput } from './FormPasswordInput';
import { FormTextInput } from './FormTextInput';
import { loginSchema, type LoginFormData } from './validation-schemas';

const recaptchaConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

export function LoginForm() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { login: setAuthUser } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setFormError(null);

    if (recaptchaConfigured && !executeRecaptcha) {
      setFormError('Captcha aún no está listo, por favor vuelve a intentar.');
      return;
    }

    let captchaToken = '';

    if (recaptchaConfigured && executeRecaptcha) {
      captchaToken = await executeRecaptcha('login');
    }

    try {
      const response = await login({ ...data, captchaToken });
      // Los tokens ya se almacenan automáticamente en api-client.ts
      // Actualizar el contexto de autenticación
      setAuthUser(response.user);
      router.push(`/${response.user.tenant.subdomain}/dashboard`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo iniciar sesión';
      setFormError(message);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
    >
      {({ isSubmitting }: { isSubmitting: boolean; errors: any }) => (
        <>
          {formError ? <Alert variant="danger">{formError}</Alert> : null}

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
        </>
      )}
    </Form>
  );
}
