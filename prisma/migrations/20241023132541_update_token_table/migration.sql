/*
  Warnings:

  - Added the required column `initialSupply` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "initialSupply" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
