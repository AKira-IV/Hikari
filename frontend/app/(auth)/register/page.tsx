'use client';

import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl">
        <CardHeader
          title="Crea una instancia"
          subtitle="Registra el tenant inicial de tu organización y comienza a configurar módulos clínicos."
        />
        <RegisterForm />
        <CardFooter>
          <span className="text-slate-400">¿Ya tienes acceso?</span>
          <Link href="/login" className="text-sky-400 hover:text-sky-300">
            Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
