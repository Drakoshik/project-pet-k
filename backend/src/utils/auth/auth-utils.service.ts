import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';

const HASH_SEPARATOR = '$';

type AuthTokenPayload = {
  userId: number;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthUtilsService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly JWT_ACCESS_TOKEN_EXPIRES_IN = '7d';
  private readonly JWT_REFRESH_TOKEN_EXPIRES_IN = '30d';

  public generateTokens(payload: AuthTokenPayload): AuthTokens {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.JWT_REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }

  public validateToken(token: string): AuthTokenPayload {
    return this.jwtService.verify(token);
  }

  public hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');
    return `${salt}${HASH_SEPARATOR}${hash}`;
  }

  public validatePassword(password: string, hashedPassword: string): boolean {
    const [salt, hash] = hashedPassword.split(HASH_SEPARATOR);
    if (!salt || !hash) return false;

    const hashToCompare = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');

    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(hashToCompare),
    );
  }
}
