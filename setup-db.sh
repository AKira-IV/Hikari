#!/bin/bash

echo "🚀 Configurando Hikari con Docker (Base de datos)"
echo "================================================"

# Verificar si Docker está ejecutándose
echo "🔍 Verificando Docker..."
if ! docker ps >/dev/null 2>&1; then
    echo "❌ Docker no está ejecutándose."
    echo "📋 Soluciones:"
    echo "   1. Abrir Docker Desktop desde el menú de inicio"
    echo "   2. Esperar a que el ícono en la bandeja del sistema se vuelva verde"
    echo "   3. Ejecutar este script nuevamente"
    echo ""
    echo "🔧 Alternativamente, puedes:"
    echo "   - Instalar PostgreSQL localmente"
    echo "   - Configurar la base de datos manualmente"
    exit 1
fi

echo "✅ Docker está ejecutándose"

# Parar contenedor anterior si existe
echo "🧹 Limpiando contenedores anteriores..."
docker stop hikari-postgres 2>/dev/null || true
docker rm hikari-postgres 2>/dev/null || true

# Iniciar PostgreSQL
echo "🗄️ Iniciando PostgreSQL..."
docker run --name hikari-postgres \
  -e POSTGRES_USER=hikari_user \
  -e POSTGRES_PASSWORD=hikari_password \
  -e POSTGRES_DB=hikari \
  -p 5432:5432 \
  -d postgres:15-alpine

# Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 10

# Verificar que está funcionando
if docker ps | grep hikari-postgres >/dev/null; then
    echo "✅ PostgreSQL iniciado correctamente"
    echo "📋 Configuración:"
    echo "   Host: localhost"
    echo "   Puerto: 5432"
    echo "   Usuario: hikari_user"
    echo "   Contraseña: hikari_password"
    echo "   Base de datos: hikari"
    echo ""
    echo "🚀 Ahora puedes iniciar el backend:"
    echo "   cd backend && npm run start:dev"
else
    echo "❌ Error al iniciar PostgreSQL"
    docker logs hikari-postgres
    exit 1
fi
