# Hikari - Sistema de Gestión Hospitalaria

**Hikari** es una plataforma hospitalaria multi-tenant de código abierto. El objetivo es ofrecer a hospitales y clínicas —desde centros rurales hasta redes gubernamentales— una base tecnológica moderna, segura y extensible, sin barreras de licenciamiento.

---

## Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Características Clave](#características-clave)
3. [Arquitectura y Stack](#arquitectura-y-stack)
4. [Primeros Pasos](#primeros-pasos)
   - [Instalación con Docker (recomendado)](#instalación-con-docker-recomendado)
   - [Instalación manual para desarrollo](#instalación-manual-para-desarrollo)
5. [Variables de Entorno](#variables-de-entorno)
6. [Verificación Local antes del Push](#verificación-local-antes-del-push)
7. [CI/CD y Despliegue](#cicd-y-despliegue)
8. [Estructura del Proyecto](#estructura-del-proyecto)
9. [Roadmap Resumido](#roadmap-resumido)
10. [Contribuir](#contribuir)
11. [Licencia](#licencia)

---

## Visión General
- **Modelo multi-tenant**: cada institución se aísla por completo (subdominios, configuraciones y datos separados).
- **Seguridad avanzada**: guards y middleware alineados con OWASP, auditoría y rate limiting.
- **Productividad**: API documentada con Swagger, seeds demo y scripts de automatización.
- **Evolutivo**: código modular listo para incorporar una arquitectura hexagonal y módulos enchufables.

## Características Clave
### Módulos actuales
- Autenticación con JWT + refresh tokens y reCAPTCHA v3.
- Gestión de usuarios con control de roles (admin, doctor, nurse, receptionist, patient).
- Entidades base de multi-tenancy (Tenant, User) y servicios comunes de seguridad.
- Seeds preconfigurados (demo tenant + usuarios) para un arranque inmediato.

### Roles soportados
| Rol              | Descripción                                                       |
|------------------|-------------------------------------------------------------------|
| **ADMIN**        | Gestión completa del tenant, configuración y usuarios.            |
| **DOCTOR**       | Acceso a información clínica y agenda de pacientes.               |
| **NURSE**        | Operaciones de seguimiento y registros de enfermería.             |
| **RECEPTIONIST** | Gestión de citas y recepción de pacientes.                        |
| **PATIENT**      | Acceso restringido a su propia información.                       |

## Arquitectura y Stack
- **Backend**: [NestJS](https://nestjs.com/) + TypeScript, TypeORM, PostgreSQL 15+, Jest, Swagger, Passport.
- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router) + TypeScript, React Hook Form, Tailwind CSS.
- **Infraestructura**: Docker/Docker Compose, GitHub Actions, scripts Makefile.
- **Seguridad**: Helmet, CORS, rate limiting, sanitización, validaciones personalizadas, auditoría.

## Primeros Pasos
### Prerrequisitos
`
Node.js >= 18
npm >= 8
PostgreSQL >= 14 (si instalas manualmente)
Docker >= 24 y Docker Compose (recomendado)
`

### Instalación con Docker (recomendado)
`ash
# 1. Clonar repositorio
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari

# 2. Configurar variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edita los valores según tu entorno

# 3. Levantar entorno completo
docker compose -f docker-compose.dev.yml up -d

# 4. Seeds de datos demo
cd backend
npm run seed
`
Servicios expuestos:
- Backend API: http://localhost:3000
- Swagger UI: http://localhost:3000/api
- Frontend (Next.js): http://localhost:3001
- PostgreSQL (contenedor db-dev): 5432
- Adminer: http://localhost:8080

### Instalación manual para desarrollo
`bash
# Backend
cd backend
npm install
cp .env.example .env
# Ajusta credenciales de PostgreSQL
npm run start:dev

# Seeds (opcional)
npm run seed

# Frontend
cd ../frontend
npm install
cp .env.example .env.local
npm run dev -- --port 3001
`

## Variables de Entorno
### Backend (backend/.env)
`
# Base de datos
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=hikari_user
DATABASE_PASSWORD=hikari_password
DATABASE_NAME=hikari

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# App
NODE_ENV=development
PORT=3000

# Captcha
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=your-recaptcha-secret
RECAPTCHA_MIN_SCORE=0.5
`

### Frontend (frontend/.env.local)
`
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
`

## Verificación Local antes del Push
Ejecuta make ci-check para replicar los pasos principales que corre GitHub Actions:
1. Lint, unit tests y build del backend.
2. Lint, type-check y build del frontend.
3. (Opcional) Build de imágenes Docker de backend y frontend.

Variables útiles:
- CI_FORCE_NPM_CI=1 make ci-check fuerza
pm ci.
- SKIP_E2E=1 make ci-check omite los tests e2e (requieren db-dev levantado).
- SKIP_DOCKER_BUILDS=1 make ci-check salta los builds Docker.

> Para ejecutar e2e localmente, levanta PostgreSQL: docker compose -f docker-compose.dev.yml up -d db-dev.

## CI/CD y Despliegue
- Workflow principal: .github/workflows/ci-cd.yml.
  - Run Tests: lint + unit + e2e + coverage del backend.
  - Build Application: builds de backend y frontend (artefactos).
  - Build and Test Docker Images: construye imágenes locales.
  - Security Scan:
pm audit + Snyk (opcional si se configura SNYK_TOKEN).
  - Deploy to Staging: se ejecuta en pushes a develop (placeholder, agrega tus scripts reales).
  - Deploy to Production: se ejecuta en pushes a main (placeholder).
- Otros workflows: quick-test.yml (validación rápida en la rama dev) y docker.yml (build/push a GHCR).

## Estructura del Proyecto
`
Hikari/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── patients/
│   │   ├── appointments/
│   │   ├── professionals/
│   │   └── common/
│   ├── test/                # Pruebas (unitarias y e2e)
│   └── Dockerfile           # Build productivo backend
├── frontend/                # Aplicación Next.js 14
│   ├── app/                 # Rutas (App Router)
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── Dockerfile           # Build productivo frontend
├── docker-compose.dev.yml   # Stack de desarrollo
├── docker-compose.yml       # Stack productivo base
├── scripts/run-ci-checks.sh # Script local para emular CI
├── Makefile                 # Comandos de automatización
└── .github/workflows/       # Pipelines CI/CD
`

## Roadmap Resumido
- [x] Autenticación, multi-tenant, seeds demo.
- [x] Migración del frontend a Next.js con reCAPTCHA.
- [ ] Completar módulos de Pacientes, Profesionales y Citas.
- [ ] Implementar arquitectura hexagonal modular.
- [ ] Integraciones externas (facturación, telemedicina, etc.).
- [ ] Observabilidad avanzada y backups automatizados.

## Contribuir
1. Haz un fork del repositorio.
2. Crea una rama (git checkout -b feature/nueva-funcionalidad).
3. Ejecuta make ci-check antes de commitear.
4. Realiza commits siguiendo Conventional Commits.
5. Abre un Pull Request describiendo los cambios.

### Estándares
- Linting obligatorio (
pm run lint).
- Cobertura mínima sugerida: 80 % (revisa
pm run test:cov).
- Documenta configuraciones o scripts nuevos en el README o en la wiki.

## Licencia
Hikari se distribuye bajo la licencia [MIT](LICENSE). Puedes usarlo, modificarlo y distribuirlo libremente siempre que conserves la atribución correspondiente.

---

## English version (summary)
Hikari is an open-source, multi-tenant hospital information system built with NestJS (backend) and Next.js (frontend). It provides secure authentication, tenant isolation, demo seeds, CI/CD pipelines, and Docker-based deployments. To get started, clone the repository, configure .env files, and run docker compose -f docker-compose.dev.yml up -d. Use make ci-check to mirror the GitHub Actions pipeline locally. Contributions are welcome via pull requests following Conventional Commits. Licensed under MIT.
