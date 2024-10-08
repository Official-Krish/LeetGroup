-- CreateTable
CREATE TABLE "Striver" (
    "id" SERIAL NOT NULL,
    "SDE" INTEGER NOT NULL,
    "AtoZ" INTEGER NOT NULL,
    "sheet_79" INTEGER NOT NULL,
    "performanceId" INTEGER NOT NULL,

    CONSTRAINT "Striver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Striver_performanceId_key" ON "Striver"("performanceId");

-- AddForeignKey
ALTER TABLE "Striver" ADD CONSTRAINT "Striver_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
