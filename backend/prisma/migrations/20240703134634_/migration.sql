-- CreateTable
CREATE TABLE "RowData" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "RowData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RowData" ADD CONSTRAINT "RowData_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
