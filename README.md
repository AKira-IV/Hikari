# Hikari - Sistema de GestiÃ³n Hospitalaria

Hikari es un sistema de gestiÃ³n hospitalaria basado en la experiencia y estructura de SIGEHOS, pero mejorado para ofrecer escalabilidad, modularidad y tecnologÃ­as modernas.

## ðŸš€ CaracterÃ­sticas Principales

### âœ… Implementadas
- **Sistema Multi-Tenant**: Cada hospital/clÃ­nica puede tener su propia instancia
- **AutenticaciÃ³n JWT**: Sistema de autenticaciÃ³n seguro con roles de usuario
- **GestiÃ³n de Usuarios**: CRUD completo con roles (Admin, Doctor, Nurse, Receptionist, Patient)
- **DocumentaciÃ³n API**: Swagger automÃ¡tico disponible en `/api`
- **CI/CD**: GitHub Actions con tests automatizados y Docker builds
- **Docker**: Entornos de desarrollo y producciÃ³n containerizados
- **Base de Datos**: PostgreSQL con TypeORM y seeds automatizados

## TecnologÃ­as Utilizadas

### Backend
- **Framework:** NestJS (Node.js)
- **Base de Datos:** PostgreSQL 15
- **AutenticaciÃ³n:** JWT + Passport
- **ValidaciÃ³n:** class-validator
- **ORM:** TypeORM
- **DocumentaciÃ³n:** Swagger/OpenAPI
- **Testing:** Jest

### Frontend
- **Framework:** React con Next.js
- **UI/UX:** Design System en Figma

### Infraestructura
- **ContainerizaciÃ³n:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Monitoreo:** Health checks integrados

## InstalaciÃ³n y Uso

### OpciÃ³n 1: Docker (Recomendado)

#### Desarrollo
```bash
# Clonar repositorio
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari

# Iniciar entorno de desarrollo con un comando
make dev-setup
```

Esto iniciarÃ¡:
- **Backend**: http://localhost:3000
- **API Docs**: http://localhost:3000/api
- **Frontend**: http://localhost:3001
- **Base de Datos**: PostgreSQL en puerto 5432
- **Adminer**: http://localhost:8080 (admin de BD)

#### ProducciÃ³n
```bash
make up
```

### OpciÃ³n 2: Manual

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables en .env
npm run start:dev
```

#### Frontend (Next.js 14 + TypeScript)
```bash
cd frontend
npm install
# Configura variables NEXT_PUBLIC_* si habilitas integración externa
npm run dev -- --port 3001
```

#### Cargar datos de prueba
```bash
npm run seed
```

### Comandos Docker Disponibles

```bash
# Desarrollo
make dev-up          # Iniciar desarrollo
make dev-down        # Parar desarrollo
make dev-logs        # Ver logs
make seed            # Cargar datos de prueba

# ProducciÃ³n
make up              # Iniciar producciÃ³n
make down            # Parar producciÃ³n
make build           # Build imÃ¡genes

# Utilidades
make clean           # Limpiar contenedores
make health          # Verificar salud de servicios
make test            # Ejecutar tests
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

