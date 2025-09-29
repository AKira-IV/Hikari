import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards';
import { SecurityService } from '../common/services/security.service';

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    findAllByTenant: jest.fn(),
    findOneById: jest.fn(),
    updateUser: jest.fn(),
    deactivateUser: jest.fn(),
    findByRole: jest.fn(),
  };

  const securityServiceMock = {
    validateUserContext: jest.fn().mockReturnValue({
      userId: 'user-id',
      tenantId: 'tenant-id',
      role: 'admin',
      permissions: [],
      isValid: true,
      lastValidated: new Date(),
    }),
    performSecurityValidation: jest.fn().mockReturnValue({
      isValid: true,
      errors: [],
      riskLevel: 'LOW',
      timestamp: new Date(),
    }),
    validateTenantAccess: jest.fn(),
    sanitizeInput: jest.fn(),
    createSecureRequest: jest.fn(),
  };

  const JwtAuthGuard = AuthGuard('jwt');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: SecurityService, useValue: securityServiceMock },
        {
          provide: RolesGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
        {
          provide: JwtAuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
