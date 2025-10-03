import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Tokens',
};

export default meta;

type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--color-text)' }}>Color Palette</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-text)' }}>Background Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Background (#F0F4F8)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Surface (#FFFFFF)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Surface Subtle (#F7FAFD)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-text)' }}>Primary Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Primary (#5E81AC)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary-hover)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Primary Hover (#6F8FB9)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary-active)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Primary Active (#4E6F99)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-text)' }}>Status Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-success)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Success (#A3BE8C)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-warning)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Warning (#EBCB8B)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-danger)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Danger (#BF616A)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-text)' }}>Text Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-text)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Text (#4A4A4A)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-text-muted)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Text Muted (#6B7280)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-border)', borderRadius: '8px' }}></div>
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>Border (#D6E0EB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--color-text)' }}>Spacing Scale</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { name: '--space-1', value: '4px' },
          { name: '--space-2', value: '8px' },
          { name: '--space-3', value: '12px' },
          { name: '--space-4', value: '16px' },
          { name: '--space-5', value: '24px' },
          { name: '--space-6', value: '32px' },
        ].map((space) => (
          <div key={space.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: `var(${space.name})`,
              height: '24px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '4px',
              minWidth: `var(${space.name})`
            }}></div>
            <span style={{ fontSize: '14px', color: 'var(--color-text)', fontFamily: 'monospace' }}>
              {space.name}: {space.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--color-text)' }}>Border Radius</h2>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {[
          { name: '--radius-sm', value: '8px' },
          { name: '--radius-md', value: '12px' },
          { name: '--radius-lg', value: '18px' },
        ].map((radius) => (
          <div key={radius.name} style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: `var(${radius.name})`,
              marginBottom: '8px'
            }}></div>
            <div style={{ fontSize: '12px', color: 'var(--color-text)', fontFamily: 'monospace' }}>
              {radius.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {radius.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
