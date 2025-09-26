import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { SecurityService } from '../services/security.service';

/**
 * Tenant Isolation Guard
 * Ensures users can only access resources within their tenant boundary
 * Addresses OWASP A01:2021 - Broken Access Control
 */
@Injectable()
export class TenantIsolationGuard implements CanActivate {
  constructor(private securityService: SecurityService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      // Validate user context
      const userContext = this.securityService.validateUserContext(request);

      // Extract tenant ID from request parameters or body
      const requestedTenantId = this.extractTenantIdFromRequest(request);

      if (requestedTenantId) {
        // Validate tenant access
        this.securityService.validateTenantAccess(
          userContext.tenantId,
          requestedTenantId,
        );
      }

      // Additional validation for multi-tenant operations
      if (request.body) {
        request.body = this.securityService.sanitizeInput(request.body);
      }

      if (request.query) {
        request.query = this.securityService.sanitizeInput(request.query);
      }

      return true;
    } catch (error: any) {
      throw new ForbiddenException(
        `Tenant isolation violation: ${error.message}`,
      );
    }
  }

  /**
   * Extracts tenant ID from various request sources
   */
  private extractTenantIdFromRequest(request: any): string | null {
    // Check URL parameters
    if (request.params?.tenantId) {
      return request.params.tenantId;
    }

    // Check query parameters
    if (request.query?.tenantId) {
      return request.query.tenantId;
    }

    // Check request body
    if (request.body?.tenantId) {
      return request.body.tenantId;
    }

    // Check headers (for API calls)
    if (request.headers['x-tenant-id']) {
      return request.headers['x-tenant-id'];
    }

    return null;
  }
}
