import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service responsible for verifying captcha challenges (Google reCAPTCHA v3).
 * Validation can be toggled through environment variables.
 */
@Injectable()
export class CaptchaService {
  private readonly logger = new Logger(CaptchaService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Verifies a captcha token against the Google reCAPTCHA API.
   * When captcha is disabled or misconfigured, verification is skipped.
   */
  async verify(token?: string, remoteIp?: string): Promise<void> {
    const enabled = this.isEnabled();
    const secret = this.configService.get<string>('RECAPTCHA_SECRET');

    if (!enabled) {
      return;
    }

    if (!secret) {
      this.logger.warn(
        'Captcha verification enabled but RECAPTCHA_SECRET is missing',
      );
      throw new BadRequestException('Captcha configuration error');
    }

    if (!token) {
      throw new BadRequestException('Captcha token is required');
    }

    const verificationResult = await this.requestVerification(
      secret,
      token,
      remoteIp,
    );

    if (!verificationResult.success) {
      const errors = JSON.stringify(verificationResult['error-codes'] ?? []);
      this.logger.warn(`Captcha verification failed: ${errors}`);
      throw new BadRequestException('Captcha validation failed');
    }

    const minScore = this.getMinScore();

    if (
      typeof verificationResult.score === 'number' &&
      verificationResult.score < minScore
    ) {
      this.logger.warn(
        `Captcha score below threshold: ${verificationResult.score}`,
      );
      throw new BadRequestException('Captcha score too low');
    }
  }

  private isEnabled(): boolean {
    const flag = this.configService.get<string>('RECAPTCHA_ENABLED');

    if (!flag) {
      return false;
    }

    return flag.toLowerCase() === 'true' || flag === '1';
  }

  private getMinScore(): number {
    const configured = this.configService.get<string>('RECAPTCHA_MIN_SCORE');
    const parsed = configured ? Number(configured) : NaN;

    if (Number.isFinite(parsed)) {
      return parsed;
    }

    return 0.5;
  }

  private async requestVerification(
    secret: string,
    token: string,
    remoteIp?: string,
  ) {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.append('remoteip', remoteIp);
    }

    try {
      const response = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        },
      );

      if (!response.ok) {
        this.logger.error(
          `Captcha verification HTTP error: ${response.status}`,
        );
        throw new BadRequestException('Captcha verification unavailable');
      }

      return (await response.json()) as {
        success: boolean;
        score?: number;
        challenge_ts?: string;
        hostname?: string;
        'error-codes'?: string[];
      };
    } catch (error) {
      const trace = error instanceof Error ? error.stack : undefined;
      this.logger.error('Captcha verification request failed', trace);
      throw new BadRequestException('Captcha verification failed');
    }
  }
}
