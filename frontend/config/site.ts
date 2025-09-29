export const mainNavigation = [
  { label: 'Características', href: '/#features' },
  { label: 'Seguridad', href: '/#security' },
  { label: 'Gratuito', href: '/#commitment' },
  { label: 'GitHub', href: 'https://github.com/AKira-IV/Hikari' },
];

export const appConfig = {
  marketingTenant: 'demo',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000',
};
