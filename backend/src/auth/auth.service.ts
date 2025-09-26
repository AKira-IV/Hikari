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
import { LoginDto, RegisterDto, CreateTenantDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
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

  async login(loginDto: LoginDto) {
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

    return {
      access_token: this.jwtService.sign(payload),
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

  async register(registerDto: RegisterDto) {
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

    // Remove password from response

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
