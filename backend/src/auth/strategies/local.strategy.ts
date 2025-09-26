import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const tenantSubdomain = (req.body as { tenantSubdomain?: string })
      .tenantSubdomain;
    if (!tenantSubdomain) {
      throw new UnauthorizedException('Tenant subdomain is required');
    }
    const user = await this.authService.validateUser(
      email,
      password,
      tenantSubdomain,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
