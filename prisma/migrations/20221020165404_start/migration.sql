-- CreateTable
CREATE TABLE "buyOffer" (
    "buyOffer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "unit_buy_price" DECIMAL(16,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "buyOffer_pkey" PRIMARY KEY ("buyOffer_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "sellOffer" (
    "sellOffer_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_stock_id" INTEGER NOT NULL,
    "unit_sell_price" DECIMAL(16,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sellOffer_pkey" PRIMARY KEY ("sellOffer_id")
);

-- CreateTable
CREATE TABLE "stock" (
    "stock_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(16,2) NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "stockPriceHistory" (
    "historyPrice_id" INTEGER NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "price" DECIMAL(16,2) NOT NULL,
    "changeDate" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stockPriceHistory_pkey" PRIMARY KEY ("historyPrice_id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transaction_id" INTEGER NOT NULL,
    "buyOffer_id" INTEGER NOT NULL,
    "sellOffer_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "balance" DECIMAL(16,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "userStock" (
    "user_stock_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "stock_quantity" INTEGER NOT NULL,

    CONSTRAINT "userStock_pkey" PRIMARY KEY ("user_stock_id")
);

-- AddForeignKey
ALTER TABLE "buyOffer" ADD CONSTRAINT "stock" FOREIGN KEY ("stock_id") REFERENCES "stock"("stock_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyOffer" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellOffer" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "company" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stockPriceHistory" ADD CONSTRAINT "stock" FOREIGN KEY ("stock_id") REFERENCES "stock"("stock_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "buyOffer" FOREIGN KEY ("buyOffer_id") REFERENCES "buyOffer"("buyOffer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "buyer" FOREIGN KEY ("buyer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "sellOffer" FOREIGN KEY ("sellOffer_id") REFERENCES "sellOffer"("sellOffer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "seller" FOREIGN KEY ("seller_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStock" ADD CONSTRAINT "stock" FOREIGN KEY ("user_stock_id") REFERENCES "stock"("stock_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userStock" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
