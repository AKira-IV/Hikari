// Security interfaces for type-safe request handling
import { User } from '../../database/entities/user.entity';
import { Tenant } from '../../database/entities/tenant.entity';

/**
 * Secure request interface that ensures type safety
 * Mitigates OWASP A01:2021 - Broken Access Control
 */
export interface SecureRequest {
  user: User & {
    tenant: Tenant;
    tenantId: string;
  };
  headers: Record<string, string>;
  ip: string;
  method: string;
  url: string;
}

/**
 * Validated user context for tenant isolation
 * Prevents tenant boundary violations
 */
export interface ValidatedUserContext {
  userId: string;
  tenantId: string;
  role: string;
  permissions: string[];
  isValid: boolean;
  lastValidated: Date;
}

/**
 * Security validation result
 */
export interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: Date;
}
