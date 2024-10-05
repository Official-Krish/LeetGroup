/*
  Warnings:

  - Added the required column `solvedDiff` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "solvedDiff" INTEGER NOT NULL;
