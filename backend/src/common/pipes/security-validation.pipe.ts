import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Enhanced Security Validation Pipe
 * Provides comprehensive input validation with security focus
 * Implements SAST-style static analysis patterns
 */
@Injectable()
export class SecurityValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Basic sanitization before validation
    const sanitizedValue = this.sanitizeInput(value);

    // Transform to class instance for validation
    const object = plainToClass(metatype, sanitizedValue);

    // Perform class-validator validations (includes our security validators)
    const errors = await validate(object, {
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Reject unknown properties
      transform: true, // Transform types
      validateCustomDecorators: true, // Include our custom security validators
    });

    if (errors.length > 0) {
      const securityErrors = this.extractSecurityErrors(errors);
      const regularErrors = this.extractRegularErrors(errors);

      // Log security-related validation failures
      if (securityErrors.length > 0) {
        console.error('Security validation failed:', {
          securityErrors,
          timestamp: new Date().toISOString(),
          inputType: metatype.name,
        });
      }

      // Return combined error message
      const allErrors = [...securityErrors, ...regularErrors];
      throw new BadRequestException({
        message: 'Validation failed',
        errors: allErrors,
        securityViolations: securityErrors.length > 0,
      });
    }

    return object;
  }

  /**
   * Sanitizes input to prevent basic injection attacks
   */
  private sanitizeInput(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'string') {
      // Remove dangerous characters and normalize
      return value
        .trim()
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
        .substring(0, 10000); // Limit length to prevent DoS
    }

    if (Array.isArray(value)) {
      return value.slice(0, 100).map((item) => this.sanitizeInput(item)); // Limit array size
    }

    if (typeof value === 'object') {
      const sanitized: any = {};
      let propertyCount = 0;

      for (const [key, val] of Object.entries(value)) {
        if (propertyCount >= 50) break; // Limit object properties

        const cleanKey = key.replace(/[^a-zA-Z0-9_$]/g, '').substring(0, 100);
        if (cleanKey) {
          sanitized[cleanKey] = this.sanitizeInput(val);
          propertyCount++;
        }
      }

      return sanitized;
    }

    return value;
  }

  /**
   * Determines if a metatype should be validated
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  /**
   * Extracts security-related validation errors
   */
  private extractSecurityErrors(errors: any[]): string[] {
    const securityErrors: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        for (const [constraintKey, message] of Object.entries(
          error.constraints,
        )) {
          // Check if this is a security-related constraint
          if (this.isSecurityConstraint(constraintKey)) {
            securityErrors.push(`${error.property}: ${message}`);
          }
        }
      }

      // Recursively check nested errors
      if (error.children && error.children.length > 0) {
        securityErrors.push(...this.extractSecurityErrors(error.children));
      }
    }

    return securityErrors;
  }

  /**
   * Extracts regular validation errors
   */
  private extractRegularErrors(errors: any[]): string[] {
    const regularErrors: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        for (const [constraintKey, message] of Object.entries(
          error.constraints,
        )) {
          // Check if this is NOT a security-related constraint
          if (!this.isSecurityConstraint(constraintKey)) {
            regularErrors.push(`${error.property}: ${message}`);
          }
        }
      }

      // Recursively check nested errors
      if (error.children && error.children.length > 0) {
        regularErrors.push(...this.extractRegularErrors(error.children));
      }
    }

    return regularErrors;
  }

  /**
   * Determines if a validation constraint is security-related
   */
  private isSecurityConstraint(constraintKey: string): boolean {
    const securityConstraints = [
      'isNotSQLInjection',
      'isNotXSS',
      'isSecureTenantId',
      'isStrongPassword',
      'isSecureInput',
    ];

    return securityConstraints.includes(constraintKey);
  }
}
