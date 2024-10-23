import { Module } from "@nestjs/common";

import { ApiHealthController } from "./controllers/health.controller";

@Module({
  controllers: [ApiHealthController],
})
export class ApiHealthModule {}
