import { Controller, Get, HttpCode, Inject, Logger } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@Controller("/user")
export class ApiAuthUserController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @HttpCode(200)
  run() {
    return { status: "ok" };
  }
}
