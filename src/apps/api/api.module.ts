import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";

import { ApiAuthModule } from "./auth/auth.module";
import { ApiHealthModule } from "./health/health.module";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        MY_ACCOUNT_ID: Joi.string().required(),
        MY_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    ApiHealthModule,
    ApiAuthModule,
  ],
})
export class ApiModule {}
