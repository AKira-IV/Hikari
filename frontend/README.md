# Hikari Frontend (Next.js 14)

Aplicación frontend basada en Next.js 14 (App Router) y TypeScript para la plataforma Hikari.

## Scripts disponibles

```bash
npm run dev         # Ejecuta el entorno de desarrollo en http://localhost:3001
npm run build       # Compila la aplicación para producción
npm run start       # Arranca la app en modo producción (requiere build previo)
npm run lint        # Ejecuta "next lint"
npm run type-check  # Valida los tipos con TypeScript
```

> **Nota:** Define `NEXT_PUBLIC_API_BASE_URL` para apuntar al backend (por defecto `http://localhost:3000`). Para habilitar reCAPTCHA v3 configura `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` e incluye la clave secreta en el backend.

## Arquitectura breve

- `app/` contiene el enrutamiento con App Router (grupos `(auth)` y `(tenants)`).
- `components/` aloja el design system básico, formularios y providers (p. ej. reCAPTCHA).
- `lib/` expone el cliente HTTP y tipos compartidos.
- `config/site.ts` centraliza navegación y valores por defecto (API base, tenant demo).

El formulario de login y registro ejecuta reCAPTCHA v3 antes de enviar credenciales al backend NestJS.
