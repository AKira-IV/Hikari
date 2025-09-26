import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimit {
  maxRequests: number;
  windowMs: number;
}

interface ClientData {
  count: number;
  resetTime: number;
}

/**
 * Rate Limiting Middleware
 * Addresses OWASP A07:2021 - Identification and Authentication Failures
 * Prevents brute force attacks and API abuse
 */
@Injectable()
export class RateLimitingMiddleware implements NestMiddleware {
  private requestCounts = new Map<string, ClientData>();

  // Rate limiting rules by endpoint pattern
  private rateLimits: Record<string, RateLimit> = {
    '/auth/login': { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
    '/auth/register': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
    '/auth/tenant': { maxRequests: 2, windowMs: 60 * 60 * 1000 }, // 2 requests per hour
    default: { maxRequests: 100, windowMs: 15 * 60 * 1000 }, // 100 requests per 15 minutes
  };

  use(req: Request, res: Response, next: NextFunction) {
    const clientId = this.getClientIdentifier(req);
    const endpoint = this.getEndpointPattern(req.path);
    const rateLimit = this.rateLimits[endpoint] || this.rateLimits.default;

    const now = Date.now();
    const clientData = this.requestCounts.get(clientId);

    if (!clientData || now > clientData.resetTime) {
      // Reset counter for new window
      this.requestCounts.set(clientId, {
        count: 1,
        resetTime: now + rateLimit.windowMs,
      });
      next();
      return;
    }

    if (clientData.count >= rateLimit.maxRequests) {
      // Rate limit exceeded
      const remainingTime = Math.ceil((clientData.resetTime - now) / 1000);

      res.setHeader('X-RateLimit-Limit', rateLimit.maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', remainingTime);

      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Rate limit exceeded. Try again in ${remainingTime} seconds.`,
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Increment counter
    clientData.count++;
    this.requestCounts.set(clientId, clientData);

    // Set response headers
    res.setHeader('X-RateLimit-Limit', rateLimit.maxRequests);
    res.setHeader(
      'X-RateLimit-Remaining',
      rateLimit.maxRequests - clientData.count,
    );
    res.setHeader(
      'X-RateLimit-Reset',
      Math.ceil((clientData.resetTime - now) / 1000),
    );

    next();
  }

  /**
   * Gets unique client identifier for rate limiting
   */
  private getClientIdentifier(req: Request): string {
    // Use IP address and User-Agent for basic identification
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // If authenticated, use user ID + tenant ID for more granular limiting
    if ((req as any).user) {
      const user = (req as any).user;
      return `${user.id}-${user.tenantId || 'unknown'}`;
    }

    // Create hash of IP + User-Agent for anonymous requests
    return `${ip}-${this.simpleHash(userAgent)}`;
  }

  /**
   * Maps request path to rate limiting pattern
   */
  private getEndpointPattern(path: string): string {
    for (const pattern of Object.keys(this.rateLimits)) {
      if (pattern !== 'default' && path.includes(pattern)) {
        return pattern;
      }
    }
    return 'default';
  }

  /**
   * Simple hash function for creating client identifiers
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /**
   * Cleanup old entries (should be called periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.requestCounts.entries()) {
      if (now > data.resetTime) {
        this.requestCounts.delete(key);
      }
    }
  }
}
