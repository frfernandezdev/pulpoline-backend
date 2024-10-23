import {
  AccountId,
  Client,
  PrivateKey,
  TokenCreateTransaction,
  TokenInfoQuery,
} from "@hashgraph/sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HederaClient {
  private client: Client;
  private operatorId: AccountId;

  constructor(configService: ConfigService) {
    const operatorId = AccountId.fromString(
      configService.get<string>("HEDERA_OPERATOR_ID") ?? "",
    );
    const operatorKey = PrivateKey.fromStringDer(
      configService.get<string>("HEDERA_OPERATOR_KEY") ?? "",
    );

    this.client = Client.forTestnet().setOperator(operatorId, operatorKey);
    this.operatorId = operatorId;
  }

  async createToken(symbol: string, name: string, initialSupply: number) {
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTreasuryAccountId(this.operatorId)
      .setInitialSupply(initialSupply)
      .execute(this.client);

    const receipt = await transaction.getReceipt(this.client);
    const tokenId = receipt.tokenId;

    return tokenId?.toString();
  }

  async getTokenInfo(tokenId: string) {
    const tokenInfo = await new TokenInfoQuery()
      .setTokenId(tokenId)
      .execute(this.client);

    return tokenInfo;
  }
}
