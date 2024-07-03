/*
  Warnings:

  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DynamicColumnTable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_tableId_fkey";

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Column";

-- DropTable
DROP TABLE "DynamicColumnTable";
