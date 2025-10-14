#!/bin/bash

# Script para iniciar Frontend y Backend de Hikari
# Este script facilita el inicio de ambos servicios

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando Hikari - Frontend y Backend${NC}"
echo "================================================"

# Cambiar al directorio del proyecto
cd "$(dirname "$0")"

# Verificar que la base de datos esté corriendo
echo -e "\n${BLUE}🔍 Verificando base de datos...${NC}"
if ! docker ps | grep hikari-postgres > /dev/null; then
    echo -e "${RED}❌ Base de datos no está ejecutándose${NC}"
    echo -e "${YELLOW}💡 Ejecuta primero: ./setup-db.sh${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Base de datos está corriendo${NC}"

# Función para verificar si un puerto está en uso
check_port() {
    local port=$1
    local service=$2
    if netstat -an | grep ":$port " > /dev/null; then
        echo -e "${GREEN}✅ $service está corriendo en puerto $port${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Puerto $port no está en uso para $service${NC}"
        return 1
    fi
}

echo -e "\n${BLUE}🔍 Verificando servicios...${NC}"

# Verificar backend
if ! check_port 3000 "Backend"; then
    echo -e "${YELLOW}🔧 Iniciando backend...${NC}"
    cd backend
    npm run start:dev &
    BACKEND_PID=$!
    echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
    cd ..
    sleep 3
fi

# Verificar frontend
if ! check_port 3001 "Frontend"; then
    echo -e "${YELLOW}🔧 Iniciando frontend (modo optimizado)...${NC}"
    cd frontend
    
    # Detectar memoria disponible y usar modo apropiado
    AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $7}')
    if [ "$AVAILABLE_MEM" -lt 800 ]; then
        echo -e "${YELLOW}💾 Memoria limitada ($AVAILABLE_MEM MB). Usando modo de baja memoria...${NC}"
        nohup npm run dev:low-memory > frontend.log 2>&1 &
    else
        nohup npm run dev > frontend.log 2>&1 &
    fi
    
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
    cd ..
    sleep 8
fi

echo -e "\n${BLUE}🌐 Verificando accesibilidad...${NC}"

# Verificar backend
echo -e "${YELLOW}Probando backend...${NC}"
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ Backend accesible en http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Backend no responde${NC}"
fi

# Verificar frontend
echo -e "${YELLOW}Probando frontend...${NC}"
if curl -s -I http://localhost:3001 > /dev/null; then
    echo -e "${GREEN}✅ Frontend accesible en http://localhost:3001${NC}"
else
    echo -e "${RED}❌ Frontend no responde${NC}"
fi

echo -e "\n${GREEN}🎉 ¡Servicios iniciados!${NC}"
echo -e "\n${BLUE}📋 URLs del sistema:${NC}"
echo -e "   ${GREEN}Frontend:${NC} http://localhost:3001"
echo -e "   ${GREEN}Backend:${NC}  http://localhost:3000"
echo -e "   ${GREEN}API Docs:${NC} http://localhost:3000/api"
echo -e "   ${GREEN}Health:${NC}   http://localhost:3000/health"

echo -e "\n${BLUE}🔐 Credenciales demo:${NC}"
echo -e "   ${GREEN}Admin:${NC}  admin@demo.com"
echo -e "   ${GREEN}Doctor:${NC} doctor@demo.com"  
echo -e "   ${GREEN}Nurse:${NC}  nurse@demo.com"
echo -e "   ${YELLOW}📄 Ver DEMO_CREDENTIALS.md para passwords${NC}"

echo -e "\n${BLUE}💡 Comandos útiles:${NC}"
echo -e "   ${YELLOW}Parar servicios:${NC} pkill -f 'npm run' || pkill -f 'next dev'"
echo -e "   ${YELLOW}Ver logs backend:${NC} tail -f backend logs"
echo -e "   ${YELLOW}Ver logs frontend:${NC} tail -f frontend logs"
echo -e "   ${YELLOW}Reiniciar BD:${NC} ./setup-db.sh"

echo -e "\n${GREEN}🖥️  Abre tu navegador en: http://localhost:3001${NC}"