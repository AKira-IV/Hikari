import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../database/entities/user.entity';
import { Tenant } from '../database/entities/tenant.entity';
import { LoginDto, RegisterDto, CreateTenantDto, RefreshTokenDto } from './dto/auth.dto';
import { CaptchaService } from '../common/services/captcha.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
    private captchaService: CaptchaService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    tenantSubdomain: string,
  ): Promise<User | null> {
    const tenant = await this.tenantRepository.findOne({
      where: { subdomain: tenantSubdomain, isActive: true },
    });

    if (!tenant) {
      return null;
    }

    const user = await this.userRepository.findOne({
      where: { email, tenantId: tenant.id, isActive: true },
      relations: ['tenant'],
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId, isActive: true },
      relations: ['tenant'],
    });
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.tenantSubdomain,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tenantId: user.tenantId,
      tenantSubdomain: user.tenant.subdomain,
    };

    // Generar access token (corta duración)
    const accessToken = this.jwtService.sign(payload);

    // Generar refresh token (larga duración)
    const refreshToken = await this.refreshTokenService.generateRefreshToken(
      user,
      ipAddress,
      userAgent,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          subdomain: user.tenant.subdomain,
        },
      },
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto, ipAddress?: string, userAgent?: string) {
    // Validar refresh token y obtener usuario
    const user = await this.refreshTokenService.validateRefreshToken(
      refreshTokenDto.refreshToken,
    );

    // Rotar el refresh token por seguridad
    const newRefreshToken = await this.refreshTokenService.rotateRefreshToken(
      refreshTokenDto.refreshToken,
      ipAddress,
      userAgent,
    );

    // Generar nuevo access token
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tenantId: user.tenantId,
      tenantSubdomain: user.tenant.subdomain,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken.token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          subdomain: user.tenant.subdomain,
        },
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokenService.revokeRefreshToken(refreshToken);
  }

  async logoutAllSessions(userId: string): Promise<void> {
    await this.refreshTokenService.revokeAllUserTokens(userId);
  }

  async register(registerDto: RegisterDto) {
    await this.captchaService.verify(registerDto.captchaToken);

    const tenant = await this.tenantRepository.findOne({
      where: { subdomain: registerDto.tenantSubdomain, isActive: true },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email, tenantId: tenant.id },
    });

    if (existingUser) {
      throw new ConflictException('User already exists in this tenant');
    }

    const user = this.userRepository.create({
      email: registerDto.email,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      address: registerDto.address,
      role: registerDto.role || UserRole.PATIENT,
      tenantId: tenant.id,
    });

    const savedUser = await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async createTenant(createTenantDto: CreateTenantDto) {
    // Check if tenant subdomain already exists
    const existingTenant = await this.tenantRepository.findOne({
      where: { subdomain: createTenantDto.subdomain },
    });

    if (existingTenant) {
      throw new ConflictException('Tenant subdomain already exists');
    }

    // Check if admin email already exists in any tenant
    const existingUser = await this.userRepository.findOne({
      where: { email: createTenantDto.adminEmail },
    });

    if (existingUser) {
      throw new ConflictException('Admin email already in use');
    }

    // Create tenant
    const tenant = this.tenantRepository.create({
      name: createTenantDto.name,
      subdomain: createTenantDto.subdomain,
      description: createTenantDto.description,
    });

    const savedTenant = await this.tenantRepository.save(tenant);

    // Create admin user
    const adminUser = this.userRepository.create({
      email: createTenantDto.adminEmail,
      password: createTenantDto.adminPassword,
      firstName: createTenantDto.adminFirstName,
      lastName: createTenantDto.adminLastName,
      role: UserRole.ADMIN,
      tenantId: savedTenant.id,
    });

    await this.userRepository.save(adminUser);

    return {
      tenant: {
        id: savedTenant.id,
        name: savedTenant.name,
        subdomain: savedTenant.subdomain,
        description: savedTenant.description,
      },
    };
  }

  async findTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({
      where: { subdomain, isActive: true },
    });
  }
}
