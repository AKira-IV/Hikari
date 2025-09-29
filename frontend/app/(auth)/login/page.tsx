import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { LoginForm } from '@/components/forms/login-form';

export const metadata = {
  title: 'Iniciar sesión | Hikari Cloud',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-lg">
        <CardHeader
          title="Bienvenido de nuevo"
          subtitle="Accede a tu tenant hospitalario con credenciales protegidas por reCAPTCHA."
        />
        <LoginForm />
        <CardFooter>
          <span className="text-slate-400">¿Sin cuenta?</span>
          <Link href="/register" className="text-sky-400 hover:text-sky-300">
            Crea una organización
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
