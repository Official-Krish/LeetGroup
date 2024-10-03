-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_groupId_fkey";

-- AlterTable
ALTER TABLE "Performance" ALTER COLUMN "groupId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;
