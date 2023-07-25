/*
  Warnings:

  - You are about to drop the column `role` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "role",
DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;
