/*
  Warnings:

  - The primary key for the `account_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `account_types` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accountType` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_accountType_fkey";

-- AlterTable
ALTER TABLE "account_types" DROP CONSTRAINT "account_types_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "account_types_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountType",
ADD COLUMN     "accountType" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_accountType_fkey" FOREIGN KEY ("accountType") REFERENCES "account_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
