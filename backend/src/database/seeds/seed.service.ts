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

    const tenant = await this.upsertDemoTenant();
    await this.upsertAdminUser(tenant.id);
    await this.upsertDoctorUser(tenant.id);
    await this.upsertNurseUser(tenant.id);

    console.log('Database seeding completed!');
  }

  private async upsertDemoTenant(): Promise<Tenant> {
    try {
      // GOOD: Trust constraints, use INSERT ON CONFLICT
      const result = await this.tenantRepository
        .createQueryBuilder()
        .insert()
        .into(Tenant)
        .values({
          name: 'Hospital Demo',
          subdomain: 'demo',
          description: 'Hospital demo para pruebas',
          isActive: true,
        })
        .orUpdate(['name', 'description', 'isActive'], ['subdomain'])
        .returning('*')
        .execute();

      let tenant: Tenant;
      if (Array.isArray(result.raw) && result.raw.length > 0) {
        tenant = result.raw[0] as Tenant;
      } else if (
        Array.isArray(result.generatedMaps) &&
        result.generatedMaps.length > 0
      ) {
        tenant = result.generatedMaps[0] as Tenant;
      } else {
        throw new Error(
          'Upserted tenant not returned by database - check RETURNING clause',
        );
      }

      console.log('Demo tenant ready (created or updated)');
      return tenant;
    } catch (error: unknown) {
      // Fallback: si el upsert falla, buscar el existente
      const existing = await this.tenantRepository.findOne({
        where: { subdomain: 'demo' },
      });
      if (existing) {
        console.log('Demo tenant already exists (fallback)');
        return existing;
      }
      console.error('Failed to upsert demo tenant:', error);
      throw error;
    }
  }

  private async upsertAdminUser(tenantId: string): Promise<void> {
    const password = this.resolveSeedPassword(
      'SEED_ADMIN_PASSWORD',
      'admin@demo.com',
    );

    try {
      // GOOD: Try to create directly, trust constraints
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: 'admin@demo.com',
          password,
          firstName: 'Admin',
          lastName: 'Demo',
          role: UserRole.ADMIN,
          tenantId,
          isActive: true,
        })
        .orIgnore() // Si ya existe, ignorar
        .execute();

      // Solo log si la operación fue exitosa
      this.logCredential('admin@demo.com', password, 'SEED_ADMIN_PASSWORD');
    } catch (error: unknown) {
      // Si el constraint falla, es que ya existe
      if (this.isUniqueConstraintError(error)) {
        console.log('Admin user already exists (constraint)');
        return;
      }
      console.error('Failed to upsert admin user:', error);
      throw error;
    }
  }

  private async upsertDoctorUser(tenantId: string): Promise<void> {
    const password = this.resolveSeedPassword(
      'SEED_DOCTOR_PASSWORD',
      'doctor@demo.com',
    );

    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: 'doctor@demo.com',
          password,
          firstName: 'Dr. Juan',
          lastName: 'Perez',
          role: UserRole.DOCTOR,
          tenantId,
          isActive: true,
          phone: '+1234567890',
        })
        .orIgnore()
        .execute();

      // Solo log si la operación fue exitosa
      this.logCredential('doctor@demo.com', password, 'SEED_DOCTOR_PASSWORD');
    } catch (error: unknown) {
      if (this.isUniqueConstraintError(error)) {
        console.log('Doctor user already exists (constraint)');
        return;
      }
      console.error('Failed to upsert doctor user:', error);
      throw error;
    }
  }

  private async upsertNurseUser(tenantId: string): Promise<void> {
    const password = this.resolveSeedPassword(
      'SEED_NURSE_PASSWORD',
      'nurse@demo.com',
    );

    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: 'nurse@demo.com',
          password,
          firstName: 'Maria',
          lastName: 'Gonzalez',
          role: UserRole.NURSE,
          tenantId,
          isActive: true,
          phone: '+1234567891',
        })
        .orIgnore()
        .execute();

      // Solo log si la operación fue exitosa
      this.logCredential('nurse@demo.com', password, 'SEED_NURSE_PASSWORD');
    } catch (error: unknown) {
      if (this.isUniqueConstraintError(error)) {
        console.log('Nurse user already exists (constraint)');
        return;
      }
      console.error('Failed to upsert nurse user:', error);
      throw error;
    }
  }

  private isUniqueConstraintError(error: unknown): boolean {
    // PostgreSQL unique constraint violation
    const err = error as { code?: string; constraint?: string };
    return (
      err?.code === '23505' || (err?.constraint?.includes('unique') ?? false)
    );
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
