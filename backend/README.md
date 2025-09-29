# Hikari Backend API

Backend del Sistema de GestiÃ³n Hospitalaria Hikari, desarrollado con NestJS, TypeORM y PostgreSQL.

## CaracterÃ­sticas Principales

### Implementadas
- **Sistema Multi-Tenant**: Cada hospital/clÃ­nica puede tener su propia instancia
- **AutenticaciÃ³n JWT**: Sistema de autenticaciÃ³n seguro con roles de usuario
- **GestiÃ³n de Usuarios**: CRUD completo con roles (Admin, Doctor, Nurse, Receptionist, Patient)
- **DocumentaciÃ³n API**: Swagger automÃ¡tico disponible en `/api`
- **ValidaciÃ³n de Datos**: ValidaciÃ³n automÃ¡tica con class-validator
- **Base de Datos**: PostgreSQL con TypeORM
- **Seeds**: Datos de prueba automatizados

### Roles de Usuario
- **ADMIN**: Administrador completo del tenant
- **DOCTOR**: Profesional mÃ©dico
- **NURSE**: Personal de enfermerÃ­a
- **RECEPTIONIST**: Personal de recepciÃ³n
- **PATIENT**: Paciente

## ConfiguraciÃ³n e InstalaciÃ³n

### Prerrequisitos
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Copiar `.env.example` a `.env` y configurar:

```bash
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=hikari

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=24h

# Application Configuration
NODE_ENV=development
PORT=3000

# Captcha Configuration
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=your-recaptcha-secret
RECAPTCHA_MIN_SCORE=0.5
```

### 3. Configurar Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb hikari

# O conectarse a PostgreSQL y ejecutar:
# CREATE DATABASE hikari;
```

### 4. Ejecutar Migraciones (AutomÃ¡tico)
El sistema usa `synchronize: true` en desarrollo, por lo que las tablas se crean automÃ¡ticamente.

### 5. Cargar Datos de Prueba
```bash
npm run seed
```

Esto crearÃ¡:
- Tenant "demo" con subdomain "demo"
- Usuario Admin: `admin@demo.com` / `admin123`
- Usuario Doctor: `doctor@demo.com` / `doctor123`
- Usuario Nurse: `nurse@demo.com` / `nurse123`

### 6. Iniciar el Servidor
```bash
# Desarrollo
npm run start:dev

# ProducciÃ³n
npm run start:prod
```

## Uso de la API

### Base URL
```
http://localhost:3000
```

### DocumentaciÃ³n Swagger
```
http://localhost:3000/api
```

### Endpoints Principales

#### AutenticaciÃ³n

**Crear Nuevo Tenant**
```bash
POST /auth/tenant
Content-Type: application/json

{
  "name": "Hospital Central",
  "subdomain": "central",
  "description": "Hospital Central de la ciudad",
  "adminEmail": "admin@central.com",
  "adminPassword": "password123",
  "adminFirstName": "Carlos",
  "adminLastName": "Rodriguez"
}
```

**Login**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "admin123",
  "tenantSubdomain": "demo",
  "captchaToken": "<client-captcha-token>"
}
```

## Scripts Disponibles

```bash
npm run build          # Compilar
npm run start:dev      # Desarrollo con hot-reload
npm run start:prod     # ProducciÃ³n
npm run seed           # Cargar datos de prueba
npm run test           # Ejecutar tests
npm run lint           # Revisar cÃ³digo
```

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


