import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  // @Cron(new Date(Date.now() + 5000))
  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    // 0 - Active offer
    // 1 - Expired offer
    // 2 - User has no sufficient funds
    // 3 - User has no stock
    // 4 - Offer realized
    // 5 - Transaction realized

    this.checkOfferValidity();
    this.transactionCycle();
  }

  async getActiveBuyOffers() {
    return this.prisma.buyOffer.findMany({
      where: {
        status: 0,
      },
      select: {
        buyOfferId: true,
        companyId: true,
        userId: true,
        quantity: true,
        unitBuyPriceCents: true,
        User: {
          select: {
            balanceCents: true,
          },
        },
      },
      orderBy: {
        created: 'asc',
      },
    });
  }

  async checkOfferValidity() {
    await this.prisma.buyOffer.updateMany({
      where: {
        status: 0,
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
      data: {
        status: 1,
      },
    });

    await this.prisma.sellOffer.updateMany({
      where: {
        status: 0,
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
      data: {
        status: 1,
      },
    });
  }

  async transactionCycle() {
    const activeBuyOffers = await this.getActiveBuyOffers();

    for (const buyOffer of activeBuyOffers) {
      await this.findMatchingSellOffers(buyOffer);
    }
  }

  async findMatchingSellOffers(
    buyOffer: Awaited<ReturnType<typeof this.getActiveBuyOffers>>[number],
  ) {
    const { balanceCents } = buyOffer.User;
    let { quantity } = buyOffer;

    if (balanceCents < quantity * buyOffer.unitBuyPriceCents) {
      await this.setUserHasNoSufficientFundsStatus(buyOffer.buyOfferId);
      return;
    }

    const matchingSellOffer = await this.prisma.sellOffer.findMany({
      where: {
        status: 0,
        unitSellPriceCents: {
          lte: buyOffer.unitBuyPriceCents,
        },
        UserStock: {
          companyId: buyOffer.companyId,
        },
      },
      orderBy: {
        unitSellPriceCents: 'asc',
      },
    });

    for (const sellOffer of matchingSellOffer) {
      if (quantity === 0) return;

      const userStock = await this.prisma.userStock.findFirst({
        where: {
          userId: buyOffer.userId,
          companyId: buyOffer.companyId,
        },
        select: {
          userStockId: true,
        },
      });
      const buyerStockId =
        userStock?.userStockId === undefined ? -1 : userStock.userStockId;

      let cost, sellOfferStatus, buyOfferStatus, stockQuantitySelled;

      if (sellOffer.quantity >= quantity) {
        cost = sellOffer.unitSellPriceCents * quantity;
        sellOfferStatus = quantity === sellOffer.quantity ? 4 : 0;
        buyOfferStatus = 4;
        stockQuantitySelled = quantity;
      } else {
        cost = sellOffer.unitSellPriceCents * sellOffer.quantity;
        sellOfferStatus = 4;
        buyOfferStatus = 0;
        stockQuantitySelled = sellOffer.quantity;
      }

      await this.prisma.$transaction([
        this.prisma.buyOffer.update({
          where: {
            buyOfferId: buyOffer.buyOfferId,
          },
          data: {
            status: buyOfferStatus,
            quantity: {
              decrement: stockQuantitySelled,
            },
            User: {
              update: {
                balanceCents: {
                  decrement: cost,
                },
              },
            },
          },
        }),

        this.prisma.sellOffer.update({
          where: {
            sellOfferId: sellOffer.sellOfferId,
          },
          data: {
            quantity: {
              decrement: stockQuantitySelled,
            },
            status: sellOfferStatus,
            UserStock: {
              update: {
                stockQuantity: {
                  decrement: stockQuantitySelled,
                },
                User: {
                  update: {
                    balanceCents: {
                      increment: cost,
                    },
                  },
                },
              },
            },
          },
        }),

        this.prisma.userStock.upsert({
          where: {
            userStockId: buyerStockId,
          },
          update: {
            stockQuantity: {
              increment: stockQuantitySelled,
            },
          },
          create: {
            userId: buyOffer.userId,
            stockQuantity: stockQuantitySelled,
            companyId: buyOffer.companyId,
          },
        }),

        this.prisma.transaction.create({
          data: {
            buyOfferId: buyOffer.buyOfferId,
            sellOfferId: sellOffer.sellOfferId,
            status: 5,
            sellerId: sellOffer.userId,
            buyerId: buyOffer.userId,
          },
        }),
      ]);

      quantity -= stockQuantitySelled;
    }
  }

  async setUserHasNoSufficientFundsStatus(buyOfferId: number) {
    await this.prisma.buyOffer.update({
      where: {
        buyOfferId: buyOfferId,
      },
      data: {
        status: 2,
      },
    });
  }
}
