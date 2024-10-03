/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `Performance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Performance_userId_groupId_key" ON "Performance"("userId", "groupId");
