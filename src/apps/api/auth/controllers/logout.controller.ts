import { Controller, HttpCode, Inject, Logger, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@Controller("/logout")
export class ApiAuthLogoutController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Post()
  @HttpCode(200)
  run() {
    return { status: "ok" };
  }
}