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
        stockId: createBuyOfferDto.stockId,
        quantity: createBuyOfferDto.quantity,
        unitBuyPriceCents: createBuyOfferDto.unitBuyPriceCents,
        status: createBuyOfferDto.status,
      },
      select: {
        buyOfferId: true,
      },
    });
  }

  createSellOffer(createSellOfferDto: CreateSellOfferDto, userId: number) {
    return this.prisma.sellOffer.create({
      data: {
        userId: userId,
        userStockId: createSellOfferDto.stockId,
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
