/*
  Warnings:

  - You are about to drop the `StockPriceHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StockPriceHistory" DROP CONSTRAINT "Stock";

-- DropTable
DROP TABLE "StockPriceHistory";

-- CreateTable
CREATE TABLE "CompanyStockPriceHistory" (
    "companyStockPriceHistoryId" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "changeDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyStockPriceHistory_pkey" PRIMARY KEY ("companyStockPriceHistoryId")
);

-- AddForeignKey
ALTER TABLE "CompanyStockPriceHistory" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION;
