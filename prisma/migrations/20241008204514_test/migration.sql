/*
  Warnings:

  - A unique constraint covering the columns `[striverId]` on the table `Striver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[striver_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `Striver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `striverId` to the `Striver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Striver" ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "striverId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Striver_striverId_key" ON "Striver"("striverId");

-- CreateIndex
CREATE UNIQUE INDEX "User_striver_id_key" ON "User"("striver_id");

-- AddForeignKey
ALTER TABLE "Striver" ADD CONSTRAINT "Striver_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Striver" ADD CONSTRAINT "Striver_striverId_fkey" FOREIGN KEY ("striverId") REFERENCES "User"("striver_id") ON DELETE RESTRICT ON UPDATE CASCADE;
