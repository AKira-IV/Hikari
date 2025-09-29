# Hikari Backend API

**Sistema de Gestión Hospitalaria de Código Libre - API REST**

[English](#english-version) | [Español](#versión-en-español)

---

## Versión en Español

### Arquitectura Técnica

#### Stack Principal
- **Framework**: NestJS (Node.js + TypeScript)
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT con refresh tokens
- **Documentación**: OpenAPI/Swagger automático
- **Validación**: class-validator + class-transformer
- **Testing**: Jest con cobertura completa

#### Patrón de Diseño
- **Multi-Tenant**: Arquitectura aislada por tenant (hospital/clínica)
- **DDD**: Domain-Driven Design con módulos especializados
- **CQRS**: Separación de comandos y consultas
- **Repository**: Abstracción de acceso a datos
- **Guard/Interceptor**: Middleware para seguridad y logging

### Funcionalidades Implementadas

#### Sistema Multi-Tenant
- Aislamiento completo de datos por tenant
- Subdominios personalizados para cada institución
- Configuración independiente por tenant
- Escalabilidad horizontal nativa

#### Gestión de Usuarios y Roles
- **ADMIN**: Administrador completo del tenant
- **DOCTOR**: Profesional médico con acceso a historiales
- **NURSE**: Personal de enfermería con permisos específicos
- **RECEPTIONIST**: Personal de recepción y citas
- **PATIENT**: Paciente con acceso limitado a su información

#### Módulos Operativos
- **Auth**: Sistema de autenticación y autorización
- **Users**: Gestión de usuarios y perfiles
- **Patients**: Registro y gestión de pacientes
- **Professionals**: Gestión de personal médico
- **Appointments**: Sistema de citas médicas
- **Database**: Seeds y migraciones automatizadas

### Configuración e Instalación

#### Prerrequisitos
```bash
# Versiones requeridas
Node.js >= 18.0.0
npm >= 8.0.0
PostgreSQL >= 14.0
```

#### 1. Instalación de Dependencias
```bash
cd backend
npm install
```

#### 2. Configuración de Entorno
```bash
# Copiar archivo de configuración
cp .env.example .env

# Variables principales
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=hikari_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=hikari_dev

JWT_SECRET=your-super-secure-jwt-secret-key-minimum-256-bits
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Seguridad
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=your-recaptcha-secret
RECAPTCHA_MIN_SCORE=0.5

# CORS
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true
```

#### 3. Configuración de Base de Datos
```bash
# Crear usuario y base de datos PostgreSQL
sudo -u postgres psql
CREATE USER hikari_user WITH PASSWORD 'secure_password';
CREATE DATABASE hikari_dev OWNER hikari_user;
GRANT ALL PRIVILEGES ON DATABASE hikari_dev TO hikari_user;
\q

# Verificar conexión
npm run db:check
```

#### 4. Inicialización del Sistema
```bash
# Cargar datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run start:dev
```

### Datos de Prueba Generados

#### Tenant Demo
- **Nombre**: "Hospital Demo"
- **Subdominio**: "demo"
- **URL**: `http://demo.localhost:3000`

#### Usuarios de Prueba
```javascript
// Administrador
Email: admin@demo.com
Password: admin123
Role: ADMIN

// Doctor
Email: doctor@demo.com
Password: doctor123
Role: DOCTOR

// Enfermera
Email: nurse@demo.com
Password: nurse123
Role: NURSE

// Recepcionista
Email: receptionist@demo.com
Password: receptionist123
Role: RECEPTIONIST
```

### Uso de la API

#### URLs Base
```bash
# Desarrollo
http://localhost:3000/api/v1

# Documentación interactiva
http://localhost:3000/api

# Health check
http://localhost:3000/health
```

#### Autenticación

**Crear Nuevo Tenant**
```bash
POST /auth/tenant
Content-Type: application/json

{
  "name": "Hospital Central",
  "subdomain": "central",
  "description": "Hospital Central de la ciudad",
  "adminEmail": "admin@central.com",
  "adminPassword": "SecurePass123!",
  "adminFirstName": "Carlos",
  "adminLastName": "Rodriguez"
}
```

**Login de Usuario**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "admin123",
  "tenantSubdomain": "demo"
}

# Respuesta
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400,
  "user": {
    "id": "uuid",
    "email": "admin@demo.com",
    "role": "ADMIN",
    "tenant": "demo"
  }
}
```

**Renovar Token**
```bash
POST /auth/refresh
Authorization: Bearer <refresh_token>
```

#### Gestión de Usuarios
```bash
# Listar usuarios del tenant
GET /users
Authorization: Bearer <access_token>

# Crear nuevo usuario
POST /users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "nuevo@demo.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "DOCTOR"
}

