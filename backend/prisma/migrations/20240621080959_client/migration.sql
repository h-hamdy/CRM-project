-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "note" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
