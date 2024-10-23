import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@/src/contexts/shared/infrastructure/persistence/prisma/prisma.client";

@Injectable()
export class PrismaTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findUnique(where: Prisma.TokenWhereUniqueInput) {
    return this.prisma.token.findUnique({ where });
  }

  findMany(where: Prisma.TokenWhereInput) {
    return this.prisma.token.findMany({ where });
  }

  create(data: Prisma.TokenCreateInput) {
    return this.prisma.token.create({ data });
  }

  delete(where: Prisma.TokenWhereUniqueInput) {
    return this.prisma.token.delete({ where });
  }
}
