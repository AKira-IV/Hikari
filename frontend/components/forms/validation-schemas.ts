import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresa un correo electrónico válido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tenantSubdomain: z
    .string()
    .min(1, 'La organización es obligatoria')
    .min(2, 'El subdominio debe tener al menos 2 caracteres')
    .regex(/^[a-zA-Z0-9-]+$/, 'Solo se permiten letras, números y guiones'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Patient registration schema
export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresa un correo electrónico válido'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .regex(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido'),
  dateOfBirth: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria'),
  bloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  allergies: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

// Appointment schema
export const appointmentSchema = z.object({
  patientId: z
    .string()
    .min(1, 'Selecciona un paciente'),
  professionalId: z
    .string()
    .min(1, 'Selecciona un profesional'),
  appointmentDate: z
    .string()
    .min(1, 'La fecha es obligatoria'),
  appointmentTime: z
    .string()
    .min(1, 'La hora es obligatoria'),
  appointmentType: z
    .enum(['consulta', 'seguimiento', 'emergencia', 'cirugia'])
    .default('consulta'),
  notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Professional schema
export const professionalSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresa un correo electrónico válido'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .regex(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido'),
  specialization: z
    .string()
    .min(1, 'La especialización es obligatoria'),
  licenseNumber: z
    .string()
    .min(1, 'El número de licencia es obligatorio'),
  department: z
    .string()
    .min(1, 'El departamento es obligatorio'),
});

export type ProfessionalFormData = z.infer<typeof professionalSchema>;

// User registration schema
export const userRegistrationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresa un correo electrónico válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una minúscula, una mayúscula y un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  role: z
    .enum(['admin', 'doctor', 'nurse', 'receptionist'])
    .default('doctor'),
  phone: z
    .string()
    .min(1, 'El teléfono es obligatorio')
    .regex(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
