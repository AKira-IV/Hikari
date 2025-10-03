# 🐳 Guía Paso a Paso: Configuración de Docker para Hikari

## 🎯 Objetivo
Configurar Hikari Medical Platform con Docker Desktop en Windows

---

## 📋 Paso 1: Verificar Docker Desktop

### Verificar instalación:
```cmd
# En Command Prompt o PowerShell
docker --version
docker-compose --version
```

### Si Docker no está instalado:
1. Descargar de: https://www.docker.com/products/docker-desktop/
2. Instalar con configuración por defecto
3. Reiniciar el sistema
4. Abrir Docker Desktop y esperar a que inicie completamente

### Si Docker está instalado pero no funciona:
1. Abrir Docker Desktop desde el menú de inicio
2. Esperar a que el ícono en la bandeja del sistema se vuelva verde
3. Verificar que WSL2 esté habilitado

---

## 🚀 Paso 2: Configuración de Hikari

### Opción A: 🐳 Todo con Docker (Recomendado)
```cmd
cd C:\Users\Akira\Develop\Hikari

# Verificar que Docker funciona
docker run hello-world

# Si funciona, continuar:
docker-compose -f docker-compose.dev.yml up --build
```

### Opción B: 🔀 Solo Base de Datos con Docker
```cmd
cd C:\Users\Akira\Develop\Hikari

# Solo PostgreSQL en Docker
docker run --name hikari-postgres ^
  -e POSTGRES_USER=hikari_user ^
  -e POSTGRES_PASSWORD=hikari_password ^
  -e POSTGRES_DB=hikari ^
  -p 5432:5432 ^
  -d postgres:15-alpine

# Esperar 10 segundos y verificar
docker ps

# Iniciar aplicaciones localmente
cd backend && npm run start:dev
# En otra terminal:
cd frontend && npm run dev
```

---

## 🌐 Paso 3: Acceder al Sistema

Una vez que todo esté funcionando:

- **Frontend**: http://localhost:3001 o http://localhost:3003
- **Backend**: http://localhost:3000
- **Storybook**: http://localhost:6006
- **Base de datos**: localhost:5432

---

## 🔧 Solución de Problemas Comunes

### Docker Desktop no inicia:
1. Verificar que Hyper-V esté habilitado (Windows Features)
2. Verificar que WSL2 esté instalado: `wsl --list --verbose`
3. Reiniciar el servicio: Task Manager → Services → Docker Desktop Service

### Puertos ocupados:
```cmd
# Ver qué está usando un puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5432

# Terminar proceso por PID
taskkill /F /PID [número]
```

### Error de permisos:
- Ejecutar terminal como Administrador
- Verificar que Docker tenga permisos para acceder a archivos

---

## 📝 Comandos Útiles

```cmd
# Ver contenedores ejecutándose
docker ps

# Ver logs de un contenedor
docker logs [nombre_contenedor]

# Parar todos los contenedores
docker stop $(docker ps -q)

# Limpiar el sistema Docker
docker system prune -f

# Reconstruir todo
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

---

## 🎉 Siguiente Paso

Una vez que tengas Docker funcionando, puedes usar estos comandos para desarrollo diario:

```cmd
# Iniciar desarrollo
make dev-up

# Ver logs
make dev-logs

# Parar
make dev-down

# Limpiar y reconstruir
make dev-build
```
