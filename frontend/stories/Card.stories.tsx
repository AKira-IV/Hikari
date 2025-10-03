import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  render: () => (
    <Card>
      <p>This is a simple card with some content inside.</p>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader title="Card Title" subtitle="This is a subtitle" />
      <p>Card content goes here. This card includes a header with title and subtitle.</p>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader title="Patient Information" />
      <p>Patient details and medical information would be displayed here.</p>
      <CardFooter>
        <span>Last updated: 2 hours ago</span>
        <Button variant="secondary">Edit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="Medical Record"
        subtitle="Complete patient medical information"
      />
      <p>
        This card demonstrates all card components working together.
        It includes a header with title and subtitle, main content area,
        and a footer with actions.
      </p>
      <p>
        Perfect for displaying patient information, appointment details,
        or any structured medical data.
      </p>
      <CardFooter>
        <span>Created: October 2, 2025</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};
