import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityService } from './services/security.service';
import { CaptchaService } from './services/captcha.service';
import { RolesGuard } from './guards';
import { TenantIsolationGuard } from './guards/tenant-isolation.guard';
import { SecurityAuditInterceptor } from './interceptors/security-audit.interceptor';

/**
 * Common Security Module
 * Provides security services, guards, and interceptors globally
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    SecurityService,
    CaptchaService,
    RolesGuard,
    TenantIsolationGuard,
    SecurityAuditInterceptor,
  ],
  exports: [
    SecurityService,
    CaptchaService,
    RolesGuard,
    TenantIsolationGuard,
    SecurityAuditInterceptor,
  ],
})
export class CommonSecurityModule {}
