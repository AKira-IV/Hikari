# Hikari - Sistema de Gestión Hospitalaria

Hikari es un sistema de gestión hospitalaria basado en la experiencia y estructura de SIGEHOS, pero mejorado para ofrecer escalabilidad, modularidad y tecnologías modernas.

## Tecnologías Utilizadas

### Backend
- **Framework:** NestJS (Node.js)
- **Base de Datos:** PostgreSQL (con posibilidad de migrar a CockroachDB)
- **Autenticación:** OAuth2 / JWT
- **Infraestructura:** Docker, Kubernetes
- **Pruebas:** Jest, Cypress
- **CI/CD:** GitHub/GitLab CI/CD

### Frontend
- **Framework:** React con Next.js
- **UI/UX:** Design System en Figma
- **Pruebas:** Storybook

## Roadmap del Proyecto

### Fase 1: Configuración y Base del Proyecto
- [ ] Inicializar repositorios en GitHub/GitLab
- [ ] Configurar Docker y Docker Compose
- [ ] Configurar CI/CD
- [ ] Configurar entorno de desarrollo (NestJS, Next.js, PostgreSQL)

### Fase 2: Módulos Iniciales
- [ ] Autenticación y Gestión de Usuarios
- [ ] Módulo de Pacientes
- [ ] Módulo de Profesionales
- [ ] Módulo de Citas Médicas

### Fase 3: Integraciones y Mejoras
- [ ] Seguridad y encriptación de datos
- [ ] Integración con APIs externas (Ej: Sistemas de facturación, historia clínica electrónica)
- [ ] Optimización del rendimiento
- [ ] Pruebas de carga y estabilidad

### Fase 4: Despliegue y Monitoreo
- [ ] Configurar despliegue en Kubernetes
- [ ] Implementar monitoreo y logging
- [ ] Documentación completa y onboarding

## Instalación y Uso

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/hikari.git
   cd hikari
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

