import { Module } from "@nestjs/common";

import { HederaClient } from "./hedera.client";

@Module({
  providers: [HederaClient],
  exports: [HederaClient],
})
export class HederaModule {}
