/*
  Warnings:

  - You are about to drop the `Striver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Striver" DROP CONSTRAINT "Striver_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Striver" DROP CONSTRAINT "Striver_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "Striver" DROP CONSTRAINT "Striver_striverId_fkey";

-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "AtoZ" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "SDE" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sheet_79" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Striver";
