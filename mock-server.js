const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulación de datos
const mockUsers = [
  {
    id: 1,
    email: 'admin@demo.com',
    password: 'admin123', // En producción esto estaría hasheado
    firstName: 'Admin',
    lastName: 'Demo',
    role: 'admin',
    tenant: {
      id: 1,
      name: 'Demo Hospital',
      subdomain: 'demo'
    }
  }
];

// Rutas de la API
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hikari Mock Server is running' });
});

app.post('/auth/login', (req, res) => {
  const { email, password, tenantSubdomain } = req.body;

  console.log('Login attempt:', { email, password, tenantSubdomain });

  // Buscar usuario
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: 'Credenciales inválidas'
    });
  }

  if (user.tenant.subdomain !== tenantSubdomain) {
    return res.status(401).json({
      message: 'Tenant inválido'
    });
  }

  // Simular tokens
  const accessToken = 'mock-access-token';
  const refreshToken = 'mock-refresh-token';

  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      tenant: user.tenant
    },
    accessToken,
    refreshToken
  });
});

app.get('/auth/me', (req, res) => {
  // Simular usuario autenticado
  res.json({
    id: 1,
    email: 'admin@demo.com',
    firstName: 'Admin',
    lastName: 'Demo',
    role: 'admin',
    tenant: {
      id: 1,
      name: 'Demo Hospital',
      subdomain: 'demo'
    }
  });
});

// Rutas de pacientes, citas, etc. (mock)
app.get('/patients', (req, res) => {
  res.json([
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com' },
    { id: 2, firstName: 'María', lastName: 'García', email: 'maria@email.com' }
  ]);
});

app.get('/appointments', (req, res) => {
  res.json([
    { id: 1, patientName: 'Juan Pérez', date: '2025-10-10', time: '10:00' },
    { id: 2, patientName: 'María García', date: '2025-10-11', time: '14:30' }
  ]);
});

app.listen(PORT, () => {
  console.log(`
🚀 Hikari Mock Server iniciado exitosamente!

📋 Configuración:
   Puerto: ${PORT}
   CORS: Habilitado

🧪 Credenciales de prueba:
   Email: admin@demo.com
   Contraseña: admin123
   Tenant: demo

🌐 Endpoints disponibles:
   GET  http://localhost:${PORT}/health
   POST http://localhost:${PORT}/auth/login
   GET  http://localhost:${PORT}/auth/me
   GET  http://localhost:${PORT}/patients
   GET  http://localhost:${PORT}/appointments

💡 Este es un servidor mock para desarrollo.
   Para producción, configura PostgreSQL y el backend real.
  `);
});
