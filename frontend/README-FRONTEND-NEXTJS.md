# Hikari Frontend

**Sistema de Gestión Hospitalaria de Código Libre - Interfaz Web**

[English](#english-version) | [Español](#versión-en-español)

---

## Versión en Español

### Tecnologías Principales

#### Stack Frontend
- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript con tipado estricto
- **Estilos**: Tailwind CSS + Radix UI
- **Validación**: React Hook Form + Zod
- **Estado**: Zustand para estado global
- **HTTP**: Axios con interceptors automáticos
- **Seguridad**: reCAPTCHA v3 integrado

#### Arquitectura de Componentes
- **Design System**: Componentes reutilizables con Radix UI
- **Atomic Design**: Organización por niveles de complejidad
- **Provider Pattern**: Context providers para funcionalidades transversales
- **Custom Hooks**: Lógica compartida encapsulada
- **Route Groups**: Organización lógica de rutas

### Estructura del Proyecto

#### Directorios Principales
```
frontend/
├── app/                    # App Router de Next.js 14
│   ├── (auth)/            # Grupo de rutas de autenticación
│   │   ├── login/         # Página de inicio de sesión
│   │   └── register/      # Página de registro
│   ├── (tenants)/         # Grupo de rutas multi-tenant
│   │   └── [tenant]/      # Rutas dinámicas por tenant
│   ├── globals.css        # Estilos globales y variables CSS
│   ├── layout.tsx         # Layout raíz de la aplicación
│   └── page.tsx           # Página de inicio
├── components/            # Sistema de componentes
│   ├── forms/             # Formularios especializados
│   ├── layout/            # Componentes de layout
│   ├── navigation/        # Componentes de navegación
│   ├── providers/         # Context providers
│   └── ui/                # Design system base
├── config/                # Configuración de la aplicación
│   └── site.ts            # Configuración del sitio
├── lib/                   # Utilidades y configuración
│   ├── api-client.ts      # Cliente HTTP configurado
│   └── types.ts           # Tipos TypeScript compartidos
└── public/                # Recursos estáticos
    └── favicon.svg        # Iconos y assets
```

#### Funcionalidades Implementadas

**Sistema de Autenticación**
- Login multi-tenant con validación
- Registro de nuevos usuarios por roles
- Recuperación de contraseña
- reCAPTCHA v3 para protección anti-bot
- Persistencia de sesión con JWT

**Interfaz Multi-Tenant**
- Rutas dinámicas por tenant (/[tenant]/dashboard)
- Contexto de tenant automático
- Configuración personalizada por institución
- Tema y branding adaptable

**Formularios Avanzados**
- Validación en tiempo real con Zod
- Manejo de errores unificado
- Estados de loading y feedback visual
- Accesibilidad completa (ARIA)

### Configuración e Instalación

#### Prerrequisitos
```bash
# Versiones requeridas
Node.js >= 18.0.0
npm >= 8.0.0
```

#### 1. Instalación de Dependencias
```bash
cd frontend
npm install
```

#### 2. Configuración de Variables de Entorno
```bash
# Copiar archivo de configuración
cp .env.example .env.local

# Variables principales
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_DEFAULT_TENANT=demo

# reCAPTCHA v3 (opcional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
NEXT_PUBLIC_RECAPTCHA_ENABLED=true

# Configuración de desarrollo
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

#### 3. Iniciar Entorno de Desarrollo
```bash
# Servidor de desarrollo con hot-reload
npm run dev

# Disponible en: http://localhost:3001
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo en http://localhost:3001
npm run dev:turbo        # Desarrollo con Turbopack (experimental)

# Construcción
npm run build           # Compilar para producción
npm run start           # Ejecutar versión compilada
npm run export          # Exportar sitio estático

# Calidad de código
npm run lint            # ESLint con configuración Next.js
npm run lint:fix        # ESLint con auto-corrección
npm run type-check      # Verificación de tipos TypeScript
npm run format          # Prettier para formateo

# Testing
npm run test            # Tests unitarios (Jest + Testing Library)
npm run test:watch      # Tests en modo watch
npm run test:coverage   # Tests con reporte de cobertura

# Análisis
npm run analyze         # Análisis del bundle de producción
npm run lighthouse      # Auditoría de performance
```

### Funcionalidades de la Interfaz

#### Páginas de Autenticación
**Login (`/login`)**
- Formulario con validación en tiempo real
- Selección automática de tenant
- reCAPTCHA v3 invisible
- Manejo de errores específicos
- Redirección automática post-login

**Registro (`/register`)**
- Registro de nuevos usuarios
- Validación de contraseñas robustas
- Confirmación por email (planificado)
- Términos y condiciones

#### Dashboard Multi-Tenant
**Rutas Dinámicas (`/[tenant]/...`)**
```bash
/demo/dashboard         # Dashboard principal
/demo/patients          # Gestión de pacientes
/demo/appointments      # Sistema de citas
/demo/professionals     # Gestión de personal
/demo/settings          # Configuración del tenant
```

#### Componentes del Design System
**UI Base (`components/ui/`)**
- Button: Botones con variantes y estados
- Input: Campos de entrada con validación visual
- Modal: Diálogos modales accesibles
- Toast: Notificaciones no intrusivas
- Card: Contenedores de información
- Table: Tablas con paginación y filtros

**Formularios (`components/forms/`)**
- LoginForm: Formulario de autenticación
- PatientForm: Registro de pacientes
- AppointmentForm: Programación de citas
- UserForm: Gestión de usuarios

### Configuración del Cliente HTTP

#### API Client (`lib/api-client.ts`)
```typescript
// Configuración automática de headers y interceptors
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para JWT automático
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo automático de refresh tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Lógica de refresh token automático
      return handleTokenRefresh(error);
    }
    return Promise.reject(error);
  }
);
```

#### Tipos TypeScript (`lib/types.ts`)
```typescript
// Tipos compartidos con el backend
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenant: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  emergencyContact: EmergencyContact;
}
```

### Seguridad y Performance

#### Medidas de Seguridad
- **CSP**: Content Security Policy configurado
- **CSRF**: Protección contra Cross-Site Request Forgery
- **XSS**: Sanitización automática de inputs
- **reCAPTCHA**: Protección contra bots en formularios
- **JWT**: Manejo seguro de tokens con expiración

#### Optimizaciones de Performance
- **Code Splitting**: Carga diferida de componentes
- **Image Optimization**: Next.js Image con WebP automático
- **Bundle Analysis**: Análisis de tamaño del bundle
- **Caching**: Estrategias de cache del browser
- **Compression**: Gzip/Brotli en producción

### Próximas Funcionalidades

#### En Desarrollo
- **Dashboard Avanzado**: Métricas y gráficos en tiempo real
- **Sistema de Notificaciones**: Push notifications nativas
- **Calendario Inteligente**: Vista de calendario para citas
- **Chat en Tiempo Real**: Comunicación entre staff
- **Telemedicina**: Interface para videoconsultas

#### Mejoras Planificadas
- **PWA**: Progressive Web App completa
- **Offline Mode**: Funcionalidad sin conexión
- **Dark Mode**: Tema oscuro adaptativo
- **Internacionalización**: Soporte multi-idioma
- **Accessibility**: Mejoras WCAG 2.1 AA

---

## English Version

### Main Technologies

#### Frontend Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styles**: Tailwind CSS + Radix UI
- **Validation**: React Hook Form + Zod
- **State**: Zustand for global state
- **HTTP**: Axios with automatic interceptors
- **Security**: Integrated reCAPTCHA v3

#### Component Architecture
- **Design System**: Reusable components with Radix UI
- **Atomic Design**: Organization by complexity levels
- **Provider Pattern**: Context providers for cross-cutting features
- **Custom Hooks**: Encapsulated shared logic
- **Route Groups**: Logical route organization

### Project Structure

#### Main Directories
```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication route group
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (tenants)/         # Multi-tenant route group
│   │   └── [tenant]/      # Dynamic tenant routes
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root application layout
│   └── page.tsx           # Home page
├── components/            # Component system
│   ├── forms/             # Specialized forms
│   ├── layout/            # Layout components
│   ├── navigation/        # Navigation components
│   ├── providers/         # Context providers
│   └── ui/                # Base design system
├── config/                # Application configuration
│   └── site.ts            # Site configuration
├── lib/                   # Utilities and configuration
│   ├── api-client.ts      # Configured HTTP client
│   └── types.ts           # Shared TypeScript types
└── public/                # Static resources
    └── favicon.svg        # Icons and assets
