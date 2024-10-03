/*
  Warnings:

  - Added the required column `groupId` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
