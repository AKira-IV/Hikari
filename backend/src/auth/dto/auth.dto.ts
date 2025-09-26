import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../database/entities/user.entity';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  tenantSubdomain: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsNotEmpty()
  tenantSubdomain: string;
}

export class CreateTenantDto {
  @IsNotEmpty()
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
