'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { register as registerUser } from '@/lib/api-client';
import type { RegisterRequest } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface RegisterFormValues extends Omit<RegisterRequest, 'captchaToken'> {}

const recaptchaConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

export function RegisterForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      tenantSubdomain: 'demo',
    },
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    setSuccess(null);

    if (recaptchaConfigured && !executeRecaptcha) {
      setFormError('Captcha aún no está listo, por favor vuelve a intentar.');
      return;
    }

    let captchaToken = '';

    if (executeRecaptcha) {
      captchaToken = await executeRecaptcha('register');
    }

    try {
      await registerUser({ ...data, captchaToken });
      setSuccess('Cuenta creada correctamente. Revisa tu correo para activar el acceso.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo completar el registro';
      setFormError(message);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      {formError ? <Alert variant="error">{formError}</Alert> : null}
      {success ? <Alert variant="success">{success}</Alert> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor="firstName">
            Nombre
          </label>
          <Input id="firstName" placeholder="María" {...register('firstName', { required: true })} />
          {errors.firstName ? <p className="text-xs text-rose-400">Este campo es obligatorio</p> : null}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor="lastName">
            Apellido
          </label>
          <Input id="lastName" placeholder="García" {...register('lastName', { required: true })} />
          {errors.lastName ? <p className="text-xs text-rose-400">Este campo es obligatorio</p> : null}
        </div>
      </div>
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
        <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: true, minLength: 8 })} />
        {errors.password ? <p className="text-xs text-rose-400">Debes ingresar una contraseña segura</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor="tenant">
            Subdominio del tenant
          </label>
          <Input id="tenant" placeholder="demo" {...register('tenantSubdomain', { required: true, minLength: 2 })} />
          {errors.tenantSubdomain ? (
            <p className="text-xs text-rose-400">Indica el subdominio asignado a la organización</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor="phone">
            Teléfono (opcional)
          </label>
          <Input id="phone" placeholder="+52 123 456 7890" {...register('phone')} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200" htmlFor="address">
          Dirección (opcional)
        </label>
        <Input id="address" placeholder="Av. Principal 123, Ciudad" {...register('address')} />
      </div>
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>
    </form>
  );
}
