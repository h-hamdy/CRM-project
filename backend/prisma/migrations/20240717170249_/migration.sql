-- CreateTable
CREATE TABLE "BillInfo" (
    "id" SERIAL NOT NULL,
    "client" TEXT NOT NULL,
    "factureNumber" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Subtotal" TEXT NOT NULL,
    "SalesTax" TEXT NOT NULL,
    "TotalValue" TEXT NOT NULL,

    CONSTRAINT "BillInfo_pkey" PRIMARY KEY ("id")
);
