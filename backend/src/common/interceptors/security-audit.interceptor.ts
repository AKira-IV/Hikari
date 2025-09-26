import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SecurityService } from '../services/security.service';

/**
 * Security Audit Interceptor
 * Provides runtime security monitoring and audit logging
 * Implements DAST-style dynamic analysis
 */
@Injectable()
export class SecurityAuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SecurityAuditInterceptor.name);

  constructor(private securityService: SecurityService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const handler = context.getHandler();
    const controller = context.getClass();

    const operation = `${controller.name}.${handler.name}`;
    const startTime = Date.now();

    // Security validation before execution
    const securityValidation = this.securityService.performSecurityValidation(
      request,
      operation,
    );

    if (!securityValidation.isValid) {
      this.logger.error(`Security validation failed for ${operation}`, {
        operation,
        errors: securityValidation.errors,
        riskLevel: securityValidation.riskLevel,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        userId: request.user?.id,
        tenantId: request.user?.tenantId,
      });
    }

    // Log security-relevant request details
    this.logger.log(`Security audit: ${operation}`, {
      operation,
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      userId: request.user?.id,
      tenantId: request.user?.tenantId,
      riskLevel: securityValidation.riskLevel,
      hasSecurityWarnings: securityValidation.errors.length > 0,
    });

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime;

        // Log successful operations with security context
        this.logger.log(`Operation completed: ${operation}`, {
          operation,
          duration,
          statusCode: response.statusCode,
          userId: request.user?.id,
          tenantId: request.user?.tenantId,
          dataSize: JSON.stringify(data || {}).length,
        });

        // Check for data leakage patterns
        this.checkDataLeakage(data, request.user?.tenantId, operation);
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;

        // Log security-related errors
        this.logger.error(`Operation failed: ${operation}`, {
          operation,
          duration,
          error: error.message,
          stack: error.stack,
          userId: request.user?.id,
          tenantId: request.user?.tenantId,
          ip: request.ip,
          isSecurity: this.isSecurityRelatedError(error),
        });

        return throwError(() => error);
      }),
    );
  }

  /**
   * Checks response data for potential tenant data leakage
   */
  private checkDataLeakage(
    data: any,
    userTenantId: string,
    operation: string,
  ): void {
    if (!data || !userTenantId) return;

    const dataStr = JSON.stringify(data);

    // Check for tenant IDs that don't match the user's tenant
    const tenantIdMatches: string[] = dataStr.match(/[0-9a-f-]{36}/g) || []; // UUID pattern

    for (const match of tenantIdMatches) {
      if (match !== userTenantId && this.looksLikeTenantId(match)) {
        this.logger.warn(`Potential data leakage detected in ${operation}`, {
          operation,
          userTenantId,
          suspiciousTenantId: match,
          riskLevel: 'HIGH',
        });
      }
    }

    // Check for common sensitive data patterns
    const sensitivePatterns = [
      /password["\s]*[:=]["\s]*[^"\s,}]+/i,
      /ssn["\s]*[:=]["\s]*\d{3}-?\d{2}-?\d{4}/i,
      /credit[_\s]*card["\s]*[:=]["\s]*\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/i,
    ];

    for (const pattern of sensitivePatterns) {
      if (pattern.test(dataStr)) {
        this.logger.error(`Sensitive data exposure detected in ${operation}`, {
          operation,
          riskLevel: 'CRITICAL',
          pattern: pattern.source,
        });
      }
    }
  }

  /**
   * Determines if an error is security-related
   */
  private isSecurityRelatedError(error: any): boolean {
    const securityKeywords = [
      'unauthorized',
      'forbidden',
      'access denied',
      'permission',
      'authentication',
      'authorization',
      'tenant',
      'injection',
      'validation',
    ];

    const message = String(error?.message || '').toLowerCase();
    return securityKeywords.some((keyword) =>
      String(message).includes(keyword),
    );
  }

  /**
   * Heuristic to identify potential tenant IDs
   */
  private looksLikeTenantId(value: string): boolean {
    // Simple heuristic - UUID format and not common system UUIDs
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return (
      uuidPattern.test(value) &&
      value !== '00000000-0000-0000-0000-000000000000'
    );
  }
}
