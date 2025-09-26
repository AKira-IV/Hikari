# Hikari - Sistema de Gestión Hospitalaria

Hikari es un sistema de gestión hospitalaria basado en la experiencia y estructura de SIGEHOS, pero mejorado para ofrecer escalabilidad, modularidad y tecnologías modernas.

## 🚀 Características Principales

### ✅ Implementadas
- **Sistema Multi-Tenant**: Cada hospital/clínica puede tener su propia instancia
- **Autenticación JWT**: Sistema de autenticación seguro con roles de usuario
- **Gestión de Usuarios**: CRUD completo con roles (Admin, Doctor, Nurse, Receptionist, Patient)
- **Documentación API**: Swagger automático disponible en `/api`
- **CI/CD**: GitHub Actions con tests automatizados y Docker builds
- **Docker**: Entornos de desarrollo y producción containerizados
- **Base de Datos**: PostgreSQL con TypeORM y seeds automatizados

## Tecnologías Utilizadas

### Backend
- **Framework:** NestJS (Node.js)
- **Base de Datos:** PostgreSQL 15
- **Autenticación:** JWT + Passport
- **Validación:** class-validator
- **ORM:** TypeORM
- **Documentación:** Swagger/OpenAPI
- **Testing:** Jest

### Frontend
- **Framework:** React con Next.js
- **UI/UX:** Design System en Figma

### Infraestructura
- **Containerización:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Monitoreo:** Health checks integrados

## Instalación y Uso

### Opción 1: Docker (Recomendado)

#### Desarrollo
```bash
# Clonar repositorio
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari

# Iniciar entorno de desarrollo con un comando
make dev-setup
```

Esto iniciará:
- **Backend**: http://localhost:3000
- **API Docs**: http://localhost:3000/api
- **Frontend**: http://localhost:3001
- **Base de Datos**: PostgreSQL en puerto 5432
- **Adminer**: http://localhost:8080 (admin de BD)

#### Producción
```bash
make up
```

### Opción 2: Manual

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables en .env
npm run start:dev
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

# Producción
make up              # Iniciar producción
make down            # Parar producción
make build           # Build imágenes

# Utilidades
make clean           # Limpiar contenedores
make health          # Verificar salud de servicios
make test            # Ejecutar tests
```

## Acceso al Sistema

Después de ejecutar `make seed`, puedes acceder con:

**Tenant Demo** (subdomain: `demo`)
- **Admin**: admin@demo.com / admin123
- **Doctor**: doctor@demo.com / doctor123
- **Nurse**: nurse@demo.com / nurse123

## Documentación API

Una vez iniciado el backend, la documentación completa de la API está disponible en:
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
  "tenantSubdomain": "demo"
}

# Obtener usuarios del tenant
GET /users
Authorization: Bearer {token}
```

## 🏗️ Roadmap del Proyecto

### Fase 1: Base del Proyecto
- [x] Configuración Docker y CI/CD
- [x] Autenticación y Gestión de Usuarios
- [x] Sistema Multi-Tenant
- [x] API Base con Swagger

### Fase 2: Módulos Principales
- [ ] Módulo de Pacientes completo
- [ ] Módulo de Profesionales completo
- [ ] Módulo de Citas Médicas
- [ ] Dashboard y reportes básicos

### Fase 3: Funcionalidades Avanzadas
- [ ] Sistema de permisos granular
- [ ] Notificaciones en tiempo real
- [ ] Integración con APIs externas
- [ ] Reportes avanzados y analytics

### Fase 4: Producción
- [ ] Monitoreo y logging avanzado
- [ ] Backups automatizados
- [ ] Escalabilidad horizontal
- [ ] Documentación completa

## Testing y CI/CD

### GitHub Actions
El proyecto incluye workflows automáticos que se ejecutan en cada push:

- **Tests**: Unit tests, E2E tests, coverage
- **Linting**: ESLint y Prettier
- **Security**: Audit de dependencias
- **Docker**: Build y push de imágenes
- **Deploy**: Staging y producción automáticos

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
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación
│   │   ├── users/          # Gestión usuarios
│   │   ├── database/       # Entidades y seeds
│   │   └── common/         # Utilidades
│   ├── Dockerfile          # Imagen producción
│   └── Dockerfile.dev      # Imagen desarrollo
├── frontend/               # React App
├── .github/workflows/      # CI/CD GitHub Actions
├── docker-compose.yml      # Producción
├── docker-compose.dev.yml  # Desarrollo
└── Makefile               # Scripts automatizados
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
```

## Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- **Linting**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Testing**: Coverage mínimo 80%

## Soporte

- **Issues**: [GitHub Issues](https://github.com/AKira-IV/Hikari/issues)
- **Documentación**: Ver `/backend/README.md` para detalles técnicos
- **API**: Swagger en http://localhost:3000/api cuando esté ejecutándose

## Licencia

Hikari es un proyecto de código abierto bajo la licencia MIT.
   ```
2. Levantar los servicios con Docker Compose:
   ```sh
   docker-compose up --build
   ```
3. Acceder a la aplicación en el navegador: `http://localhost:3000`

## Contribuir

Las contribuciones son bienvenidas. Para proponer cambios, abre un issue o un pull request.

## Licencia

Hikari es un proyecto de código abierto bajo la licencia MIT.

