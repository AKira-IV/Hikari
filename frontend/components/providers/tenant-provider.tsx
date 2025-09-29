'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';

export interface TenantContextValue {
  tenant: string;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

interface TenantProviderProps {
  tenant: string;
  children: ReactNode;
}

export function TenantProvider({ tenant, children }: TenantProviderProps) {
  const value = useMemo(() => ({ tenant }), [tenant]);
  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
