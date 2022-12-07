import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { CreateBuyOfferDto } from './dto/create-buy-offer.dto';
import { CreateSellOfferDto } from './dto/create-sell-offer.dto';

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  createBuyOffer(createBuyOfferDto: CreateBuyOfferDto, userId: number) {
    return this.prisma.buyOffer.create({
      data: {
        userId: userId,
        companyId: createBuyOfferDto.companyId,
        quantity: createBuyOfferDto.quantity,
        unitBuyPriceCents: createBuyOfferDto.unitBuyPriceCents,
        status: createBuyOfferDto.status,
      },
      select: {
        buyOfferId: true,
      },
    });
  }

  async createSellOffer(
    createSellOfferDto: CreateSellOfferDto,
    userId: number,
  ) {
    const company = await this.prisma.userStock.findFirstOrThrow({
      select: { companyId: true },
      where: { userStockId: createSellOfferDto.userStockId },
    });

    const lowestPrice = await this.prisma.companyStockPriceHistory.findFirst({
      select: { priceCents: true, companyId: true },
      where: { companyId: company.companyId },
      orderBy: { priceCents: 'asc' },
    });

    if (
      (lowestPrice?.priceCents ?? 0) < createSellOfferDto.unitSellPriceCents
    ) {
      await this.prisma.companyStockPriceHistory.create({
        data: {
          priceCents: createSellOfferDto.unitSellPriceCents,
          companyId: company.companyId,
        },
      });
    }

    return this.prisma.sellOffer.create({
      data: {
        userId: userId,
        userStockId: createSellOfferDto.userStockId,
        quantity: createSellOfferDto.quantity,
        unitSellPriceCents: createSellOfferDto.unitSellPriceCents,
        status: createSellOfferDto.status,
      },
      select: {
        sellOfferId: true,
      },
    });
  }
}
