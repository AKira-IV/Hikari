@echo off
echo.
echo ========================================
echo    🚀 Hikari Medical Platform
echo ========================================
echo.

echo 📋 Configurando entorno de desarrollo...
cd /d "%~dp0"

echo.
echo 🔍 Verificando puertos...
netstat -an | findstr ":3000" > nul && echo ⚠️  Puerto 3000 ya está en uso (Backend) || echo ✅ Puerto 3000 disponible
netstat -an | findstr ":3001" > nul && echo ⚠️  Puerto 3001 ya está en uso (Frontend) || echo ✅ Puerto 3001 disponible
netstat -an | findstr ":5432" > nul && echo ⚠️  Puerto 5432 ya está en uso (PostgreSQL) || echo ✅ Puerto 5432 disponible

echo.
echo 🏗️  Verificando dependencias...

echo 📦 Backend...
cd backend
if not exist "node_modules" (
    echo Instalando dependencias del backend...
    call npm install
) else (
    echo ✅ Dependencias del backend ya instaladas
)
cd ..

echo 📦 Frontend...
cd frontend
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    call npm install
) else (
    echo ✅ Dependencias del frontend ya instaladas
)
cd ..

echo.
echo ✅ Dependencias verificadas
echo.
echo 🗄️  Configuración de base de datos:
echo 📋 Para PostgreSQL local, asegúrate de tenerlo instalado y configurado
echo 📋 Alternativamente, usa Docker para la base de datos:
echo    docker run --name hikari-postgres -e POSTGRES_USER=hikari_user -e POSTGRES_PASSWORD=hikari_password -e POSTGRES_DB=hikari -p 5432:5432 -d postgres:15-alpine
echo.
echo 🚀 Para iniciar el sistema completo:
echo.
echo ✅ Backend:   cd backend ^&^& npm run start:dev
echo ✅ Frontend:  cd frontend ^&^& npm run dev
echo ✅ Storybook: cd frontend ^&^& npm run storybook
echo.
echo 🌐 URLs del sistema:
echo ✅ Frontend:  http://localhost:3001
echo ✅ Backend:   http://localhost:3000
echo ✅ Storybook: http://localhost:6006
echo ✅ Database:  localhost:5432
echo.
echo 📚 Consulta README.md para más información
echo.
pause
