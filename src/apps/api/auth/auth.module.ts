import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ApiAuthLoginController } from "./controllers/login.controller";
import { ApiAuthLogoutController } from "./controllers/logout.controller";
import { ApiAuthRegisterController } from "./controllers/register.controller";
import { ApiAuthUserController } from "./controllers/user.controller";

@Module({
  imports: [
    RouterModule.register([
      {
        path: "/auth", // Aquí defines el prefijo del módulo
        module: ApiAuthModule,
      },
    ]),
  ],
  controllers: [
    ApiAuthLoginController,
    ApiAuthLogoutController,
    ApiAuthRegisterController,
    ApiAuthUserController,
  ],
})
export class ApiAuthModule {}
