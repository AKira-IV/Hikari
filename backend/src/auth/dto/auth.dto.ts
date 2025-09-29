import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
  IsAlphanumeric,
  MaxLength,
  IsString,
} from 'class-validator';
import { UserRole } from '../../database/entities/user.entity';
import {
  IsNotSQLInjection,
  IsNotXSS,
  IsStrongPassword,
  IsSecureInput,
} from '../../common/validators/security.validators';

export class LoginDto {
  @IsEmail()
  @IsNotXSS()
  @IsNotSQLInjection()
  email: string;

  @IsNotEmpty()
  @IsSecureInput()
  password: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsNotXSS()
  @IsNotSQLInjection()
  tenantSubdomain: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @IsSecureInput()
  captchaToken?: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotXSS()
  @IsNotSQLInjection()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsNotXSS()
  @IsNotSQLInjection()
  firstName: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsNotXSS()
  @IsNotSQLInjection()
  lastName: string;

  @IsOptional()
  @MaxLength(20)
  @IsSecureInput()
  phone?: string;

  @IsOptional()
  @MaxLength(500)
  @IsNotXSS()
  @IsNotSQLInjection()
  address?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(50)
  @IsNotXSS()
  @IsNotSQLInjection()
  tenantSubdomain: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @IsSecureInput()
  captchaToken: string;
}

export class CreateTenantDto {
  @IsNotEmpty()
  @MaxLength(200)
  @IsNotXSS()
  @IsNotSQLInjection()
  name: string;

  @IsNotEmpty()
  subdomain: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  adminEmail: string;

  @IsNotEmpty()
  @MinLength(6)
  adminPassword: string;

  @IsNotEmpty()
  adminFirstName: string;

  @IsNotEmpty()
  adminLastName: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
