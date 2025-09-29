import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import {
  SecureRequest,
  ValidatedUserContext,
  SecurityValidationResult,
} from '../interfaces/security.interface';
import { AuthenticatedRequest } from '../interfaces/http-request.interface';

/**
 * Security Service for OWASP compliance and tenant isolation
 * Addresses:
 * - A01:2021 - Broken Access Control
 * - A02:2021 - Cryptographic Failures
 * - A03:2021 - Injection
 * - A07:2021 - Identification and Authentication Failures
 */
@Injectable()
export class SecurityService {
  /**
   * Validates and sanitizes user context from request
   * Prevents tenant isolation bypass (OWASP A01)
   */
  validateUserContext(request: AuthenticatedRequest): ValidatedUserContext {
    if (!request?.user) {
      throw new UnauthorizedException('No authenticated user found');
    }

    const user = request.user;

    // Validate required security fields
    if (!user.id || !user.tenantId || !user.role) {
      throw new UnauthorizedException(
        'Invalid user context - missing security fields',
      );
    }

    // Validate tenant association
    if (!user.tenant?.id || user.tenant.id !== user.tenantId) {
      throw new ForbiddenException('Tenant isolation violation detected');
    }

    // Validate active status
    if (!user.isActive || !user.tenant.isActive) {
      throw new ForbiddenException('Access denied - inactive user or tenant');
    }

    return {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      permissions: this.getRolePermissions(user.role),
      isValid: true,
      lastValidated: new Date(),
    };
  }

  /**
   * Validates tenant boundary access
   * Prevents horizontal privilege escalation
   */
  validateTenantAccess(userTenantId: string, requestedTenantId: string): void {
    if (userTenantId !== requestedTenantId) {
      throw new ForbiddenException(
        `Tenant boundary violation: User from tenant ${userTenantId} attempted to access tenant ${requestedTenantId}`,
      );
    }
  }

  /**
   * Sanitizes input parameters to prevent injection
   * Addresses OWASP A03:2021 - Injection
   */
  sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      // Basic SQL injection prevention
      return input.replace(/['"`;\\]/g, '').trim();
    }

    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        // Sanitize keys and values
        const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '');
        sanitized[cleanKey] = this.sanitizeInput(value);
      }
      return sanitized;
    }

    return input;
  }

  /**
   * Performs comprehensive security validation
   * SAST-style static analysis at runtime
   */
  performSecurityValidation(
    request: any,
    operation: string,
  ): SecurityValidationResult {
    const errors: string[] = [];
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';

    try {
      // Validate user context
      this.validateUserContext(request);
    } catch (error: any) {
      errors.push(`User validation failed: ${error.message}`);
      riskLevel = 'CRITICAL';
    }

    // Check for potential injection attempts
    const bodyStr = JSON.stringify(request.body || {});
    const suspiciousPatterns = [
      /union\s+select/i,
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /exec\s*\(/i,
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(bodyStr)) {
        errors.push(`Potential injection attempt detected in ${operation}`);
        riskLevel = 'HIGH';
        break;
      }
    }

    // Rate limiting check (basic implementation)
    if (this.isRateLimited(request.ip, operation)) {
      errors.push(`Rate limit exceeded for operation ${operation}`);
      riskLevel = 'HIGH';
    }

    return {
      isValid: errors.length === 0,
      errors,
      riskLevel,
      timestamp: new Date(),
    };
  }

  /**
   * Gets role-based permissions
   */
  private getRolePermissions(role: string): string[] {
    const permissions: Record<string, string[]> = {
      ADMIN: ['READ', 'WRITE', 'DELETE', 'MANAGE_USERS', 'MANAGE_TENANT'],
      DOCTOR: ['READ', 'WRITE', 'MANAGE_PATIENTS'],
      NURSE: ['READ', 'WRITE_LIMITED', 'VIEW_PATIENTS'],
      RECEPTIONIST: ['READ', 'WRITE_LIMITED'],
      PATIENT: ['READ_OWN'],
    };

    return permissions[role] || ['READ_OWN'];
  }

  /**
   * Basic rate limiting check
   */
  // In-memory rate limit store: { [ip_operation]: { count, timestamp } }
  private rateLimitStore: Record<string, { count: number; timestamp: number }> = {};

  private isRateLimited(ip: string, operation: string): boolean {
    const RATE_LIMIT = 100; // max requests per window
    const WINDOW_MS = 60 * 1000; // 1 minute window
    const key = `${ip}_${operation}`;
    const now = Date.now();

    if (!this.rateLimitStore[key]) {
      this.rateLimitStore[key] = { count: 1, timestamp: now };
      return false;
    }

    const entry = this.rateLimitStore[key];
    if (now - entry.timestamp > WINDOW_MS) {
      // Reset window
      entry.count = 1;
      entry.timestamp = now;
      return false;
    }

    entry.count += 1;
    if (entry.count > RATE_LIMIT) {
      return true;
    }
    return false;
  }

  /**
   * Creates a secure request wrapper
   */
  createSecureRequest(request: any): SecureRequest {
    const validatedContext = this.validateUserContext(request);

    return {
      user: {
        ...request.user,
        tenant: request.user.tenant,
        tenantId: validatedContext.tenantId,
      },
      headers: this.sanitizeInput(request.headers || {}),
      ip: request.ip || 'unknown',
      method: request.method || 'unknown',
      url: request.url || 'unknown',
    };
  }
}
