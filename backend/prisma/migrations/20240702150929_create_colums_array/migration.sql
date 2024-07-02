/*
  Warnings:

  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_tableId_fkey";

-- DropTable
DROP TABLE "Column";

-- DropTable
DROP TABLE "Table";

-- CreateTable
CREATE TABLE "DynamicColumnTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "columns" TEXT NOT NULL DEFAULT '[]',

    CONSTRAINT "DynamicColumnTable_pkey" PRIMARY KEY ("id")
);
