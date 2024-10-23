import { Injectable } from "@nestjs/common";

import { HederaClient } from "../../shared/infrastructure/persistence/hedera/hedera.client";
import { PrismaTokenRepository } from "../infrastructure/persistence/prisma/token.repository";

@Injectable()
export class HederaCreateTokenService {
  constructor(
    private readonly repository: PrismaTokenRepository,
    private readonly client: HederaClient,
  ) {}

  async createToken(
    symbol: string,
    userId: number,
    name: string,
    initialSupply: number,
  ) {
    const tokenId = await this.client.createToken(symbol, name, initialSupply);
    await this.repository.create({
      owner: {
        connect: {
          id: userId,
        },
      },
      name,
      initialSupply,
      symbol,
      tokenId: tokenId ?? "",
    });

    return { tokenId };
  }
}
