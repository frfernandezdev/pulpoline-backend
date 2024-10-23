import type { Request } from "express";

import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";
import { HederaListTokenService } from "@/src/contexts/hedera/application/list-tokens.service";

import { HederaResponsePaginatorDTO } from "../dto/response.dto";

@ApiTags("hedera")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller({ path: "/list-tokens", version: "1" })
export class ApiHederaListTokenController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: HederaListTokenService,
  ) {}

  @Get()
  @HttpCode(200)
  async handle(@Req() req: Request) {
    return HederaResponsePaginatorDTO.make({
      results: await this.service.listTokens((req.user as any).id),
    });
  }
}
