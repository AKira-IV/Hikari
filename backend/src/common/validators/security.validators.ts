import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * OWASP-compliant validation decorators
 */

/**
 * Validates input against SQL injection patterns
 * Addresses OWASP A03:2021 - Injection
 */
export function IsNotSQLInjection(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotSQLInjection',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== 'string') return true;

          const sqlInjectionPatterns = [
            /union\s+select/i,
            /or\s+1\s*=\s*1/i,
            /drop\s+table/i,
            /delete\s+from/i,
            /insert\s+into/i,
            /update\s+set/i,
            /exec\s*\(/i,
            /script\s*:/i,
            /javascript\s*:/i,
          ];

          return !sqlInjectionPatterns.some((pattern) => pattern.test(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains potential SQL injection patterns`;
        },
      },
    });
  };
}

/**
 * Validates input against XSS patterns
 * Addresses OWASP A03:2021 - Injection
 */
export function IsNotXSS(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotXSS',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== 'string') return true;

          const xssPatterns = [
            /<script/i,
            /<\/script>/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /<link/i,
            /<meta/i,
          ];

          return !xssPatterns.some((pattern) => pattern.test(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains potential XSS patterns`;
        },
      },
    });
  };
}

/**
 * Validates tenant ID format and security
 * Prevents tenant enumeration attacks
 */
export function IsSecureTenantId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSecureTenantId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (!value || typeof value !== 'string') return false;

          // Must be UUID format
          const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (!uuidPattern.test(value)) return false;

          // Should not be null UUID
          if (value === '00000000-0000-0000-0000-000000000000') return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid, non-null UUID`;
        },
      },
    });
  };
}

/**
 * Validates password strength according to OWASP guidelines
 * Addresses OWASP A07:2021 - Identification and Authentication Failures
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          // OWASP password requirements
          const minLength = 8;
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumbers = /\d/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

          return (
            value.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters`;
        },
      },
    });
  };
}

/**
 * Validates input against common injection patterns
 * General purpose security validator
 */
export function IsSecureInput(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSecureInput',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _args: ValidationArguments) {
          if (typeof value !== 'string') return true;

          // Combined security patterns
          const dangerousPatterns = [
            // SQL injection
            /union\s+select/i,
            /or\s+1\s*=\s*1/i,
            /drop\s+table/i,

            // XSS
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,

            // Command injection
            /;\s*(rm|del|format|shutdown)/i,
            /\|\s*(wget|curl|nc)/i,

            // Path traversal
            /\.\.\//,
            /\.\.\\/,
          ];

          return !dangerousPatterns.some((pattern) => pattern.test(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains potentially dangerous patterns`;
        },
      },
    });
  };
}
