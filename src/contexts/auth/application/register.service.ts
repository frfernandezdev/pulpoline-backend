import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

import { AuthSessionRepository } from "../infrastructure/persistence/prisma/session.repository";
import { AuthUserRepository } from "../infrastructure/persistence/prisma/user.repository";

@Injectable()
export class AuthRegisterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly repositoryUser: AuthUserRepository,
    private readonly repositorySession: AuthSessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.repositoryUser.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    const expiresIn = this.configService.get<number>("JWT_EXPIRES_IN") ?? 3600;
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + expiresIn);

    await this.repositorySession.create({
      user: {
        connect: {
          id: user.id,
        },
      },
      token,
      expiresAt: expiredAt,
    });

    return {
      ...user,
      access_token: token,
    };
  }
}
