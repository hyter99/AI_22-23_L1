/*
  Warnings:

  - You are about to alter the column `unitBuyPrice` on the `BuyOffer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(16,2)` to `Integer`.
  - You are about to alter the column `unitSellPrice` on the `SellOffer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(16,2)` to `Integer`.
  - You are about to alter the column `price` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(16,2)` to `Integer`.
  - You are about to alter the column `price` on the `StockPriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(16,2)` to `Integer`.
  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(16,2)` to `Integer`.
  - Added the required column `unitBuyPriceDecimal` to the `BuyOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitSellPriceDecimal` to the `SellOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDecimal` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceDecimal` to the `StockPriceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balanceDecimal` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuyOffer" ADD COLUMN     "unitBuyPriceDecimal" INTEGER NOT NULL,
ALTER COLUMN "unitBuyPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "SellOffer" ADD COLUMN     "unitSellPriceDecimal" INTEGER NOT NULL,
ALTER COLUMN "unitSellPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "priceDecimal" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "StockPriceHistory" ADD COLUMN     "priceDecimal" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balanceDecimal" INTEGER NOT NULL,
ALTER COLUMN "balance" DROP DEFAULT,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;