# Actualizar usuario
PATCH /users/:id
Authorization: Bearer <access_token>

# Eliminar usuario
DELETE /users/:id
Authorization: Bearer <access_token>
```

#### Gestión de Pacientes
```bash
# Registrar paciente
POST /patients
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "María",
  "lastName": "García",
  "dateOfBirth": "1985-03-15",
  "gender": "FEMALE",
  "phone": "+34666555444",
  "email": "maria@email.com",
  "address": "Calle Mayor 123, Madrid",
  "emergencyContactName": "José García",
  "emergencyContactPhone": "+34666555443"
}
```

### Scripts de Desarrollo

```bash
# Desarrollo
npm run start:dev        # Servidor con hot-reload
npm run start:debug      # Servidor con debugger

# Construcción
npm run build           # Compilar para producción
npm run start:prod      # Ejecutar versión compilada

# Base de datos
npm run db:check        # Verificar conexión
npm run seed           # Cargar datos de prueba
npm run migration:run   # Ejecutar migraciones
npm run migration:revert # Revertir migración

# Testing
npm run test           # Tests unitarios
npm run test:e2e       # Tests end-to-end
npm run test:cov       # Tests con cobertura

# Calidad de código
npm run lint           # ESLint
npm run lint:fix       # ESLint con auto-fix
npm run format         # Prettier
```

### Seguridad Implementada

#### Medidas de Protección
- **CORS**: Configuración restrictiva por origen
- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: Límites de peticiones por IP
- **Input Validation**: Validación exhaustiva de datos
- **SQL Injection**: Protección via TypeORM/parametrized queries
- **XSS**: Sanitización automática de inputs
- **JWT**: Tokens seguros con expiración

#### Headers de Seguridad
```http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Monitoreo y Logging

#### Health Checks
```bash
GET /health           # Estado general del sistema
GET /health/db        # Estado de la base de datos
GET /health/redis     # Estado de Redis (si está configurado)
```

#### Logs Estructurados
```javascript
// Ejemplo de log de autenticación
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "User authenticated successfully",
  "context": {
    "userId": "uuid",
    "email": "admin@demo.com",
    "tenant": "demo",
    "ip": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Próximas Funcionalidades

#### En Desarrollo
- **Historiales Médicos**: Gestión completa de expedientes
- **Citas Avanzadas**: Calendario inteligente con notificaciones
- **Reportes**: Dashboard con métricas y estadísticas
- **Facturación**: Sistema integrado de facturación
- **Telemedicina**: Videoconsultas integradas

#### Mejoras Planificadas
- **Cache Redis**: Optimización de consultas frecuentes
- **WebSockets**: Notificaciones en tiempo real
- **Microservicios**: Separación en servicios especializados
- **GraphQL**: API alternativa más flexible
- **Audit Trail**: Registro completo de cambios

---

## English Version

### Technical Architecture

#### Main Stack
- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with refresh tokens
- **Documentation**: Automatic OpenAPI/Swagger
- **Validation**: class-validator + class-transformer
- **Testing**: Jest with complete coverage

#### Design Pattern
- **Multi-Tenant**: Isolated architecture per tenant (hospital/clinic)
- **DDD**: Domain-Driven Design with specialized modules
- **CQRS**: Command and Query Responsibility Segregation
- **Repository**: Data access abstraction
- **Guard/Interceptor**: Middleware for security and logging

### Implemented Features

#### Multi-Tenant System
- Complete data isolation per tenant
- Custom subdomains for each institution
- Independent configuration per tenant
- Native horizontal scalability

#### User and Role Management
- **ADMIN**: Complete tenant administrator
- **DOCTOR**: Medical professional with medical record access
- **NURSE**: Nursing staff with specific permissions
- **RECEPTIONIST**: Reception and appointment staff
- **PATIENT**: Patient with limited access to their information

#### Operational Modules
- **Auth**: Authentication and authorization system
- **Users**: User and profile management
- **Patients**: Patient registration and management
- **Professionals**: Medical staff management
- **Appointments**: Medical appointment system
- **Database**: Automated seeds and migrations

### Configuration and Installation

#### Prerequisites
```bash
# Required versions
Node.js >= 18.0.0
npm >= 8.0.0
PostgreSQL >= 14.0
```

#### 1. Dependency Installation
```bash
cd backend
npm install
```

#### 2. Environment Configuration
```bash
# Copy configuration file
cp .env.example .env

# Main variables
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=hikari_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=hikari_dev

JWT_SECRET=your-super-secure-jwt-secret-key-minimum-256-bits
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Security
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=your-recaptcha-secret
RECAPTCHA_MIN_SCORE=0.5

