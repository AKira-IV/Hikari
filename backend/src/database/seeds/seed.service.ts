import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    console.log('Starting database seeding...');

    // Create demo tenant
    const existingTenant = await this.tenantRepository.findOne({
      where: { subdomain: 'demo' }
    });

    let tenant: Tenant;
    if (!existingTenant) {
      tenant = this.tenantRepository.create({
        name: 'Hospital Demo',
        subdomain: 'demo',
        description: 'Hospital Demo para pruebas',
        isActive: true,
      });
      tenant = await this.tenantRepository.save(tenant);
      console.log('Demo tenant created');
    } else {
      tenant = existingTenant;
      console.log('Demo tenant already exists');
    }

    // Create admin user
    const existingAdmin = await this.userRepository.findOne({
      where: { email: 'admin@demo.com', tenantId: tenant.id }
    });

    if (!existingAdmin) {
      const adminUser = this.userRepository.create({
        email: 'admin@demo.com',
        password: await bcrypt.hash('admin123', 10),
        firstName: 'Admin',
        lastName: 'Demo',
        role: UserRole.ADMIN,
        tenantId: tenant.id,
        isActive: true,
      });
      await this.userRepository.save(adminUser);
      console.log('Admin user created: admin@demo.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Create doctor user
    const existingDoctor = await this.userRepository.findOne({
      where: { email: 'doctor@demo.com', tenantId: tenant.id }
    });

    if (!existingDoctor) {
      const doctorUser = this.userRepository.create({
        email: 'doctor@demo.com',
        password: await bcrypt.hash('doctor123', 10),
        firstName: 'Dr. Juan',
        lastName: 'Pérez',
        role: UserRole.DOCTOR,
        tenantId: tenant.id,
        isActive: true,
        phone: '+1234567890',
      });
      await this.userRepository.save(doctorUser);
      console.log('Doctor user created: doctor@demo.com / doctor123');
    } else {
      console.log('Doctor user already exists');
    }

    // Create nurse user
    const existingNurse = await this.userRepository.findOne({
      where: { email: 'nurse@demo.com', tenantId: tenant.id }
    });

    if (!existingNurse) {
      const nurseUser = this.userRepository.create({
        email: 'nurse@demo.com',
        password: await bcrypt.hash('nurse123', 10),
        firstName: 'María',
        lastName: 'González',
        role: UserRole.NURSE,
        tenantId: tenant.id,
        isActive: true,
        phone: '+1234567891',
      });
      await this.userRepository.save(nurseUser);
      console.log('Nurse user created: nurse@demo.com / nurse123');
    } else {
      console.log('Nurse user already exists');
    }

    console.log('Database seeding completed!');
  }
}
