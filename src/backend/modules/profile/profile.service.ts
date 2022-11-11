import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AddWalletDto } from './dto/addWallet.dto';
import { GetUserBuyOfferQuery } from './dto/getUserBuyOffer.query';
import { GetUserSellOfferQuery } from './dto/getUserSellOffer.query';
import { GetUserStockQuery } from './dto/getUserStock.query';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  getUserProfile(userId: number) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        userId,
      },
      select: {
        userId: true,
        email: true,
        name: true,
        surname: true,
        balanceCents: true,
      },
    });
  }

  getUserStock(userId: number, getUserStockQuery: GetUserStockQuery) {
    return this.prisma.userStock.findMany({
      take: getUserStockQuery.take,
      skip: getUserStockQuery.skip,
      orderBy: {
        [getUserStockQuery.orderBy]: getUserStockQuery.orderType,
      },
      where: {
        userId,
        Company: {
          name: getUserStockQuery.companyName,
        },
      },
      select: {
        userStockId: true,
        stockQuantity: true,
        Company: {
          select: {
            companyId: true,
            name: true,
            description: true,
            Stock: {
              select: {
                stockId: true,
                quantity: true,
                priceCents: true,
              },
            },
          },
        },
      },
    });
  }

  getUserSellOffers(
    userId: number,
    getUserSellOfferQuery: GetUserSellOfferQuery,
  ) {
    return this.prisma.sellOffer.findMany({
      take: getUserSellOfferQuery.take,
      skip: getUserSellOfferQuery.skip,
      orderBy: {
        [getUserSellOfferQuery.orderBy]: getUserSellOfferQuery.orderType,
      },
      where: {
        userId,
        status: getUserSellOfferQuery.status,
      },
      select: {
        sellOfferId: true,
        userStockId: true,
        unitSellPriceCents: true,
        quantity: true,
        created: true,
        status: true,
      },
    });
  }

  getUserBuyOffers(
    userId: number,
    getUserSellOfferQuery: GetUserBuyOfferQuery,
  ) {
    return this.prisma.buyOffer.findMany({
      take: getUserSellOfferQuery.take,
      skip: getUserSellOfferQuery.skip,
      orderBy: {
        [getUserSellOfferQuery.orderBy]: getUserSellOfferQuery.orderType,
      },
      where: {
        userId,
        status: getUserSellOfferQuery.status,
        Stock: {
          Company: {
            name: getUserSellOfferQuery.companyName,
          },
        },
      },
      select: {
        buyOfferId: true,
        stockId: true,
        unitBuyPriceCents: true,
        quantity: true,
        created: true,
        status: true,
        Stock: {
          select: {
            companyId: true,
            Company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  updateUserAccount(userId: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        userId,
      },
      data: updateUserDto,
      select: {
        userId: true,
      },
    });
  }

  addWallet(userId: number, addWalletDto: AddWalletDto) {
    return this.prisma.user.update({
      where: {
        userId,
      },
      data: {
        balanceCents: {
          increment: addWalletDto.amountCents,
        },
      },
      select: {
        userId: true,
      },
    });
  }

  getUserWaller(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        userId,
      },
      select: {
        balanceCents: true,
      },
    });
  }
}
