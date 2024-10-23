import { Injectable } from "@nestjs/common";

import { PrismaTokenRepository } from "../infrastructure/persistence/prisma/token.repository";

@Injectable()
export class HederaListTokenService {
  constructor(private readonly repository: PrismaTokenRepository) {}

  async listTokens(userId: number) {
    return await this.repository.findMany({
      ownerId: userId,
    });
  }
}
