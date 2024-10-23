import type { Request } from "express";

import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "@/src/contexts/auth/infrastructure/guards/jwt.guard";
import { HederaCreateTokenService } from "@/src/contexts/hedera/application/create-token.service";

import { CreateTokenDTO } from "../dto/create-token.dto";
import { HederaResponseDTO } from "../dto/response.dto";

@ApiTags("hedera")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller({ path: "/create-token-hedera", version: "1" })
export class ApiHederaCreateTokenController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: HederaCreateTokenService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Req() req: Request,
    @Body() { symbol, name, initialSupply }: CreateTokenDTO,
  ) {
    return HederaResponseDTO.make({
      result: await this.service.createToken(
        symbol,
        (req.user as any).id,
        name,
        initialSupply,
      ),
    });
  }
}
