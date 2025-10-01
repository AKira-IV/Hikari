import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Type,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Enhanced Security Validation Pipe
 * Provides comprehensive input validation with security focus
 * Implements SAST-style static analysis patterns
 */
@Injectable()
export class SecurityValidationPipe implements PipeTransform<unknown, unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
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
  private sanitizeInput(value: unknown): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === 'string') {
      // Remove dangerous characters and normalize
      // Using ranges to avoid control character regex warnings
      const dangerousChars = [
        '\u0000',
        '\u0001',
        '\u0002',
        '\u0003',
        '\u0004',
        '\u0005',
        '\u0006',
        '\u0007',
        '\u0008',
        '\u000B',
        '\u000C',
        '\u000E',
        '\u000F',
        '\u0010',
        '\u0011',
        '\u0012',
        '\u0013',
        '\u0014',
        '\u0015',
        '\u0016',
        '\u0017',
        '\u0018',
        '\u0019',
        '\u001A',
        '\u001B',
        '\u001C',
        '\u001D',
        '\u001E',
        '\u001F',
        '\u007F',
      ];
      let cleanValue = value.trim();
      for (const char of dangerousChars) {
        cleanValue = cleanValue.replace(new RegExp(char, 'g'), '');
      }
      return cleanValue.substring(0, 10000); // Limit length to prevent DoS
    }

    if (Array.isArray(value)) {
      return value.slice(0, 100).map((item) => this.sanitizeInput(item)); // Limit array size
    }

    if (typeof value === 'object') {
      const sanitized: Record<string, unknown> = {};
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
  private toValidate(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ] as Type<unknown>[];
    return !types.includes(metatype);
  }

  /**
   * Extracts security-related validation errors
   */
  private extractSecurityErrors(
    errors: {
      constraints?: Record<string, string>;
      property?: string;
      children?: unknown[];
    }[],
  ): string[] {
    const securityErrors: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        for (const [constraintKey, message] of Object.entries(
          error.constraints,
        )) {
          // Check if this is a security-related constraint
          if (this.isSecurityConstraint(constraintKey)) {
            securityErrors.push(
              `${String(error.property)}: ${String(message)}`,
            );
          }
        }
      }

      // Recursively check nested errors
      if (error.children && error.children.length > 0) {
        const childrenAsErrors = error.children as typeof errors;
        securityErrors.push(...this.extractSecurityErrors(childrenAsErrors));
      }
    }

    return securityErrors;
  }

  /**
   * Extracts regular validation errors
   */
  private extractRegularErrors(
    errors: {
      constraints?: Record<string, string>;
      property?: string;
      children?: unknown[];
    }[],
  ): string[] {
    const regularErrors: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        for (const [constraintKey, message] of Object.entries(
          error.constraints,
        )) {
          // Check if this is NOT a security-related constraint
          if (!this.isSecurityConstraint(constraintKey)) {
            regularErrors.push(`${String(error.property)}: ${String(message)}`);
          }
        }
      }

      // Recursively check nested errors
      if (error.children && error.children.length > 0) {
        const childrenAsErrors = error.children as typeof errors;
        regularErrors.push(...this.extractRegularErrors(childrenAsErrors));
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
