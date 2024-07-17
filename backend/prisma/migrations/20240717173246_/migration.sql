/*
  Warnings:

  - A unique constraint covering the columns `[factureNumber]` on the table `BillInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BillInfo_factureNumber_key" ON "BillInfo"("factureNumber");