```

#### Implemented Features

**Authentication System**
- Multi-tenant login with validation
- New user registration by roles
- Password recovery
- reCAPTCHA v3 for anti-bot protection
- Session persistence with JWT

**Multi-Tenant Interface**
- Dynamic routes per tenant (/[tenant]/dashboard)
- Automatic tenant context
- Custom configuration per institution
- Adaptable theming and branding

**Advanced Forms**
- Real-time validation with Zod
- Unified error handling
- Loading states and visual feedback
- Complete accessibility (ARIA)

### Configuration and Installation

#### Prerequisites
```bash
# Required versions
Node.js >= 18.0.0
npm >= 8.0.0
```

#### 1. Dependency Installation
```bash
cd frontend
npm install
```

#### 2. Environment Variable Configuration
```bash
# Copy configuration file
cp .env.example .env.local

# Main variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_DEFAULT_TENANT=demo

# reCAPTCHA v3 (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
NEXT_PUBLIC_RECAPTCHA_ENABLED=true

# Development configuration
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

#### 3. Start Development Environment
```bash
# Development server with hot-reload
npm run dev

# Available at: http://localhost:3001
```

### Available Scripts

```bash
# Development
npm run dev              # Development server at http://localhost:3001
npm run dev:turbo        # Development with Turbopack (experimental)

# Build
npm run build           # Compile for production
npm run start           # Run compiled version
npm run export          # Export static site

# Code quality
npm run lint            # ESLint with Next.js configuration
npm run lint:fix        # ESLint with auto-correction
npm run type-check      # TypeScript type checking
npm run format          # Prettier formatting

# Testing
npm run test            # Unit tests (Jest + Testing Library)
npm run test:watch      # Tests in watch mode
npm run test:coverage   # Tests with coverage report

# Analysis
npm run analyze         # Production bundle analysis
npm run lighthouse      # Performance audit
```

