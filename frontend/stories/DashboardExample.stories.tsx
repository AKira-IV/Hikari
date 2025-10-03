import type { Meta, StoryObj } from '@storybook/react';
import { DashboardExample } from '@/components/examples/dashboard-example';

const meta: Meta<typeof DashboardExample> = {
  title: 'Examples/Dashboard',
  component: DashboardExample,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof DashboardExample>;

export const Default: Story = {};
