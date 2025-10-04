# Hikari - Credenciales de Desarrollo

## Usuarios Demo Creados

### Administrador
- **Email:** admin@demo.com
- **Password:** admin123
- **Rol:** ADMIN

### Doctor
- **Email:** doctor@demo.com  
- **Password:** doctor123
- **Rol:** DOCTOR

### Enfermera
- **Email:** nurse@demo.com
- **Password:** nurse123
- **Rol:** NURSE

## Organización Demo
- **Nombre:** Hospital Demo
- **Subdominio:** demo
- **Descripción:** Hospital demo para pruebas

## Configuración de Passwords Personalizados

Puedes configurar passwords personalizados usando variables de entorno antes de ejecutar el seeding:

```bash
export SEED_ADMIN_PASSWORD="tu_password_admin"
export SEED_DOCTOR_PASSWORD="tu_password_doctor" 
export SEED_NURSE_PASSWORD="tu_password_nurse"
cd backend && npm run seed
```

## URLs del Sistema

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **Documentación API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

## Re-inicializar Datos Demo

Para limpiar y recrear los datos demo:

```bash
# Detener servicios
docker stop hikari-postgres

# Limpiar base de datos
docker rm hikari-postgres

# Reiniciar base de datos
./setup-db.sh

# Re-crear datos demo
cd backend && npm run seed
```