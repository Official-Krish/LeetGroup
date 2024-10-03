/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "groupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupId_key" ON "Group"("groupId");
