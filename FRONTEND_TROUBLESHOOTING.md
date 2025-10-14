# Guía de Problemas del Frontend y Soluciones

## 🔍 **Problemas Identificados**

### 1. **Problemas de Memoria**
- **Sistema:** Fedora 42 con ~7.5GB RAM total, pero solo ~600MB disponibles
- **Causa:** Múltiples procesos de VSCode consumiendo 400-500MB cada uno
- **Síntoma:** Frontend se cuelga o termina inesperadamente

### 2. **Conflictos de Puerto**
- **Puerto 3001** a veces queda ocupado por procesos zombie
- **Síntoma:** Error "EADDRINUSE" al iniciar

### 3. **Cache de Next.js**
- **Archivo .next** a veces se corrompe
- **Síntoma:** Errores de compilación extraños

## ✅ **Soluciones Implementadas**

### 1. **Script Robusto de Inicio**
```bash
./start-frontend-robust.sh
```
- Detecta memoria disponible automáticamente
- Limpia procesos anteriores
- Libera puertos ocupados
- Configura límites de memoria apropiados

### 2. **Modo de Baja Memoria**
```bash
npm run dev:low-memory
```
- Limita Node.js a 512MB de RAM
- Deshabilita telemetría de Next.js
- Optimiza configuración de webpack

### 3. **Configuración Optimizada**
- **next.config.mjs:** Configurado para sistemas con poca memoria
- **package.json:** Scripts adicionales para diferentes escenarios
- **Webpack:** Split chunks optimizado

## 🚀 **Comandos Recomendados**

### Para Inicio Automático:
```bash
# Script que maneja todo automáticamente
./start-services.sh
```

### Para Inicio Manual del Frontend:
```bash
# Si tienes poca memoria
cd frontend && npm run dev:low-memory

# Si tienes suficiente memoria
cd frontend && npm run dev
```

### Para Resolución de Problemas:
```bash
# Limpiar procesos frontend
pkill -f "next dev"

# Limpiar puerto 3001
fuser -k 3001/tcp

# Limpiar cache de Next.js
rm -rf frontend/.next

# Verificar memoria
free -h

# Verificar procesos consumiendo memoria
ps aux | grep node | head -10
```

## 📊 **Monitoreo del Sistema**

### Verificar Memoria:
```bash
free -h
# Recomendado: >500MB disponibles para frontend
```

### Verificar Procesos:
```bash
ps aux | grep -E "(next|npm)" | grep -v grep
# Debe mostrar solo los procesos activos necesarios
```

### Verificar Puertos:
```bash
netstat -tulpn | grep -E ":(3000|3001)"
# 3000: Backend, 3001: Frontend
```

## ⚡ **Optimizaciones para Fedora**

### 1. **Configurar Swap** (si es necesario):
```bash
sudo swapon --show
# Verificar que el swap esté activo
```

### 2. **Cerrar Aplicaciones Innecesarias**:
- Cerrar pestañas de navegador innecesarias
- Cerrar aplicaciones pesadas cuando desarrolles
- Considerar cerrar algunas ventanas de VSCode

### 3. **Variables de Entorno Permanentes**:
```bash
# Agregar a ~/.bashrc
export NODE_OPTIONS="--max-old-space-size=512"
export NEXT_TELEMETRY_DISABLED=1
```

## 🎯 **Próximos Pasos**

1. **Siempre usar** `./start-services.sh` para iniciar el proyecto
2. **Monitorear memoria** regularmente con `free -h`
3. **Cerrar VSCode** ocasionalmente para liberar memoria
4. **Usar modo de baja memoria** cuando la memoria sea <800MB

## 🛠️ **Scripts Disponibles**

- `./start-services.sh` - Inicio completo automático
- `./start-frontend-robust.sh` - Solo frontend robusto
- `./setup-db.sh` - Solo base de datos
- `./fix-linux-setup.sh` - Configuración inicial

¡El frontend ahora debería ser mucho más estable en tu sistema Fedora 42!