-- CreateTable
CREATE TABLE "BuyOffer" (
    "buyOfferId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "unitBuyPrice" DECIMAL(16,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BuyOffer_pkey" PRIMARY KEY ("buyOfferId")
);

-- CreateTable
CREATE TABLE "Company" (
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "SellOffer" (
    "sellOfferId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userStockId" INTEGER NOT NULL,
    "unitSellPrice" DECIMAL(16,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SellOffer_pkey" PRIMARY KEY ("sellOfferId")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(16,2) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateTable
CREATE TABLE "StockPriceHistory" (
    "stockPriceHistoryId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "price" DECIMAL(16,2) NOT NULL,
    "changeDate" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "StockPriceHistory_pkey" PRIMARY KEY ("stockPriceHistoryId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" INTEGER NOT NULL,
    "buyOfferId" INTEGER NOT NULL,
    "sellOfferId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "balance" DECIMAL(16,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserStock" (
    "userStockId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,

    CONSTRAINT "UserStock_pkey" PRIMARY KEY ("userStockId")
);

-- AddForeignKey
ALTER TABLE "BuyOffer" ADD CONSTRAINT "Stock" FOREIGN KEY ("stockId") REFERENCES "Stock"("stockId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOffer" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOffer" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StockPriceHistory" ADD CONSTRAINT "Stock" FOREIGN KEY ("stockId") REFERENCES "Stock"("stockId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "BuyOffer" FOREIGN KEY ("buyOfferId") REFERENCES "BuyOffer"("buyOfferId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Buyer" FOREIGN KEY ("buyerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "SellOffer" FOREIGN KEY ("sellOfferId") REFERENCES "SellOffer"("sellOfferId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Seller" FOREIGN KEY ("sellerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "Stock" FOREIGN KEY ("userStockId") REFERENCES "Stock"("stockId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
