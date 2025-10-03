#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Hikari Medical Platform${NC}"
echo -e "${YELLOW}📋 Configurando entorno de desarrollo...${NC}"

# Cambiar al directorio del proyecto
cd "$(dirname "$0")"

# Función para verificar si un puerto está en uso
check_port() {
    local port=$1
    local service=$2
    if netstat -an | grep ":$port " > /dev/null; then
        echo -e "${YELLOW}⚠️  Puerto $port ya está en uso (probablemente $service)${NC}"
        return 0
    else
        echo -e "${GREEN}✅ Puerto $port disponible${NC}"
        return 1
    fi
}

echo -e "\n${BLUE}🔍 Verificando puertos...${NC}"
check_port 3000 "Backend"
check_port 3001 "Frontend"
check_port 5432 "PostgreSQL"

echo -e "\n${BLUE}🏗️  Instalando dependencias...${NC}"

# Backend
echo -e "${YELLOW}📦 Instalando dependencias del backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Frontend
echo -e "${YELLOW}📦 Instalando dependencias del frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo -e "\n${GREEN}✅ Dependencias instaladas${NC}"

echo -e "\n${BLUE}🗄️  Configurando base de datos...${NC}"
echo -e "${YELLOW}📋 Para usar PostgreSQL local, asegúrate de tener PostgreSQL instalado y configurado${NC}"
echo -e "${YELLOW}📋 Alternativamente, usa Docker para la base de datos:${NC}"
echo -e "${YELLOW}   docker run --name hikari-postgres -e POSTGRES_USER=hikari_user -e POSTGRES_PASSWORD=hikari_password -e POSTGRES_DB=hikari -p 5432:5432 -d postgres:15-alpine${NC}"

echo -e "\n${BLUE}🚀 Iniciando servicios...${NC}"
echo -e "${GREEN}✅ Todo listo! Usa los siguientes comandos para iniciar los servicios:${NC}"
echo -e "${YELLOW}Backend:  cd backend && npm run start:dev${NC}"
echo -e "${YELLOW}Frontend: cd frontend && npm run dev${NC}"
echo -e "${YELLOW}Storybook: cd frontend && npm run storybook${NC}"

echo -e "\n${BLUE}🌐 URLs del sistema:${NC}"
echo -e "${GREEN}Frontend: http://localhost:3001${NC}"
echo -e "${GREEN}Backend:  http://localhost:3000${NC}"
echo -e "${GREEN}Storybook: http://localhost:6006${NC}"
echo -e "${GREEN}Database: localhost:5432${NC}"

echo -e "\n${BLUE}📚 Documentación adicional en README.md${NC}"
