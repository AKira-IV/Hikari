#!/bin/bash

# Hikari Linux Setup Fix Script
# Este script resuelve los problemas específicos de Linux para el proyecto Hikari

echo -e "\033[0;34m🔧 Hikari Linux Setup Fix\033[0m"
echo "================================================"

# Variables de colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Cambiar al directorio del proyecto
cd "$(dirname "$0")"

echo -e "\n${BLUE}1. Verificando permisos de scripts...${NC}"
if [ ! -x "./start-dev.sh" ] || [ ! -x "./setup-db.sh" ]; then
    echo -e "${YELLOW}⚠️  Corrigiendo permisos de scripts...${NC}"
    chmod +x ./*.sh
    echo -e "${GREEN}✅ Permisos corregidos${NC}"
else
    echo -e "${GREEN}✅ Permisos correctos${NC}"
fi

echo -e "\n${BLUE}2. Verificando archivos de configuración...${NC}"

# Verificar y crear .env para backend
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}📄 Creando archivo .env para backend...${NC}"
    cat > backend/.env << EOF
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=hikari_user
DATABASE_PASSWORD=hikari_password
DATABASE_NAME=hikari

# JWT Configuration
JWT_SECRET=dev-super-secret-jwt-key
JWT_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION_DAYS=7

# Application Configuration
NODE_ENV=development
PORT=3000

# Captcha Configuration
RECAPTCHA_ENABLED=false
RECAPTCHA_SECRET=
RECAPTCHA_MIN_SCORE=0.5
EOF
    echo -e "${GREEN}✅ Archivo backend/.env creado${NC}"
else
    echo -e "${GREEN}✅ Archivo backend/.env ya existe${NC}"
fi

# Verificar y crear .env para frontend
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}📄 Creando archivo .env para frontend...${NC}"
    cat > frontend/.env << EOF
# Frontend environment
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
EOF
    echo -e "${GREEN}✅ Archivo frontend/.env creado${NC}"
else
    echo -e "${GREEN}✅ Archivo frontend/.env ya existe${NC}"
fi

echo -e "\n${BLUE}3. Verificando configuración de puertos...${NC}"

# Verificar configuración de puerto del frontend
if ! grep -q "next dev -p 3001" frontend/package.json; then
    echo -e "${YELLOW}🔧 Corrigiendo puerto del frontend...${NC}"
    sed -i 's/"next dev"/"next dev -p 3001"/' frontend/package.json
    echo -e "${GREEN}✅ Puerto del frontend configurado a 3001${NC}"
else
    echo -e "${GREEN}✅ Puerto del frontend ya configurado correctamente${NC}"
fi

echo -e "\n${BLUE}4. Verificando dependencias de seguridad...${NC}"
cd frontend
if npm audit --audit-level=critical | grep -q "critical"; then
    echo -e "${YELLOW}🔒 Corrigiendo vulnerabilidades de seguridad...${NC}"
    npm audit fix --force
    echo -e "${GREEN}✅ Vulnerabilidades corregidas${NC}"
else
    echo -e "${GREEN}✅ No hay vulnerabilidades críticas${NC}"
fi
cd ..

echo -e "\n${BLUE}5. Verificando Docker...${NC}"
if ! docker ps >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker no está ejecutándose${NC}"
    echo -e "${YELLOW}📋 Para iniciar Docker en Fedora:${NC}"
    echo -e "${YELLOW}   sudo systemctl start docker${NC}"
    echo -e "${YELLOW}   sudo systemctl enable docker${NC}"
    echo -e "${YELLOW}   sudo usermod -aG docker \$USER${NC}"
    echo -e "${YELLOW}   (reinicia la sesión después del usermod)${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Docker está ejecutándose${NC}"
fi

echo -e "\n${BLUE}6. Verificando Node.js y npm...${NC}"
NODE_VERSION=$(node --version 2>/dev/null || echo "no instalado")
NPM_VERSION=$(npm --version 2>/dev/null || echo "no instalado")

if [[ "$NODE_VERSION" == "no instalado" ]]; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo -e "${YELLOW}📋 Para instalar Node.js en Fedora:${NC}"
    echo -e "${YELLOW}   sudo dnf install nodejs npm${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
    echo -e "${GREEN}✅ npm $NPM_VERSION${NC}"
fi

echo -e "\n${GREEN}🎉 ¡Configuración de Linux completada!${NC}"

echo -e "\n${BLUE}6. Inicializando datos demo...${NC}"
echo -e "${YELLOW}📋 Creando usuarios de prueba...${NC}"
cd backend
npm run seed > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Datos demo creados correctamente${NC}"
    echo -e "${YELLOW}📄 Revisa DEMO_CREDENTIALS.md para las credenciales${NC}"
else
    echo -e "${YELLOW}⚠️  El seeding fallará hasta que inicies la base de datos${NC}"
fi
cd ..

echo -e "\n${GREEN}🎉 ¡Configuración completa!${NC}"
echo -e "\n${BLUE}📋 Próximos pasos:${NC}"
echo -e "${YELLOW}1. Ejecutar la base de datos:${NC}"
echo -e "   ./setup-db.sh"
echo -e "\n${YELLOW}2. Iniciar el desarrollo:${NC}"
echo -e "   make local-dev"
echo -e "   # O manualmente:"
echo -e "   cd backend && npm run start:dev"
echo -e "   cd frontend && npm run dev"
echo -e "\n${YELLOW}3. URLs del sistema:${NC}"
echo -e "   Frontend: http://localhost:3001"
echo -e "   Backend:  http://localhost:3000"
echo -e "   API Docs: http://localhost:3000/api"
echo -e "   DB Admin: http://localhost:8080 (con docker-compose)"
echo -e "\n${BLUE}💡 Tip: Usa 'make help' para ver todos los comandos disponibles${NC}"