import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from '../database/entities/refresh-token.entity';
import { User } from '../database/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private configService: ConfigService,
  ) {}

  /**
   * Genera un nuevo refresh token para un usuario
   */
  async generateRefreshToken(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<RefreshToken> {
    // Generar token único
    const token = this.generateRandomToken();

    // Configurar expiración (por defecto 7 días)
    const expirationDays = this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_DAYS') || 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Crear refresh token
    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId: user.id,
      tenantId: user.tenantId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  /**
   * Valida un refresh token y retorna el usuario asociado
   */
  async validateRefreshToken(token: string): Promise<User> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user', 'user.tenant'],
    });

    if (!refreshToken || !refreshToken.isActive) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return refreshToken.user;
  }

  /**
   * Rota un refresh token (revoca el actual y crea uno nuevo)
   */
  async rotateRefreshToken(
    currentToken: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<RefreshToken> {
    const oldRefreshToken = await this.refreshTokenRepository.findOne({
      where: { token: currentToken },
      relations: ['user'],
    });

    if (!oldRefreshToken || !oldRefreshToken.isActive) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generar nuevo token
    const newRefreshToken = await this.generateRefreshToken(
      oldRefreshToken.user,
      ipAddress,
      userAgent,
    );

    // Revocar el token anterior
    oldRefreshToken.isRevoked = true;
    oldRefreshToken.replacedByToken = newRefreshToken.token;
    await this.refreshTokenRepository.save(oldRefreshToken);

    return newRefreshToken;
  }

  /**
   * Revoca un refresh token específico
   */
  async revokeRefreshToken(token: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
    });

    if (refreshToken) {
      refreshToken.isRevoked = true;
      await this.refreshTokenRepository.save(refreshToken);
    }
  }

  /**
   * Revoca todos los refresh tokens de un usuario
   */
  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
  }

  /**
   * Limpia tokens expirados (tarea de limpieza)
   */
  async cleanupExpiredTokens(): Promise<void> {
    await this.refreshTokenRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  /**
   * Obtiene todos los tokens activos de un usuario (para gestión de sesiones)
   */
  async getUserActiveSessions(userId: string): Promise<RefreshToken[]> {
    return this.refreshTokenRepository.find({
      where: { userId, isRevoked: false },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Genera un token aleatorio seguro
   */
  private generateRandomToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}
