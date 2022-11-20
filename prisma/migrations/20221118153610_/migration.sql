-- CreateTable
CREATE TABLE "BuyOffer" (
    "buyOfferId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "unitBuyPriceCents" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BuyOffer_pkey" PRIMARY KEY ("buyOfferId")
);

-- CreateTable
CREATE TABLE "Company" (
    "companyId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "SellOffer" (
    "sellOfferId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userStockId" INTEGER NOT NULL,
    "unitSellPriceCents" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SellOffer_pkey" PRIMARY KEY ("sellOfferId")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateTable
CREATE TABLE "CompanyStockPriceHistory" (
    "companyStockPriceHistoryId" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "changeDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyStockPriceHistory_pkey" PRIMARY KEY ("companyStockPriceHistoryId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" SERIAL NOT NULL,
    "buyOfferId" INTEGER NOT NULL,
    "sellOfferId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "passwordSalt" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "balanceCents" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserStock" (
    "userStockId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "UserStock_pkey" PRIMARY KEY ("userStockId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BuyOffer" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOffer" ADD CONSTRAINT "BuyOffer" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOffer" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOffer" ADD CONSTRAINT "UserStock" FOREIGN KEY ("userStockId") REFERENCES "UserStock"("userStockId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyStockPriceHistory" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "BuyOffer" FOREIGN KEY ("buyOfferId") REFERENCES "BuyOffer"("buyOfferId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Buyer" FOREIGN KEY ("buyerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "SellOffer" FOREIGN KEY ("sellOfferId") REFERENCES "SellOffer"("sellOfferId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Seller" FOREIGN KEY ("sellerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE NO ACTION;
