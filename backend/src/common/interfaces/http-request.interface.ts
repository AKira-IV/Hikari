import { Request } from 'express';
import { Tenant } from '../../database/entities/tenant.entity';

/**
 * Extended Request interface with typed user context
 * Reduces TypeScript unsafe access warnings
 */
export interface AuthenticatedUser {
  id: string;
  tenantId: string;
  role: string;
  isActive: boolean;
  tenant: Tenant & {
    id: string;
    isActive: boolean;
  };
}

/**
 * Extended Request interface with typed user context
 * Reduces TypeScript unsafe access warnings
 */
export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

/**
 * HTTP Context for security operations
 */
export interface SecurityContext {
  ip: string;
  userAgent: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  user?: {
    id: string;
    tenantId: string;
    role: string;
  };
}

/**
 * Validation Error Context
 */
export interface ValidationErrorContext {
  property: string;
  constraints: Record<string, string>;
  children?: ValidationErrorContext[];
}

/**
 * Audit Log Entry
 */
export interface AuditLogEntry {
  timestamp: Date;
  userId?: string;
  tenantId?: string;
  ip: string;
  method: string;
  url: string;
  statusCode: number;
  userAgent: string;
  duration: number;
  securityFlags: string[];
}
