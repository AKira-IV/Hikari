import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, User } from '../database/entities/user.entity';
import { SecurityService } from './services/security.service';

/**
 * Enhanced Roles Guard with security validations
 * Addresses OWASP A01:2021 - Broken Access Control
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private securityService: SecurityService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    try {
      // Validate user context with security service
      const _userContext = this.securityService.validateUserContext(request);

      // Perform security validation
      const securityResult = this.securityService.performSecurityValidation(
        request,
        context.getClass().name + '.' + context.getHandler().name,
      );

      if (!securityResult.isValid) {
        throw new ForbiddenException(
          `Security validation failed: ${securityResult.errors.join(', ')}`,
        );
      }

      // Validate user has required role
      const user = request.user as User;
      const hasRole = requiredRoles.some((role) => user.role === role);

      if (!hasRole) {
        throw new ForbiddenException(
          `Access denied. Required roles: ${requiredRoles.join(', ')}, User role: ${user.role}`,
        );
      }

      return true;
    } catch (error: unknown) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new ForbiddenException('Access validation failed');
    }
  }
}

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
