import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { HederaModule } from "@/src/contexts/hedera/hedera.module";

import { ApiHederaCreateTokenController } from "./controllers/create-token.controller";
import { ApiHederaListTokenController } from "./controllers/list-tokens.controller";

@Module({
  imports: [
    HederaModule,
    RouterModule.register([
      {
        path: "/hedera", // Aquí defines el prefijo del módulo
        module: ApiHederaModule,
      },
    ]),
  ],
  controllers: [ApiHederaCreateTokenController, ApiHederaListTokenController],
})
export class ApiHederaModule {}
