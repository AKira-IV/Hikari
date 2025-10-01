import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../database/entities/user.entity';
import { Tenant } from '../database/entities/tenant.entity';
import { RefreshToken } from '../database/entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tenant, RefreshToken]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // ✅ RSA Asymmetric Cryptography - Compatible with current NestJS JWT
        // TODO: Upgrade to ED25519 when @nestjs/jwt supports EdDSA algorithm
        const privateKeyBase64 = configService.get<string>('JWT_PRIVATE_KEY');
        const publicKeyBase64 = configService.get<string>('JWT_PUBLIC_KEY');

        if (!privateKeyBase64 || !publicKeyBase64) {
          console.warn('JWT keys not found, falling back to symmetric for development');
          return {
            secret: configService.get<string>('JWT_SECRET') || 'fallback-dev-secret',
            signOptions: {
              expiresIn: configService.get<string>('JWT_EXPIRATION') || '15m',
            },
          };
        }

        const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');
        const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');

        return {
          privateKey,
          publicKey,
          signOptions: {
            algorithm: 'RS256', // RSA-SHA256 - Asymmetric and widely supported
            expiresIn: configService.get<string>('JWT_EXPIRATION') || '15m',
            issuer: configService.get<string>('JWT_ISSUER', 'hikari-app'),
            audience: configService.get<string>('JWT_AUDIENCE', 'hikari-users'),
          },
          verifyOptions: {
            algorithms: ['RS256'], // Only accept RSA signatures
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenService, LocalStrategy, JwtStrategy],
  exports: [AuthService, RefreshTokenService],
})
export class AuthModule {}
