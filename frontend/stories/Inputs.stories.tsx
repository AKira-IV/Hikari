import type { Meta, StoryObj } from '@storybook/react';
import { TextInput, PasswordInput, EmailInput, SelectInput, TextAreaInput } from '@/components/ui/inputs';
import { Stack } from '@/components/ui/layout';

const meta: Meta = {
  title: 'Hikari/Inputs',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Colección completa de inputs reutilizables para el sistema hospitalario Hikari. Todos los componentes siguen el sistema de diseño médico con validación integrada y estados de error.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;

// TextInput Stories
export const TextInputDefault: StoryObj = {
  name: 'Text Input - Default',
  render: () => (
    <Stack gap="lg" style={{ width: '300px' }}>
      <TextInput
        label="Nombre del paciente"
        placeholder="Ingrese el nombre completo"
        fullWidth
      />
      <TextInput
        label="Número de cédula"
        placeholder="12345678"
        helpText="Solo números, sin puntos ni guiones"
        fullWidth
      />
      <TextInput
        label="Campo con error"
        placeholder="Valor incorrecto"
        error="Este campo es requerido"
        fullWidth
      />
    </Stack>
  )
};

// PasswordInput Stories
export const PasswordInputDefault: StoryObj = {
  name: 'Password Input - Default',
  render: () => (
    <Stack gap="lg" style={{ width: '300px' }}>
      <PasswordInput
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        fullWidth
      />
      <PasswordInput
        label="Confirmar contraseña"
        placeholder="Confirma tu contraseña"
        error="Las contraseñas no coinciden"
        fullWidth
      />
      <PasswordInput
        label="Contraseña sin toggle"
        placeholder="Contraseña fija"
        showToggle={false}
        fullWidth
      />
    </Stack>
  )
};

// EmailInput Stories
export const EmailInputDefault: StoryObj = {
  name: 'Email Input - Default',
  render: () => (
    <Stack gap="lg" style={{ width: '300px' }}>
      <EmailInput
        label="Email del paciente"
        placeholder="paciente@ejemplo.com"
        fullWidth
      />
      <EmailInput
        label="Email del doctor"
        placeholder="doctor@hospital.com"
        helpText="Este email se usará para notificaciones"
        fullWidth
      />
      <EmailInput
        label="Email inválido"
        placeholder="email-incorrecto"
        error="Formato de email inválido"
        fullWidth
      />
    </Stack>
  )
};

// SelectInput Stories
export const SelectInputDefault: StoryObj = {
  name: 'Select Input - Default',
  render: () => (
    <Stack gap="lg" style={{ width: '300px' }}>
      <SelectInput
        label="Tipo de sangre"
        placeholder="Seleccione tipo de sangre"
        options={[
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' }
        ]}
        fullWidth
      />
      <SelectInput
        label="Especialidad médica"
        placeholder="Seleccione especialidad"
        options={[
          { value: 'cardiologia', label: 'Cardiología' },
          { value: 'neurologia', label: 'Neurología' },
          { value: 'pediatria', label: 'Pediatría' },
          { value: 'ginecologia', label: 'Ginecología' },
          { value: 'ortopedia', label: 'Ortopedia', disabled: true }
        ]}
        helpText="Seleccione la especialidad del profesional"
        fullWidth
      />
    </Stack>
  )
};

// TextAreaInput Stories
export const TextAreaInputDefault: StoryObj = {
  name: 'TextArea Input - Default',
  render: () => (
    <Stack gap="lg" style={{ width: '400px' }}>
      <TextAreaInput
        label="Diagnóstico"
        placeholder="Describa el diagnóstico detallado..."
        fullWidth
      />
      <TextAreaInput
        label="Observaciones"
        placeholder="Notas adicionales..."
        helpText="Máximo 500 caracteres"
        rows={3}
        fullWidth
      />
      <TextAreaInput
        label="Campo con error"
        placeholder="Descripción requerida"
        error="Este campo es obligatorio"
        resizable={false}
        fullWidth
      />
    </Stack>
  )
};

// Variants Demo
export const InputVariants: StoryObj = {
  name: 'Input Variants',
  render: () => (
    <Stack gap="lg" style={{ width: '300px' }}>
      <TextInput
        label="Default"
        placeholder="Estado normal"
        fullWidth
      />
      <TextInput
        label="Success"
        placeholder="Validación exitosa"
        variant="success"
        fullWidth
      />
      <TextInput
        label="Warning"
        placeholder="Advertencia"
        variant="warning"
        fullWidth
      />
      <TextInput
        label="Error"
        placeholder="Campo con error"
        variant="error"
        error="Error de validación"
        fullWidth
      />
    </Stack>
  )
};
