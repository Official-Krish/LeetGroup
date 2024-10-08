/*
  Warnings:

  - Made the column `striver_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "striver_id" SET NOT NULL;
