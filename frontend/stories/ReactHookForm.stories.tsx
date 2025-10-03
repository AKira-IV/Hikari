import type { Meta, StoryObj } from '@storybook/react';
import { LoginFormExample } from '@/components/examples/LoginFormExample';
import {
  Form,
  FormTextInput,
  FormEmailInput,
  FormPasswordInput,
  FormSelectInput,
  FormTextAreaInput
} from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Stack, Container } from '@/components/ui/layout';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof LoginFormExample> = {
  title: 'Forms/React Hook Form',
  component: LoginFormExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};

export const BasicForm: Story = {
  render: () => (
    <Container maxWidth="md">
      <Card style={{ padding: 'var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: 0,
            marginBottom: 'var(--space-2)'
          }}>
            Formulario Básico
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            margin: 0
          }}>
            Ejemplo de formulario con React Hook Form
          </p>
        </div>

        <Form
          onSubmit={(data: any) => {
            console.log('Form submitted:', data);
          }}
        >
          {({ isSubmitting }: { isSubmitting: boolean; errors: any }) => (
            <Stack gap="md">
              <FormTextInput
                name="firstName"
                label="Nombre"
                placeholder="Juan"
              />

              <FormTextInput
                name="lastName"
                label="Apellido"
                placeholder="Pérez"
              />

              <FormEmailInput
                name="email"
                label="Correo electrónico"
                placeholder="juan.perez@email.com"
              />

              <FormTextAreaInput
                name="notes"
                label="Notas adicionales"
                placeholder="Información adicional..."
                rows={4}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </Stack>
          )}
        </Form>
      </Card>
    </Container>
  ),
};

export const FormFields: Story = {
  render: () => (
    <Container maxWidth="md">
      <Stack gap="lg">
        <Card style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
            Componentes de Formulario
          </h3>

          <Form onSubmit={() => {}}>
            {() => (
              <Stack gap="md">
                <FormTextInput
                  name="textInput"
                  label="Campo de Texto"
                  placeholder="Ingresa texto..."
                />

                <FormEmailInput
                  name="emailInput"
                  label="Campo de Email"
                  placeholder="ejemplo@email.com"
                />

                <FormPasswordInput
                  name="passwordInput"
                  label="Campo de Contraseña"
                  placeholder="Contraseña segura"
                />

                <FormSelectInput
                  name="selectInput"
                  label="Campo de Selección"
                  placeholder="Selecciona una opción"
                  options={[
                    { value: 'option1', label: 'Opción 1' },
                    { value: 'option2', label: 'Opción 2' },
                    { value: 'option3', label: 'Opción 3' },
                  ]}
                />

                <FormTextAreaInput
                  name="textareaInput"
                  label="Campo de Texto Largo"
                  placeholder="Escribe un mensaje largo..."
                  rows={4}
                />
              </Stack>
            )}
          </Form>
        </Card>
      </Stack>
    </Container>
  ),
};
