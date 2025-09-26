import { Module, Global } from '@nestjs/common';
import { SecurityService } from './services/security.service';
import { RolesGuard } from './guards';
import { TenantIsolationGuard } from './guards/tenant-isolation.guard';
import { SecurityAuditInterceptor } from './interceptors/security-audit.interceptor';

/**
 * Common Security Module
 * Provides security services, guards, and interceptors globally
 */
@Global()
@Module({
  providers: [
    SecurityService,
    RolesGuard,
    TenantIsolationGuard,
    SecurityAuditInterceptor,
  ],
  exports: [
    SecurityService,
    RolesGuard,
    TenantIsolationGuard,
    SecurityAuditInterceptor,
  ],
})
export class CommonSecurityModule {}
