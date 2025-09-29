import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { CaptchaService } from '../../common/services/captcha.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly captchaService: CaptchaService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const body = req.body as {
      tenantSubdomain?: string;
      captchaToken?: string;
    };
    const tenantSubdomain = body.tenantSubdomain;

    if (!tenantSubdomain) {
      throw new UnauthorizedException('Tenant subdomain is required');
    }

    await this.captchaService.verify(body.captchaToken, req.ip);

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