# CORS
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true
```

#### 3. Database Configuration
```bash
# Create PostgreSQL user and database
sudo -u postgres psql
CREATE USER hikari_user WITH PASSWORD 'secure_password';
CREATE DATABASE hikari_dev OWNER hikari_user;
GRANT ALL PRIVILEGES ON DATABASE hikari_dev TO hikari_user;
\q

# Verify connection
npm run db:check
```

#### 4. System Initialization
```bash
# Load test data
npm run seed

# Start development server
npm run start:dev
```

### Generated Test Data

#### Demo Tenant
- **Name**: "Hospital Demo"
- **Subdomain**: "demo"
- **URL**: `http://demo.localhost:3000`

#### Test Users
```javascript
// Administrator
Email: admin@demo.com
Password: admin123
Role: ADMIN

// Doctor
Email: doctor@demo.com
Password: doctor123
Role: DOCTOR

// Nurse
Email: nurse@demo.com
Password: nurse123
Role: NURSE

// Receptionist
Email: receptionist@demo.com
Password: receptionist123
Role: RECEPTIONIST
```

### API Usage

#### Base URLs
```bash
# Development
http://localhost:3000/api/v1

# Interactive documentation
http://localhost:3000/api

# Health check
http://localhost:3000/health
```

#### Authentication

**Create New Tenant**
```bash
POST /auth/tenant
Content-Type: application/json

{
  "name": "Central Hospital",
  "subdomain": "central",
  "description": "City Central Hospital",
  "adminEmail": "admin@central.com",
  "adminPassword": "SecurePass123!",
  "adminFirstName": "Carlos",
  "adminLastName": "Rodriguez"
}
```

**User Login**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "admin123",
  "tenantSubdomain": "demo"
}

# Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400,
  "user": {
    "id": "uuid",
    "email": "admin@demo.com",
    "role": "ADMIN",
    "tenant": "demo"
  }
}
```

**Refresh Token**
```bash
POST /auth/refresh
Authorization: Bearer <refresh_token>
```

#### User Management
```bash
# List tenant users
GET /users
Authorization: Bearer <access_token>

# Create new user
POST /users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "nuevo@demo.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "role": "DOCTOR"
}

# Update user
PATCH /users/:id
Authorization: Bearer <access_token>

# Delete user
DELETE /users/:id
Authorization: Bearer <access_token>
```

#### Patient Management
```bash
# Register patient
POST /patients
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "María",
  "lastName": "García",
  "dateOfBirth": "1985-03-15",
  "gender": "FEMALE",
  "phone": "+34666555444",
  "email": "maria@email.com",
  "address": "Calle Mayor 123, Madrid",
  "emergencyContactName": "José García",
  "emergencyContactPhone": "+34666555443"
}
```

### Development Scripts

```bash
# Development
npm run start:dev        # Server with hot-reload
npm run start:debug      # Server with debugger

# Build
npm run build           # Compile for production
npm run start:prod      # Run compiled version

# Database
npm run db:check        # Verify connection
npm run seed           # Load test data
npm run migration:run   # Run migrations
npm run migration:revert # Revert migration

# Testing
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Tests with coverage

# Code quality
npm run lint           # ESLint
npm run lint:fix       # ESLint with auto-fix
npm run format         # Prettier
```

### Implemented Security

#### Protection Measures
- **CORS**: Restrictive configuration by origin
- **Helmet**: HTTP security headers
- **Rate Limiting**: Request limits per IP
- **Input Validation**: Exhaustive data validation
- **SQL Injection**: Protection via TypeORM/parametrized queries
- **XSS**: Automatic input sanitization
- **JWT**: Secure tokens with expiration

#### Security Headers
```http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Monitoring and Logging

#### Health Checks
```bash
GET /health           # General system status
GET /health/db        # Database status
GET /health/redis     # Redis status (if configured)
```

#### Structured Logs
```javascript
// Authentication log example
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "User authenticated successfully",
  "context": {
    "userId": "uuid",
    "email": "admin@demo.com",
    "tenant": "demo",
    "ip": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Upcoming Features

#### In Development
- **Medical Records**: Complete medical record management
- **Advanced Appointments**: Smart calendar with notifications
- **Reports**: Dashboard with metrics and statistics
- **Billing**: Integrated billing system
- **Telemedicine**: Integrated video consultations

#### Planned Improvements
- **Redis Cache**: Optimization of frequent queries
- **WebSockets**: Real-time notifications
- **Microservices**: Separation into specialized services
- **GraphQL**: More flexible alternative API
- **Audit Trail**: Complete change logging

---

<div align="center">

**Free and Open Source Healthcare Management System**

[API Documentation](http://localhost:3000/api) | [GitHub Repository](https://github.com/AKira-IV/Hikari)

Licensed under MIT - Built with love for global healthcare accessibility

</div>


