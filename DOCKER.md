# Docker Setup Guide para Hikari

## Prerrequisitos

### Windows
1. **Docker Desktop**: Descargar e instalar desde [docker.com](https://www.docker.com/products/docker-desktop/)
2. **WSL2**: Habilitar Windows Subsystem for Linux 2
3. **Git**: Para clonar el repositorio

### Linux/macOS
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Inicio Rápido

### 1. Clonar y Setup Inicial
```bash
git clone https://github.com/AKira-IV/Hikari.git
cd Hikari

# Si tienes Make instalado (recomendado)
make dev-setup

# O manualmente
docker compose -f docker-compose.dev.yml up -d --build
```

### 2. Verificar que todo esté funcionando
```bash
# Verificar servicios
docker compose -f docker-compose.dev.yml ps

# Ver logs
docker compose -f docker-compose.dev.yml logs -f

# Cargar datos de prueba
docker compose -f docker-compose.dev.yml exec backend-dev npm run seed
```

### 3. Acceder a la aplicación
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api
- **Adminer (DB Admin)**: http://localhost:8080
- **Health Check**: http://localhost:3000/health

## Comandos Útiles

### Desarrollo
```bash
# Iniciar entorno de desarrollo
docker compose -f docker-compose.dev.yml up -d

# Ver logs en tiempo real
docker compose -f docker-compose.dev.yml logs -f

# Parar servicios
docker compose -f docker-compose.dev.yml down

# Rebuildar imágenes
docker compose -f docker-compose.dev.yml build --no-cache

# Ejecutar comandos en contenedor
docker compose -f docker-compose.dev.yml exec backend-dev npm run test
docker compose -f docker-compose.dev.yml exec backend-dev npm run seed

# Acceder al shell del contenedor
docker compose -f docker-compose.dev.yml exec backend-dev sh
```

### Producción
```bash
# Iniciar producción
docker compose up -d --build

# Ver logs
docker compose logs -f

# Parar servicios
docker compose down
```

### Base de Datos
```bash
# Conectar a PostgreSQL
docker compose -f docker-compose.dev.yml exec db-dev psql -U hikari_user -d hikari

# Backup de la base de datos
docker compose -f docker-compose.dev.yml exec db-dev pg_dump -U hikari_user -d hikari > backup.sql

# Restaurar backup
docker compose -f docker-compose.dev.yml exec -T db-dev psql -U hikari_user -d hikari < backup.sql

# Reset completo de la base de datos
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d db-dev
```

## Estructura de Archivos Docker

```
Hikari/
├── docker-compose.yml          # Producción
├── docker-compose.dev.yml      # Desarrollo
├── backend/
│   ├── Dockerfile             # Imagen producción
│   ├── Dockerfile.dev         # Imagen desarrollo
│   ├── .dockerignore          # Archivos excluidos
│   └── health-check.js        # Health check script
└── frontend/
    └── Dockerfile             # Imagen frontend
```

## Troubleshooting

### Problema: Puertos ocupados
```bash
# Ver qué está usando el puerto 3000
netstat -tulpn | grep 3000

# Cambiar puertos en docker-compose.dev.yml
ports:
  - "3001:3000"  # Puerto externo:interno
```

### Problema: Base de datos no conecta
```bash
# Verificar salud de la base de datos
docker compose -f docker-compose.dev.yml exec db-dev pg_isready -U hikari_user -d hikari

# Ver logs de la base de datos
docker compose -f docker-compose.dev.yml logs db-dev

# Recrear volumen de base de datos
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d db-dev
```

### Problema: Backend no inicia
```bash
# Ver logs detallados
docker compose -f docker-compose.dev.yml logs backend-dev

# Verificar variables de entorno
docker compose -f docker-compose.dev.yml exec backend-dev env

# Rebuildar imagen
docker compose -f docker-compose.dev.yml build --no-cache backend-dev
```

### Problema: Cambios no se reflejan
```bash
# Para código fuente (development)
# Los cambios se sincronizan automáticamente con volumes

# Para dependencias (package.json cambió)
docker compose -f docker-compose.dev.yml build backend-dev
docker compose -f docker-compose.dev.yml up -d backend-dev
```

## Limpieza

### Limpieza básica
```bash
# Parar y eliminar contenedores
docker compose -f docker-compose.dev.yml down

# Eliminar también volúmenes
docker compose -f docker-compose.dev.yml down -v
```

### Limpieza completa
```bash
# Eliminar todas las imágenes de Hikari
docker images | grep hikari | awk '{print $3}' | xargs docker rmi -f

# Limpiar sistema Docker
docker system prune -a -f

# Limpiar volúmenes huérfanos
docker volume prune -f
```

## Monitoreo

### Verificar salud de servicios
```bash
# Health check del backend
curl http://localhost:3000/health

# Estado de contenedores
docker compose -f docker-compose.dev.yml ps

# Usar el script de health check
make health
```

### Ver recursos utilizados
```bash
# Uso de recursos por contenedor
docker stats

# Uso de espacio
docker system df
```

## Seguridad en Producción

### Variables de entorno
```bash
# No usar las claves por defecto en producción
JWT_SECRET=tu-clave-super-secreta-y-larga
DATABASE_PASSWORD=password-fuerte-y-aleatorio
```

### Redes Docker
```bash
# Los contenedores se comunican por red interna
# Solo los puertos necesarios están expuestos
```

### Backups automatizados
```bash
# Crear script de backup
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker compose exec -T db pg_dump -U hikari_user -d hikari > "backup_${DATE}.sql"
```

## Referencias

- [Docker Compose Reference](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Node.js Best Practices with Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
