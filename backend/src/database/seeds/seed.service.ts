import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'SeedService.seed skipped: seeding is disabled in production.',
      );
      return;
    }

    console.log('Starting database seeding...');

    const tenant = await this.ensureDemoTenant();
    await this.ensureAdminUser(tenant.id);
    await this.ensureDoctorUser(tenant.id);
    await this.ensureNurseUser(tenant.id);

    console.log('Database seeding completed!');
  }

  private async ensureDemoTenant(): Promise<Tenant> {
    const existingTenant = await this.tenantRepository.findOne({
      where: { subdomain: 'demo' },
    });

    if (existingTenant) {
      console.log('Demo tenant already exists');
      return existingTenant;
    }

    const tenant = this.tenantRepository.create({
      name: 'Hospital Demo',
      subdomain: 'demo',
      description: 'Hospital demo para pruebas',
      isActive: true,
    });

    const savedTenant = await this.tenantRepository.save(tenant);
    console.log('Demo tenant created');
    return savedTenant;
  }

  private async ensureAdminUser(tenantId: string): Promise<void> {
    const existing = await this.userRepository.findOne({
      where: { email: 'admin@demo.com', tenantId },
    });

    if (existing) {
      console.log('Admin user already exists');
      return;
    }

    const password = this.resolveSeedPassword(
      'SEED_ADMIN_PASSWORD',
      'admin@demo.com',
    );

    const adminUser = this.userRepository.create({
      email: 'admin@demo.com',
      password,
      firstName: 'Admin',
      lastName: 'Demo',
      role: UserRole.ADMIN,
      tenantId,
      isActive: true,
    });

    await this.userRepository.save(adminUser);
    this.logCredential('admin@demo.com', password, 'SEED_ADMIN_PASSWORD');
  }

  private async ensureDoctorUser(tenantId: string): Promise<void> {
    const existing = await this.userRepository.findOne({
      where: { email: 'doctor@demo.com', tenantId },
    });

    if (existing) {
      console.log('Doctor user already exists');
      return;
    }

    const password = this.resolveSeedPassword(
      'SEED_DOCTOR_PASSWORD',
      'doctor@demo.com',
    );

    const doctorUser = this.userRepository.create({
      email: 'doctor@demo.com',
      password,
      firstName: 'Dr. Juan',
      lastName: 'Perez',
      role: UserRole.DOCTOR,
      tenantId,
      isActive: true,
      phone: '+1234567890',
    });

    await this.userRepository.save(doctorUser);
    this.logCredential('doctor@demo.com', password, 'SEED_DOCTOR_PASSWORD');
  }

  private async ensureNurseUser(tenantId: string): Promise<void> {
    const existing = await this.userRepository.findOne({
      where: { email: 'nurse@demo.com', tenantId },
    });

    if (existing) {
      console.log('Nurse user already exists');
      return;
    }

    const password = this.resolveSeedPassword(
      'SEED_NURSE_PASSWORD',
      'nurse@demo.com',
    );

    const nurseUser = this.userRepository.create({
      email: 'nurse@demo.com',
      password,
      firstName: 'Maria',
      lastName: 'Gonzalez',
      role: UserRole.NURSE,
      tenantId,
      isActive: true,
      phone: '+1234567891',
    });

    await this.userRepository.save(nurseUser);
    this.logCredential('nurse@demo.com', password, 'SEED_NURSE_PASSWORD');
  }

  private resolveSeedPassword(envKey: string, userLabel: string): string {
    const provided = process.env[envKey];

    if (provided && provided.trim().length >= 8) {
      console.log(`Using password from ${envKey} for ${userLabel}`);
      return provided.trim();
    }

    const generated = this.generateRandomPassword();
    console.warn(
      `Generated password for ${userLabel}: ${generated} (override with ${envKey})`,
    );
    return generated;
  }

  private generateRandomPassword(length = 16): string {
    const candidate = randomBytes(length * 2)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '');
    return candidate.slice(0, length);
  }

  private logCredential(email: string, password: string, envKey: string): void {
    console.warn(
      `Seeded credentials for ${email}. Override via ${envKey}. Password: ${password}`,
    );
  }
}
