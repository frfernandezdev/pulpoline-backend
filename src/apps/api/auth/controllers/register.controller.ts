import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthRegisterService } from "@/src/contexts/auth/application/register.service";

import { RegisterDTO } from "../dto/register.dto";
import { AuthResponseDTO } from "../dto/response.dto";

@ApiTags("auth")
@ApiBearerAuth("access-token")
@Controller("/register")
export class ApiAuthRegisterController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly service: AuthRegisterService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() payload: RegisterDTO) {
    return AuthResponseDTO.make({
      result: await this.service.register(payload),
    });
  }
}
