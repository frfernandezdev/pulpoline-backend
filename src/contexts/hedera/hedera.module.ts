import { Module } from "@nestjs/common";

import { HederaModule as _HederaModule } from "../shared/infrastructure/persistence/hedera/hedera.module";
import { PrismaModule } from "../shared/infrastructure/persistence/prisma/prisma.module";
import { HederaCreateTokenService } from "./application/create-token.service";
import { HederaListTokenService } from "./application/list-tokens.service";
import { PrismaTokenRepository } from "./infrastructure/persistence/prisma/token.repository";

@Module({
  imports: [PrismaModule, _HederaModule],
  providers: [
    PrismaTokenRepository,
    HederaCreateTokenService,
    HederaListTokenService,
  ],
  exports: [HederaCreateTokenService, HederaListTokenService],
})
export class HederaModule {}
