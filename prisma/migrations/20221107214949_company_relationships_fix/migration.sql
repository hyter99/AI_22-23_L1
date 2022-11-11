/*
  Warnings:

  - Added the required column `userId` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `UserStock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuyOffer" DROP CONSTRAINT "Stock";

-- DropForeignKey
ALTER TABLE "UserStock" DROP CONSTRAINT "Stock";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserStock" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "User" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStock" ADD CONSTRAINT "Company" FOREIGN KEY ("companyId") REFERENCES "Company"("companyId") ON DELETE CASCADE ON UPDATE NO ACTION;
