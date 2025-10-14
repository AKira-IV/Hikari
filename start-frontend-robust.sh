#!/bin/bash

# Script robusto para iniciar el frontend de Hikari
# Maneja problemas de memoria y asegura estabilidad

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando Frontend Hikari (Modo Robusto)${NC}"

# Cambiar al directorio del frontend
cd "$(dirname "$0")/frontend"

# Verificar memoria disponible
AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $7}')
echo -e "${BLUE}💾 Memoria disponible: ${AVAILABLE_MEM}MB${NC}"

if [ "$AVAILABLE_MEM" -lt 500 ]; then
    echo -e "${YELLOW}⚠️  Memoria baja detectada. Optimizando...${NC}"
    # Configurar variables de entorno para optimizar memoria
    export NODE_OPTIONS="--max-old-space-size=512"
    export NEXT_TELEMETRY_DISABLED=1
else
    export NODE_OPTIONS="--max-old-space-size=1024"
fi

# Limpiar procesos zombies de Next.js
echo -e "${YELLOW}🧹 Limpiando procesos anteriores...${NC}"
pkill -f "next dev" 2>/dev/null || true
sleep 2

# Verificar si el puerto está libre
if netstat -an | grep ":3001 " > /dev/null; then
    echo -e "${RED}❌ Puerto 3001 en uso. Liberando...${NC}"
    fuser -k 3001/tcp 2>/dev/null || true
    sleep 2
fi

# Limpiar cache de Next.js si existe
if [ -d ".next" ]; then
    echo -e "${YELLOW}🗑️  Limpiando cache de Next.js...${NC}"
    rm -rf .next
fi

echo -e "${BLUE}🔧 Configuraciones aplicadas:${NC}"
echo -e "   Node memory limit: $(echo $NODE_OPTIONS | cut -d'=' -f2)"
echo -e "   Telemetry: disabled"
echo -e "   Puerto: 3001"

echo -e "\n${GREEN}🎯 Iniciando servidor de desarrollo...${NC}"

# Función para manejar señales
cleanup() {
    echo -e "\n${YELLOW}🛑 Deteniendo servidor...${NC}"
    pkill -P $$ 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar con configuración optimizada
npm run dev 2>&1 | while IFS= read -r line; do
    echo "$line"
    
    # Detectar errores críticos
    if echo "$line" | grep -q "EADDRINUSE\|Error:"; then
        echo -e "${RED}❌ Error detectado: $line${NC}"
    fi
    
    # Confirmar cuando esté listo
    if echo "$line" | grep -q "Ready in\|Local:"; then
        echo -e "${GREEN}✅ Frontend listo en http://localhost:3001${NC}"
    fi
done