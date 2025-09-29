# Hikari - Sistema de Gestión Hospitalaria Gratuito

<div align="center">

![Hikari Logo](https://img.shields.io/badge/Hikari-Sistema%20Hospitalario-blue?style=for-the-badge&logo=heart&logoColor=white)

[![Licencia MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)
[![Código Libre](https://img.shields.io/badge/CÓDIGO-LIBRE-success?style=for-the-badge)](./LICENSE)
[![Para Todos](https://img.shields.io/badge/PARA-TODOS-red?style=for-the-badge)](./LICENSE)

**Sistema completamente GRATUITO para centros de salud en países en desarrollo**

*Gestiona tu red hospitalaria con seguridad multi-tenant y experiencias centradas en el paciente*

</div>

## Misión Social

**Hikari** es un sistema de gestión hospitalaria **100% gratuito y de código abierto**, desarrollado específicamente para:

### Dirigido a:
- **Hospitales públicos** en Argentina y Latinoamérica
- **Centros de salud rurales** y urbanos marginales
- **Clínicas comunitarias** sin fines de lucro
- **Organizaciones médicas humanitarias**
- **Cualquier institución de salud** que busque digitalización

### Valores Fundamentales:
- **Acceso Universal**: La tecnología médica debe ser para todos
- **Transparencia Total**: Código abierto para auditoría y confianza
- **Colaboración**: Desarrollado por y para la comunidad médica
- **Sostenibilidad**: Sin costos de licencia, siempre gratuito
- **Seguridad Máxima**: Cumplimiento OWASP Top 10

---

## Características Principales

### Implementadas
- **Sistema Multi-Tenant**: Cada hospital/clínica tiene su propia instancia aislada
- **Autenticación JWT**: Sistema seguro con roles diferenciados (Admin, Doctor, Enfermera, Paciente)
- **Gestión Completa**: Usuarios, pacientes, profesionales y citas médicas
- **Documentación API**: Swagger automático en `/api`
- **Validación Robusta**: Validación automática con class-validator
- **Base de Datos**: PostgreSQL con TypeORM para máxima confiabilidad
- **Datos Demo**: Seeds automatizados para pruebas inmediatas

### Marco de Seguridad OWASP
- **A01** - Broken Access Control: Guards JWT + RBAC
- **A02** - Cryptographic Failures: Bcrypt + JWT + HTTPS
- **A03** - Injection: TypeORM + Validación + Sanitización
- **A04** - Insecure Design: Arquitectura multi-tenant + Principios seguros
- **A05** - Security Misconfiguration: Headers seguros + CSP + HSTS
- **A06** - Vulnerable Components: Auditorías npm + Dependencias actualizadas
- **A07** - Authentication Failures: Autenticación JWT + Validación robusta
- **A08** - Software Integrity: Testing automatizado + Pipeline CI/CD
- **A09** - Logging Failures: Logs de auditoría + Monitoreo de seguridad
- **A10** - Server-Side Request Forgery: Validación de requests + Rate limiting

### En Desarrollo
- **Historias Clínicas**: Gestión completa de registros médicos
- **Inventario Médico**: Control de medicamentos y equipos
- **Reportes Avanzados**: Analytics e informes hospitalarios
- **Telemedicina**: Consultas virtuales integradas
- **Facturación**: Sistema de cobros y obras sociales

---

## Stack Tecnológico

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **Base de Datos**: PostgreSQL 15
- **ORM**: TypeORM para manejo de datos
- **Autenticación**: JWT + Passport + Refresh Tokens
- **Validación**: class-validator + class-transformer
- **Documentación**: OpenAPI/Swagger automático
- **Testing**: Jest + Supertest para E2E
- **Seguridad**: Helmet + CORS + Rate Limiting

### Frontend
- **Framework**: Next.js 14 + React 18
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Formularios**: React Hook Form + Zod
- **Estado**: React Context + Hooks
- **HTTP Client**: Fetch API nativo con interceptores

### DevOps & Deployment
- **Contenedores**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Base de Datos**: PostgreSQL con Docker
- **Proxy Reverso**: Nginx (producción)
- **Monitoreo**: Health checks integrados

---

## Instalación Rápida

### Prerrequisitos
- **Docker & Docker Compose** (recomendado)
- **Node.js 18+** (para desarrollo local)
- **PostgreSQL 15+** (si no usas Docker)

### Opción 1: Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari

# Ejecutar con Docker
make up

# O manualmente:
docker compose -f docker-compose.dev.yml up -d
```

### Opción 2: Desarrollo Local

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

---

## Acceso al Sistema

Después de ejecutar `make seed`, puedes acceder con:

**Tenant Demo** (subdomain: `demo`)
- **Admin**: admin@demo.com / admin123
- **Doctor**: doctor@demo.com / doctor123
- **Nurse**: nurse@demo.com / nurse123

---

## Documentación API

Una vez iniciado el backend, la documentación completa de la API está disponible en:
- **Swagger UI**: http://localhost:3000/api

### Endpoints Principales

#### Autenticación
```bash
POST /auth/login
POST /auth/register
POST /auth/tenant
GET /auth/profile
```

#### Usuarios
```bash
GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id
GET /users/role/:role
```

#### Citas Médicas
```bash
GET /appointments
POST /appointments
PUT /appointments/:id
DELETE /appointments/:id
```

### Swagger UI
Accede a http://localhost:3000/api para explorar todos los endpoints interactivamente.

---

## Scripts de Desarrollo

```bash
# Backend
npm run start:dev     # Desarrollo con hot-reload
npm run build        # Construir para producción
npm run test         # Ejecutar tests
npm run test:cov     # Tests con cobertura
npm run seed         # Sembrar datos de prueba

# Frontend
npm run dev          # Desarrollo con hot-reload
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linter

# Docker
make up              # Levantar servicios
make down            # Bajar servicios
make logs            # Ver logs
make clean           # Limpiar volúmenes
```

---

## Estructura del Proyecto

```
Hikari/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación JWT
│   │   ├── users/          # Gestión de usuarios
│   │   ├── patients/       # Gestión de pacientes
│   │   ├── appointments/   # Citas médicas
│   │   ├── database/       # Entidades y seeds
│   │   └── common/         # Utilidades compartidas
│   ├── test/               # Tests E2E
│   └── Dockerfile
├── frontend/               # Frontend Next.js
│   ├── app/               # App Router (Next.js 14)
│   ├── components/        # Componentes React
│   ├── lib/              # Utilidades
│   └── public/           # Assets estáticos
└── docker-compose.yml    # Orchestración Docker
```

---

## Contribuir

### Para Desarrolladores
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Para Profesionales Médicos
Tu feedback es invaluable. Si eres médico, enfermero o administrador hospitalario:
- **Reporta** bugs o problemas de UX
- **Sugiere** funcionalidades que necesitas
- **Participa** en discusiones de diseño
- **Testa** el sistema en tu entorno

---

## Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

### Compromiso de Gratuidad Perpetua

**Hikari siempre será gratuito.** Este es nuestro compromiso inquebrantable con la comunidad médica global. Nunca habrá:
- Licencias de pago
- Funcionalidades premium
- Restricciones por número de usuarios
- Costos ocultos de ningún tipo

---

## Contacto & Soporte

- **Repositorio**: [GitHub](https://github.com/AKira-IV/Hikari)
- **Issues**: [Reportar Problemas](https://github.com/AKira-IV/Hikari/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/AKira-IV/Hikari/discussions)

---

<div align="center">

**Desarrollado con el corazón para la comunidad médica mundial**

[Danos una estrella si este proyecto te resulta útil](https://github.com/AKira-IV/Hikari)

</div>
