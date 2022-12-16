/*
  Warnings:

  - The `status` column on the `BuyOffer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `SellOffer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'NO_SUFFICIENT_FUNDS', 'NO_USER_STOCK', 'OFFER_REALIZED', 'TRANSACTION_REALIZED');

-- AlterTable
ALTER TABLE "BuyOffer" DROP COLUMN "status",
ADD COLUMN     "status" "OfferStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "SellOffer" DROP COLUMN "status",
ADD COLUMN     "status" "OfferStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "OfferStatus" NOT NULL DEFAULT 'TRANSACTION_REALIZED';
