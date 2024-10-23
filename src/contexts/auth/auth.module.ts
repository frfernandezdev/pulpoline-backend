import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaModule } from "../shared/infrastructure/persistence/prisma/prisma.module";
import { AuthLoginService } from "./application/login.service";
import { AuthLogoutService } from "./application/logout.service";
import { AuthRegisterService } from "./application/register.service";
import { AuthUserService } from "./application/user.service";
import { AuthValidateService } from "./application/validate.service";
import { AuthSessionRepository } from "./infrastructure/persistence/prisma/session.repository";
import { AuthUserRepository } from "./infrastructure/persistence/prisma/user.repository";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
    }),
  ],
  providers: [
    AuthUserRepository,
    AuthSessionRepository,
    AuthLoginService,
    AuthLogoutService,
    AuthRegisterService,
    AuthLogoutService,
    AuthValidateService,
    AuthUserService,
  ],
  exports: [
    AuthLoginService,
    AuthLogoutService,
    AuthRegisterService,
    AuthLogoutService,
    AuthValidateService,
    AuthUserService,
  ],
})
export class AuthModule {}
