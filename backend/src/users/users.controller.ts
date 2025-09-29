import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentTenant } from '../common/decorators';
import { Roles, RolesGuard } from '../common/guards';
import { User, UserRole } from '../database/entities/user.entity';
import { Tenant } from '../database/entities/tenant.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users in tenant' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @Get()
  async findAll(@CurrentTenant() tenant: Tenant) {
    return this.usersService.findAllByTenant(tenant.id);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentTenant() tenant: Tenant) {
    return this.usersService.findOneById(id, tenant.id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
    @CurrentTenant() tenant: Tenant,
  ) {
    return this.usersService.updateUser(id, tenant.id, updateData);
  }

  @ApiOperation({ summary: 'Deactivate user' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deactivate(@Param('id') id: string, @CurrentTenant() tenant: Tenant) {
    await this.usersService.deactivateUser(id, tenant.id);
    return { message: 'User deactivated successfully' };
  }

  @ApiOperation({ summary: 'Get users by role' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @Get('role/:role')
  async findByRole(
    @Param('role') role: UserRole,
    @CurrentTenant() tenant: Tenant,
  ) {
    return this.usersService.findByRole(role, tenant.id);
  }
}
