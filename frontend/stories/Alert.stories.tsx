import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/components/ui/alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  args: {
    children: 'This is an alert message',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message to help guide the user.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully! Your changes have been saved.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review the information before proceeding. Some fields may need attention.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error: Unable to process your request. Please try again or contact support.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert variant="info">
        Information: Please review the patient data before submitting.
      </Alert>
      <Alert variant="success">
        Success: Patient record has been updated successfully.
      </Alert>
      <Alert variant="warning">
        Warning: This action will permanently delete the appointment.
      </Alert>
      <Alert variant="danger">
        Error: Unable to connect to the medical database. Please try again.
      </Alert>
    </div>
  ),
};
