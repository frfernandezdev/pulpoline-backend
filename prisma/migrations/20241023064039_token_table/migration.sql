-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
