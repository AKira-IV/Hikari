import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { User } from '../../database/entities/user.entity';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  tenantId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    // RSA Asymmetric Verification - Only public key needed
    // TODO: Upgrade to ED25519 when @nestjs/jwt supports EdDSA algorithm
    const publicKeyBase64 = configService.get<string>('JWT_PUBLIC_KEY');
    const fallbackSecret = configService.get<string>('JWT_SECRET');

    let jwtConfig: StrategyOptionsWithoutRequest;

    if (publicKeyBase64) {
      // Asymmetric verification with RSA-SHA256
      const publicKey = Buffer.from(publicKeyBase64, 'base64').toString(
        'utf-8',
      );
      jwtConfig = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: publicKey,
        algorithms: ['RS256'], // Only accept RSA signatures
        issuer: configService.get<string>('JWT_ISSUER', 'hikari-app'),
        audience: configService.get<string>('JWT_AUDIENCE', 'hikari-users'),
      };
    } else {
      // Fallback to symmetric for development only
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Authentication configuration error');
      }

      jwtConfig = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: fallbackSecret || 'fallback-dev-secret',
      };
    }

    super(jwtConfig);

    // Log warning after super() call
    if (!publicKeyBase64) {
      this.logger.warn(
        'Authentication configuration incomplete - using fallback mode',
      );
    }
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    return this.authService.findUserById(payload.sub);
  }
}
