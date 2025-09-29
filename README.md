# Hikari

**Sistema de Gestión Hospitalaria de Código Libre**

[English](#english-version) | [Español](#versión-en-español)

---

## Versión en Español

### Misión del Proyecto

Hikari es un sistema de gestión hospitalaria de código abierto diseñado para democratizar el acceso a tecnología médica de calidad. Nuestro objetivo es eliminar las barreras económicas que impiden a hospitales y clínicas de recursos limitados acceder a sistemas de gestión modernos y eficientes.

### Filosofía de Software Libre

- **Acceso Universal**: Disponible gratuitamente para cualquier institución médica
- **Código Abierto**: Transparencia total en el desarrollo y funcionamiento
- **Comunidad Colaborativa**: Desarrollo impulsado por la comunidad médica global
- **Sin Restricciones**: Libertad para usar, modificar y distribuir
- **Sostenible**: Modelo de desarrollo que garantiza continuidad a largo plazo

### Arquitectura del Sistema

#### Stack Tecnológico

**Backend (API REST)**
- **Framework**: NestJS con TypeScript
- **Base de Datos**: PostgreSQL 15+ con TypeORM
- **Autenticación**: JWT con refresh tokens
- **Documentación**: OpenAPI/Swagger automático
- **Testing**: Jest con cobertura completa
- **Seguridad**: Helmet, CORS, rate limiting

**Frontend (Interfaz Web)**
- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript con tipado estricto
- **Estilos**: Tailwind CSS + Radix UI
- **Validación**: React Hook Form + Zod
- **Estado**: Zustand para manejo de estado
- **Seguridad**: reCAPTCHA v3 integrado

**Infraestructura y DevOps**
- **Containerización**: Docker + Docker Compose
- **CI/CD**: GitHub Actions con pipelines automatizados
- **Monitoreo**: Health checks y logging estructurado
- **Escalabilidad**: Arquitectura multi-tenant nativa

### Funcionalidades Principales

#### Sistema Multi-Tenant
- **Aislamiento Completo**: Cada institución tiene datos completamente separados
- **Subdominios Personalizados**: URLs únicas por hospital/clínica
- **Configuración Independiente**: Cada tenant puede personalizar su experiencia
- **Escalabilidad Horizontal**: Arquitectura preparada para crecer

#### Gestión de Usuarios y Roles
- **ADMIN**: Administrador completo del tenant con todos los permisos
- **DOCTOR**: Profesional médico con acceso a historiales y diagnósticos
- **NURSE**: Personal de enfermería con permisos específicos de atención
- **RECEPTIONIST**: Personal de recepción y gestión de citas
- **PATIENT**: Paciente con acceso limitado a su información personal

#### Módulos Operativos
- **Autenticación y Autorización**: Sistema seguro basado en JWT
- **Gestión de Pacientes**: Registro completo con historial médico
- **Sistema de Citas**: Programación inteligente de consultas
- **Gestión de Personal**: Administración de profesionales médicos
- **Reportes y Estadísticas**: Dashboard con métricas relevantes

### Instalación y Configuración

#### Prerrequisitos del Sistema
```bash
# Versiones mínimas requeridas
Node.js >= 18.0.0
npm >= 8.0.0
PostgreSQL >= 14.0
Docker >= 24.0.0 (opcional pero recomendado)
```

#### Instalación con Docker (Recomendado)

**1. Clonar el Repositorio**
```bash
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari
```

**2. Configuración de Entorno**
```bash
# Copiar archivos de configuración
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Editar variables según tu entorno
nano backend/.env
nano frontend/.env.local
```

**3. Iniciar con Docker Compose**
```bash
# Entorno de desarrollo completo
docker compose -f docker-compose.dev.yml up -d

# Verificar servicios activos
docker compose -f docker-compose.dev.yml ps
```

**4. Cargar Datos de Prueba**
```bash
# Ejecutar seeds automáticos
cd backend
npm run seed
```
#### Instalación Manual (Desarrollo)

**1. Backend (API)**
```bash
cd backend

# Instalar dependencias
npm install

# Configurar base de datos PostgreSQL
createdb hikari_dev

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Cargar datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run start:dev
```

**2. Frontend (Interfaz Web)**
```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las URLs correctas

# Iniciar servidor de desarrollo
npm run dev
```

### URLs de Acceso

#### Desarrollo Local
```bash
# Frontend (Interfaz de usuario)
http://localhost:3001

# Backend API
http://localhost:3000

# Documentación interactiva (Swagger)
http://localhost:3000/api

# Health check del sistema
http://localhost:3000/health
```

#### Datos de Prueba por Defecto
```javascript
// Tenant Demo
Subdominio: demo
URL: http://demo.localhost:3001

// Usuarios de prueba
Administrador: admin@demo.com / admin123
Doctor: doctor@demo.com / doctor123
Enfermera: nurse@demo.com / nurse123
Recepcionista: receptionist@demo.com / receptionist123
```

### Documentación Especializada

- **[API Backend](backend/README-BACKEND-API.md)**: Documentación técnica completa del backend
- **[Frontend Next.js](frontend/README-FRONTEND-NEXTJS.md)**: Guía de desarrollo de la interfaz web
- **[CI/CD GitHub Actions](.github/README-GITHUB-ACTIONS.md)**: Configuración de pipelines y despliegue
- **[Docker](DOCKER.md)**: Guía de containerización y despliegue

### Contribuir al Proyecto

#### Formas de Contribuir
- **Desarrollo de Código**: Nuevas funcionalidades y corrección de bugs
- **Documentación**: Mejora de guías y tutoriales
- **Testing**: Pruebas y reportes de problemas
- **Traducción**: Internacionalización a nuevos idiomas
- **Feedback Médico**: Aportes desde la experiencia clínica

#### Proceso de Contribución
```bash
# 1. Fork del repositorio
git clone https://github.com/tu-usuario/Hikari.git

# 2. Crear rama para nueva funcionalidad
git checkout -b feature/nueva-funcionalidad

# 3. Desarrollar y hacer commits
git add .
git commit -m "feat: descripción de la funcionalidad"

# 4. Push y crear Pull Request
git push origin feature/nueva-funcionalidad
```

#### Guidelines de Desarrollo
- **Commits**: Usar conventional commits (feat, fix, docs, etc.)
- **Testing**: Mantener cobertura de tests > 80%
- **Documentación**: Actualizar README y comentarios de código
- **Code Review**: Todo código debe pasar revisión por pares

### Roadmap de Desarrollo

#### Versión 1.0 (Actual)
- ✅ Sistema multi-tenant básico
- ✅ Autenticación y gestión de usuarios
- ✅ CRUD de pacientes y profesionales
- ✅ Sistema de citas básico
- ✅ CI/CD automatizado

#### Versión 1.1 (Próximo Release)
- 🔄 Historiales médicos completos
- 🔄 Sistema de notificaciones
- 🔄 Dashboard con métricas avanzadas
- 🔄 API móvil (React Native)

#### Versión 1.2 (Planificado)
- 📋 Sistema de facturación
- 📋 Integración con equipos médicos
- 📋 Telemedicina básica
- 📋 Reportes regulatorios

#### Versión 2.0 (Visión a Largo Plazo)
- 📋 Inteligencia artificial para diagnósticos
- 📋 Integración con wearables
- 📋 Blockchain para historiales inmutables
- 📋 Plataforma de investigación médica

### Soporte y Comunidad

#### Canales de Comunicación
- **GitHub Issues**: Reportes de bugs y solicitudes de funcionalidades
- **GitHub Discussions**: Conversaciones de la comunidad
- **Discord**: Chat en tiempo real (próximamente)
- **Email**: soporte@hikari-health.org

#### Soporte Técnico
- **Documentación**: Guías completas en este repositorio
- **Issues**: Respuesta promedio en 24-48 horas
- **Community Support**: Ayuda entre usuarios de la comunidad
- **Professional Support**: Disponible para instituciones que lo requieran
---

## English Version

### Project Mission

Hikari is an open-source hospital management system designed to democratize access to quality medical technology. Our goal is to eliminate economic barriers that prevent resource-limited hospitals and clinics from accessing modern and efficient management systems.

### Free Software Philosophy

- **Universal Access**: Available free of charge to any medical institution
- **Open Source**: Complete transparency in development and operation
- **Collaborative Community**: Development driven by the global medical community
- **No Restrictions**: Freedom to use, modify, and distribute
- **Sustainable**: Development model that ensures long-term continuity

### System Architecture

#### Technology Stack

**Backend (REST API)**
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL 15+ with TypeORM
- **Authentication**: JWT with refresh tokens
- **Documentation**: Automatic OpenAPI/Swagger
- **Testing**: Jest with complete coverage
- **Security**: Helmet, CORS, rate limiting

**Frontend (Web Interface)**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styles**: Tailwind CSS + Radix UI
- **Validation**: React Hook Form + Zod
- **State**: Zustand for state management
- **Security**: Integrated reCAPTCHA v3

**Infrastructure and DevOps**
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions with automated pipelines
- **Monitoring**: Health checks and structured logging
- **Scalability**: Native multi-tenant architecture

### Main Features

#### Multi-Tenant System
- **Complete Isolation**: Each institution has completely separate data
- **Custom Subdomains**: Unique URLs per hospital/clinic
- **Independent Configuration**: Each tenant can customize their experience
- **Horizontal Scalability**: Architecture prepared to grow

#### User and Role Management
- **ADMIN**: Complete tenant administrator with all permissions
- **DOCTOR**: Medical professional with access to medical records and diagnoses
- **NURSE**: Nursing staff with specific care permissions
- **RECEPTIONIST**: Reception staff and appointment management
- **PATIENT**: Patient with limited access to their personal information

#### Operational Modules
- **Authentication and Authorization**: Secure JWT-based system
- **Patient Management**: Complete registration with medical history
- **Appointment System**: Intelligent consultation scheduling
- **Staff Management**: Medical professional administration
- **Reports and Statistics**: Dashboard with relevant metrics

### Installation and Configuration

#### System Prerequisites
```bash
# Minimum required versions
Node.js >= 18.0.0
npm >= 8.0.0
PostgreSQL >= 14.0
Docker >= 24.0.0 (optional but recommended)
```

#### Docker Installation (Recommended)

**1. Clone Repository**
```bash
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari
```

**2. Environment Configuration**
```bash
# Copy configuration files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit variables according to your environment
nano backend/.env
nano frontend/.env.local
```

**3. Start with Docker Compose**
```bash
# Complete development environment
docker compose -f docker-compose.dev.yml up -d

# Verify active services
docker compose -f docker-compose.dev.yml ps
```

**4. Load Test Data**
```bash
# Run automatic seeds
cd backend
npm run seed
```

#### Manual Installation (Development)

**1. Backend (API)**
```bash
cd backend

# Install dependencies
npm install

# Configure PostgreSQL database
createdb hikari_dev

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# Load test data
npm run seed

# Start development server
npm run start:dev
```

**2. Frontend (Web Interface)**
```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with correct URLs

# Start development server
npm run dev
```

### Access URLs

#### Local Development
```bash
# Frontend (User interface)
http://localhost:3001

# Backend API
http://localhost:3000

# Interactive documentation (Swagger)
http://localhost:3000/api

# System health check
http://localhost:3000/health
```

#### Default Test Data
```javascript
// Demo Tenant
Subdomain: demo
URL: http://demo.localhost:3001

// Test users
Administrator: admin@demo.com / admin123
Doctor: doctor@demo.com / doctor123
Nurse: nurse@demo.com / nurse123
Receptionist: receptionist@demo.com / receptionist123
```

### Specialized Documentation

- **[Backend API](backend/README-BACKEND-API.md)**: Complete technical backend documentation
- **[Next.js Frontend](frontend/README-FRONTEND-NEXTJS.md)**: Web interface development guide
- **[GitHub Actions CI/CD](.github/README-GITHUB-ACTIONS.md)**: Pipeline and deployment configuration
- **[Docker](DOCKER.md)**: Containerization and deployment guide

### Contributing to the Project

#### Ways to Contribute
- **Code Development**: New features and bug fixes
- **Documentation**: Improvement of guides and tutorials
- **Testing**: Testing and problem reports
- **Translation**: Internationalization to new languages
- **Medical Feedback**: Contributions from clinical experience

#### Contribution Process
```bash
# 1. Fork the repository
git clone https://github.com/your-user/Hikari.git

# 2. Create branch for new feature
git checkout -b feature/new-feature

# 3. Develop and make commits
git add .
git commit -m "feat: feature description"

# 4. Push and create Pull Request
git push origin feature/new-feature
```

#### Development Guidelines
- **Commits**: Use conventional commits (feat, fix, docs, etc.)
- **Testing**: Maintain test coverage > 80%
- **Documentation**: Update README and code comments
- **Code Review**: All code must pass peer review

### Development Roadmap

#### Version 1.0 (Current)
- ✅ Basic multi-tenant system
- ✅ Authentication and user management
- ✅ Patient and professional CRUD
- ✅ Basic appointment system
- ✅ Automated CI/CD

#### Version 1.1 (Next Release)
- 🔄 Complete medical records
- 🔄 Notification system
- 🔄 Dashboard with advanced metrics
- 🔄 Mobile API (React Native)

#### Version 1.2 (Planned)
- 📋 Billing system
- 📋 Medical equipment integration
- 📋 Basic telemedicine
- 📋 Regulatory reports

#### Version 2.0 (Long-term Vision)
- 📋 Artificial intelligence for diagnostics
- 📋 Wearable integration
- 📋 Blockchain for immutable records
- 📋 Medical research platform

### Support and Community

#### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Community conversations
- **Discord**: Real-time chat (coming soon)
- **Email**: support@hikari-health.org

#### Technical Support
- **Documentation**: Complete guides in this repository
- **Issues**: Average response in 24-48 hours
- **Community Support**: Help between community users
- **Professional Support**: Available for institutions that require it

---

<div align="center">

**Free and Open Source Healthcare Management System**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js CI](https://github.com/AKira-IV/Hikari/workflows/CI/badge.svg)](https://github.com/AKira-IV/Hikari/actions)
[![Docker Pulls](https://img.shields.io/docker/pulls/akira-iv/hikari)](https://hub.docker.com/r/akira-iv/hikari)

[Live Demo](http://demo.localhost:3001) | [Documentation](https://github.com/AKira-IV/Hikari/wiki) | [API Docs](http://localhost:3000/api)

**Built with ❤️ for global healthcare accessibility**

</div>
```

## Acceso al Sistema

DespuÃ©s de ejecutar `make seed`, puedes acceder con:

**Tenant Demo** (subdomain: `demo`)
- **Admin**: admin@demo.com / admin123
- **Doctor**: doctor@demo.com / doctor123
- **Nurse**: nurse@demo.com / nurse123

## DocumentaciÃ³n API

Una vez iniciado el backend, la documentaciÃ³n completa de la API estÃ¡ disponible en:
- **Swagger UI**: http://localhost:3000/api

### Endpoints Principales

```bash
# Crear nuevo tenant/hospital
POST /auth/tenant

# Login
POST /auth/login
{
  "email": "admin@demo.com",
  "password": "admin123",
  "tenantSubdomain": "demo",
  "captchaToken": "<client-captcha-token>"
}

# Obtener usuarios del tenant
GET /users
Authorization: Bearer {token}
```

## ðŸ—ï¸ Roadmap del Proyecto

### Fase 1: Base del Proyecto
- [x] ConfiguraciÃ³n Docker y CI/CD
- [x] AutenticaciÃ³n y GestiÃ³n de Usuarios
- [x] Sistema Multi-Tenant
- [x] API Base con Swagger

### Fase 2: MÃ³dulos Principales
- [ ] MÃ³dulo de Pacientes completo
- [ ] MÃ³dulo de Profesionales completo
- [ ] MÃ³dulo de Citas MÃ©dicas
- [ ] Dashboard y reportes bÃ¡sicos

### Fase 3: Funcionalidades Avanzadas
- [ ] Sistema de permisos granular
- [ ] Notificaciones en tiempo real
- [ ] IntegraciÃ³n con APIs externas
- [ ] Reportes avanzados y analytics

### Fase 4: ProducciÃ³n
- [ ] Monitoreo y logging avanzado
- [ ] Backups automatizados
- [ ] Escalabilidad horizontal
- [ ] DocumentaciÃ³n completa

## Testing y CI/CD
Ejecuta make ci-check para replicar los pasos críticos del pipeline (lint, pruebas, builds y docker). El script scripts/run-ci-checks.sh acepta variables para personalizar la ejecución:

- CI_FORCE_NPM_CI=1 fuerza
pm ci incluso si existe
ode_modules.
- SKIP_E2E=1 omite los tests e2e (usa esto si no tienes PostgreSQL de pruebas levantado).
- SKIP_DOCKER_BUILDS=1 salta los builds de imágenes Docker.

> Antes de ejecutar los e2e localmente levanta la base de datos de pruebas: docker-compose -f docker-compose.dev.yml up -d db-dev.

Ejecuta \make ci-check\ para replicar los pasos críticos del pipeline (lint, tests, builds y docker). El script ubicado en \scripts/run-ci-checks.sh\ admite opciones:

- \CI_FORCE_NPM_CI=1\ fuerza la reinstalación de dependencias.
- \SKIP_E2E=1\ salta los e2e (útil si no tienes PostgreSQL levantado).
- \SKIP_DOCKER_BUILDS=1\ omite los build de imágenes.

> Antes de lanzar los e2e localmente levanta la base de datos de pruebas con docker-compose -f docker-compose.dev.yml up -d db-dev.


### GitHub Actions
El proyecto incluye workflows automÃ¡ticos que se ejecutan en cada push:

- **Tests**: Unit tests, E2E tests, coverage
- **Linting**: ESLint y Prettier
- **Security**: Audit de dependencias
- **Docker**: Build y push de imÃ¡genes
- **Deploy**: Staging y producciÃ³n automÃ¡ticos

### Ejecutar tests localmente
```bash
make test           # Tests unitarios
make test-e2e       # Tests end-to-end
make test-cov       # Coverage report
```

## Desarrollo

### Estructura del Proyecto
```
Hikari/
â”œâ”€â”€ backend/                 # API NestJS
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ auth/           # AutenticaciÃ³n
â”‚   â”‚   â”œâ”€â”€ users/          # GestiÃ³n usuarios
â”‚   â”‚   â”œâ”€â”€ database/       # Entidades y seeds
â”‚   â”‚   â””â”€â”€ common/         # Utilidades
â”‚   â”œâ”€â”€ Dockerfile          # Imagen producciÃ³n
â”‚   â””â”€â”€ Dockerfile.dev      # Imagen desarrollo
â”œâ”€â”€ frontend/               # React App
â”œâ”€â”€ .github/workflows/      # CI/CD GitHub Actions
â”œâ”€â”€ docker-compose.yml      # ProducciÃ³n
â”œâ”€â”€ docker-compose.dev.yml  # Desarrollo
â””â”€â”€ Makefile               # Scripts automatizados
```

### Variables de Entorno

Archivo `.env` en `/backend`:
```bash
# Database
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
RECAPTCHA_SECRET=<tu-secreto-recaptcha>
RECAPTCHA_MIN_SCORE=0.5
```

Variables sugeridas para el frontend (`frontend/.env.local`):
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<tu-site-key>
```


## Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### EstÃ¡ndares de CÃ³digo
- **Linting**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Testing**: Coverage mÃ­nimo 80%

## Soporte

- **Issues**: [GitHub Issues](https://github.com/AKira-IV/Hikari/issues)
- **DocumentaciÃ³n**: Ver `/backend/README.md` para detalles tÃ©cnicos
- **API**: Swagger en http://localhost:3000/api cuando estÃ© ejecutÃ¡ndose

## Licencia

Hikari es un proyecto de cÃ³digo abierto bajo la licencia MIT.
   ```
2. Levantar los servicios con Docker Compose:
   ```sh
   docker-compose up --build
   ```
3. Acceder a la aplicaciÃ³n en el navegador: `http://localhost:3000`

## Contribuir

Las contribuciones son bienvenidas. Para proponer cambios, abre un issue o un pull request.

## Licencia

Hikari es un proyecto de cÃ³digo abierto bajo la licencia MIT.








### Verificación local antes del push

Ejecuta `make ci-check` para replicar los pasos críticos del pipeline (lint, pruebas, builds y docker). El script `scripts/run-ci-checks.sh` acepta variables para personalizar la ejecución:

- `CI_FORCE_NPM_CI=1` fuerza `npm ci` incluso si existe `node_modules`.
- `SKIP_E2E=1` omite los tests e2e (usa esto si no tienes PostgreSQL de pruebas levantado).
- `SKIP_DOCKER_BUILDS=1` salta los builds de imágenes Docker.

> Antes de ejecutar los e2e localmente levanta la base de datos de pruebas: `docker-compose -f docker-compose.dev.yml up -d db-dev`.

