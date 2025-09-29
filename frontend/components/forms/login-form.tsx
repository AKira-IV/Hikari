'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api-client';
import type { LoginRequest } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface LoginFormValues extends Omit<LoginRequest, 'captchaToken'> {}

const recaptchaConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

export function LoginForm() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      tenantSubdomain: 'demo',
    },
  });
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
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
      router.push(`/${response.user.tenant.subdomain}/dashboard`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo iniciar sesión';
      setFormError(message);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      {formError ? <Alert variant="error">{formError}</Alert> : null}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="email">
          Correo electrónico
        </label>
        <Input id="email" type="email" placeholder="admin@demo.com" {...register('email', { required: true })} />
        {errors.email ? <p className="text-xs text-rose-400">Este campo es obligatorio</p> : null}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="password">
          Contraseña
        </label>
        <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: true })} />
        {errors.password ? <p className="text-xs text-rose-400">Este campo es obligatorio</p> : null}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="tenant">
          Subdominio del tenant
        </label>
        <Input
          id="tenant"
          type="text"
          placeholder="demo"
          {...register('tenantSubdomain', { required: true, minLength: 2 })}
        />
        {errors.tenantSubdomain ? (
          <p className="text-xs text-rose-400">Indica el subdominio asignado a la organización</p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Verificando...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}
