import { z } from 'zod';

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  tenantSubdomain: z
    .string()
    .min(1, 'El tenant es requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones')
});

// Schema para registro de paciente
export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string()
    .email('Formato de email inválido')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(/^[0-9-+\s()]+$/, 'Formato de teléfono inválido'),
  dni: z
    .string()
    .min(1, 'La cédula es requerida')
    .regex(/^[0-9]+$/, 'Solo números'),
  birthDate: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida'),
  bloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  address: z
    .string()
    .min(1, 'La dirección es requerida'),
  emergencyContact: z
    .string()
    .min(1, 'El contacto de emergencia es requerido'),
  emergencyPhone: z
    .string()
    .min(1, 'El teléfono de emergencia es requerido')
    .regex(/^[0-9-+\s()]+$/, 'Formato de teléfono inválido'),
  medicalHistory: z
    .string()
    .optional()
});

// Schema para cita médica
export const appointmentSchema = z.object({
  patientId: z
    .string()
    .min(1, 'Seleccione un paciente'),
  doctorId: z
    .string()
    .min(1, 'Seleccione un doctor'),
  date: z
    .string()
    .min(1, 'La fecha es requerida'),
  time: z
    .string()
    .min(1, 'La hora es requerida'),
  reason: z
    .string()
    .min(1, 'El motivo de la cita es requerido')
    .min(10, 'Describa el motivo con más detalle'),
  notes: z
    .string()
    .optional()
});

// Schema para profesional médico
export const professionalSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido'),
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(/^[0-9-+\s()]+$/, 'Formato de teléfono inválido'),
  dni: z
    .string()
    .min(1, 'La cédula es requerida')
    .regex(/^[0-9]+$/, 'Solo números'),
  specialty: z
    .string()
    .min(1, 'La especialidad es requerida'),
  license: z
    .string()
    .min(1, 'El número de matrícula es requerido'),
  department: z
    .string()
    .min(1, 'El departamento es requerido'),
  role: z
    .enum(['doctor', 'nurse', 'staff']),
  schedule: z
    .string()
    .optional()
});

// Schema para usuario
export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirme la contraseña'),
  role: z
    .enum(['admin', 'doctor', 'nurse', 'staff'])
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Tipos TypeScript derivados de los schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type PatientFormData = z.infer<typeof patientSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type ProfessionalFormData = z.infer<typeof professionalSchema>;
export type UserFormData = z.infer<typeof userSchema>;
