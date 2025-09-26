import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { Tenant } from '../database/entities/tenant.entity';
import { AuthenticatedRequest } from './interfaces/http-request.interface';

/**
 * Secure CurrentUser decorator with tenant isolation validation
 * Addresses OWASP A01:2021 - Broken Access Control
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    // Basic validation before type assertion
    if (!request?.user?.id || !request?.user?.tenantId) {
      throw new Error('Invalid user context in request');
    }

    const user = request.user;

    // Additional security validation
    if (!user.isActive || !user.tenant?.isActive) {
      throw new Error('Access denied - inactive user or tenant');
    }

    return user;
  },
);

/**
 * Secure CurrentTenant decorator with validation
 * Prevents tenant boundary violations
 */
export const CurrentTenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Tenant => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    // Validate request structure
    if (!request?.user?.tenant?.id) {
      throw new Error('Invalid tenant context in request');
    }

    const user = request.user;
    const tenant = user.tenant;

    // Validate tenant isolation
    if (user.tenantId !== tenant.id) {
      throw new Error('Tenant isolation violation detected');
    }

    // Validate tenant is active
    if (!tenant.isActive) {
      throw new Error('Access denied - inactive tenant');
    }

    return tenant;
  },
);
