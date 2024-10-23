import { Controller, Get, HttpCode, Inject, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller({ path: "health", version: "1" })
export class ApiHealthController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @HttpCode(200)
  run() {
    this.logger.log("Health endpoint called!");
    return { status: "ok" };
  }
}