### Interface Features

#### Authentication Pages
**Login (`/login`)**
- Form with real-time validation
- Automatic tenant selection
- Invisible reCAPTCHA v3
- Specific error handling
- Automatic post-login redirection

**Registration (`/register`)**
- New user registration
- Robust password validation
- Email confirmation (planned)
- Terms and conditions

#### Multi-Tenant Dashboard
**Dynamic Routes (`/[tenant]/...`)**
```bash
/demo/dashboard         # Main dashboard
/demo/patients          # Patient management
/demo/appointments      # Appointment system
/demo/professionals     # Staff management
/demo/settings          # Tenant configuration
```

#### Design System Components
**Base UI (`components/ui/`)**
- Button: Buttons with variants and states
- Input: Input fields with visual validation
- Modal: Accessible modal dialogs
- Toast: Non-intrusive notifications
- Card: Information containers
- Table: Tables with pagination and filters

**Forms (`components/forms/`)**
- LoginForm: Authentication form
- PatientForm: Patient registration
- AppointmentForm: Appointment scheduling
- UserForm: User management

### HTTP Client Configuration

#### API Client (`lib/api-client.ts`)
```typescript
// Automatic header and interceptor configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor for automatic JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic refresh token handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Automatic refresh token logic
      return handleTokenRefresh(error);
    }
    return Promise.reject(error);
  }
);
```

#### TypeScript Types (`lib/types.ts`)
```typescript
// Types shared with backend
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenant: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  emergencyContact: EmergencyContact;
}
```

### Security and Performance

#### Security Measures
- **CSP**: Configured Content Security Policy
- **CSRF**: Cross-Site Request Forgery protection
- **XSS**: Automatic input sanitization
- **reCAPTCHA**: Bot protection in forms
- **JWT**: Secure token handling with expiration

#### Performance Optimizations
- **Code Splitting**: Lazy component loading
- **Image Optimization**: Next.js Image with automatic WebP
- **Bundle Analysis**: Bundle size analysis
- **Caching**: Browser cache strategies
- **Compression**: Gzip/Brotli in production

### Upcoming Features

#### In Development
- **Advanced Dashboard**: Real-time metrics and charts
- **Notification System**: Native push notifications
- **Smart Calendar**: Calendar view for appointments
- **Real-time Chat**: Staff communication
- **Telemedicine**: Video consultation interface

#### Planned Improvements
- **PWA**: Complete Progressive Web App
- **Offline Mode**: Offline functionality
- **Dark Mode**: Adaptive dark theme
- **Internationalization**: Multi-language support
- **Accessibility**: WCAG 2.1 AA improvements

---

<div align="center">

**Free and Open Source Healthcare Management System**

[Live Demo](http://demo.localhost:3001) | [GitHub Repository](https://github.com/AKira-IV/Hikari)

Licensed under MIT - Built with love for global healthcare accessibility

</div>
