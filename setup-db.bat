@echo off
echo.
echo ========================================
echo   🚀 Configurando Hikari con Docker
echo ========================================
echo.

echo 🔍 Verificando Docker...
docker ps >nul 2>nul
if errorlevel 1 (
    echo ❌ Docker no está ejecutándose.
    echo.
    echo 📋 Soluciones:
    echo    1. Abrir Docker Desktop desde el menú de inicio
    echo    2. Esperar a que el ícono en la bandeja del sistema se vuelva verde
    echo    3. Ejecutar este script nuevamente
    echo.
    echo 🔧 Alternativamente, puedes:
    echo    - Instalar PostgreSQL localmente
    echo    - Configurar la base de datos manualmente
    echo.
    pause
    exit /b 1
)

echo ✅ Docker está ejecutándose

echo.
echo 🧹 Limpiando contenedores anteriores...
docker stop hikari-postgres >nul 2>nul
docker rm hikari-postgres >nul 2>nul

echo.
echo 🗄️ Iniciando PostgreSQL...
docker run --name hikari-postgres ^
  -e POSTGRES_USER=hikari_user ^
  -e POSTGRES_PASSWORD=hikari_password ^
  -e POSTGRES_DB=hikari ^
  -p 5432:5432 ^
  -d postgres:15-alpine

echo.
echo ⏳ Esperando a que PostgreSQL esté listo...
timeout /t 10 /nobreak >nul

echo.
echo 🔍 Verificando estado...
docker ps | findstr hikari-postgres >nul
if errorlevel 1 (
    echo ❌ Error al iniciar PostgreSQL
    echo.
    echo 📋 Logs del contenedor:
    docker logs hikari-postgres
    pause
    exit /b 1
)

echo ✅ PostgreSQL iniciado correctamente
echo.
echo 📋 Configuración:
echo    Host: localhost
echo    Puerto: 5432
echo    Usuario: hikari_user
echo    Contraseña: hikari_password
echo    Base de datos: hikari
echo.
echo 🚀 Ahora puedes iniciar el backend:
echo    cd backend ^&^& npm run start:dev
echo.
echo 🌐 Y el frontend en otra terminal:
echo    cd frontend ^&^& npm run dev
echo.
pause
