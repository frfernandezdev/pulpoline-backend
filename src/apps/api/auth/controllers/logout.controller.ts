import type { Request } from "express";

import {
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthLogoutService } from "@/src/contexts/auth/application/logout.service";
import { JwtGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";

import { AuthResponseDTO } from "../dto/response.dto";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@UseGuards(JwtGuard)
@Controller({ path: "/logout", version: "1" })
export class ApiAuthLogoutController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: AuthLogoutService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(@Req() req: Request) {
    const token = req.headers.authorization?.split(" ")[1] ?? "";
    return AuthResponseDTO.make({
      result: await this.service.logout((req.user as any).id, token),
    });
  }
}
