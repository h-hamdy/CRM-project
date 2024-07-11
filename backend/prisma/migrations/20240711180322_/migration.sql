-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "factureNumber" INTEGER NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "Qte" INTEGER NOT NULL,
    "Tarif" INTEGER,
    "TarifN" INTEGER,
    "Title" TEXT NOT NULL,
    "Total" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "billId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
