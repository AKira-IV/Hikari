import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllByTenant(tenantId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { tenantId, isActive: true },
      relations: ['tenant'],
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'phone', 'isActive', 'createdAt', 'updatedAt']
    });
  }

  async findOneById(id: string, tenantId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, tenantId, isActive: true },
      relations: ['tenant'],
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'phone', 'address', 'dateOfBirth', 'isActive', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, tenantId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findOneById(id, tenantId);

    // Remove sensitive fields that shouldn't be updated via this method
    const { password, tenantId: _, ...safeUpdateData } = updateData as any;

    Object.assign(user, safeUpdateData);
    const updatedUser = await this.userRepository.save(user);

    const { password: __, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  }

  async deactivateUser(id: string, tenantId: string): Promise<void> {
    const user = await this.findOneById(id, tenantId);
    user.isActive = false;
    await this.userRepository.save(user);
  }

  async findByRole(role: UserRole, tenantId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { role, tenantId, isActive: true },
      relations: ['tenant'],
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'phone', 'isActive', 'createdAt']
    });
  }
}
