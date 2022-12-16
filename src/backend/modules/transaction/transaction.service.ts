import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { Prisma, SellOffer } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

type TransactionBuyOffer = Awaited<
  ReturnType<typeof TransactionService['prototype']['getActiveBuyOffers']>
>[number];

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    // 0 - Active offer
    // 1 - Expired offer
    // 2 - User has no sufficient funds
    // 3 - User has no stock
    // 4 - Offer realized
    // 5 - Transaction realized

    await this.checkOfferValidity();
    await this.transactionCycle();
  }

  async getActiveBuyOffers() {
    return this.prisma.buyOffer.findMany({
      where: {
        status: "ACTIVE",
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
        status: "ACTIVE",
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
      data: {
        status: "EXPIRED",
      },
    });

    await this.prisma.sellOffer.updateMany({
      where: {
        status: "ACTIVE",
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
      data: {
        status: "EXPIRED",
      },
    });
  }

  async transactionCycle() {
    const activeBuyOffers = await this.getActiveBuyOffers();

    return Promise.all(
      activeBuyOffers.map((buyOffer) => {
        if (
          buyOffer.User.balanceCents <
          buyOffer.quantity * buyOffer.unitBuyPriceCents
        ) {
          return this.setUserHasNoSufficientFundsStatus(buyOffer.buyOfferId);
        } else {
          return this.findMatchingSellOffers(buyOffer);
        }
      }),
    );
  }

  async findMatchingSellOffers(buyOffer: TransactionBuyOffer) {
    const { unitBuyPriceCents } = buyOffer;

    const matchingSellOffers = await this.prisma.sellOffer.findMany({
      where: {
        status: "ACTIVE",
        unitSellPriceCents: {
          lte: unitBuyPriceCents,
        },
        UserStock: {
          companyId: buyOffer.companyId,
        },
      },
      orderBy: {
        unitSellPriceCents: 'asc',
      },
    });

    if (matchingSellOffers.length === 0) {
      return;
    }

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

    const {
      boughtOffersCount,
      leftToBuyQuantity,
      finalCost,
      sellOffersBoughtFully,
      sellOfferBoughtPartially,
      sellOfferBoughtPartiallyTake,
    } = this.calculateSellOffersParams(matchingSellOffers, buyOffer.quantity);

    await this.prisma.$transaction(async (transactionClient) => {
      await this.transactionUpdateSellOffersBoughtFully(
        transactionClient,
        sellOffersBoughtFully,
        buyOffer,
      );

      await this.transactionUpdateSellOfferBoughtPartially(
        transactionClient,
        sellOfferBoughtPartially,
        sellOfferBoughtPartiallyTake,
        buyOffer,
      );

      await this.transactionUpdateBuyOffer(
        transactionClient,
        buyOffer,
        leftToBuyQuantity,
        finalCost,
      );

      await this.transactionUpdateUserStock(
        transactionClient,
        buyerStockId,
        boughtOffersCount,
        buyOffer,
      );

      await this.transactionCreateCompanyHistoryStockEntry(
        transactionClient,
        buyOffer,
      );
    });
  }

  async setUserHasNoSufficientFundsStatus(buyOfferId: number) {
    await this.prisma.buyOffer.update({
      where: {
        buyOfferId: buyOfferId,
      },
      data: {
        status: "NO_SUFFICIENT_FUNDS",
      },
    });
  }

  calculateSellOffersParams(
    matchingSellOffers: SellOffer[],
    buyOfferQuantity: number,
  ) {
    const sellOfferParams = matchingSellOffers.reduce(
      (all, cur) => {
        if (all.leftToBuyQuantity === 0) {
          return all;
        } else if (cur.quantity <= all.leftToBuyQuantity) {
          return {
            leftToBuyQuantity: all.leftToBuyQuantity - cur.quantity,
            sellOffersBoughtFully: all.sellOffersBoughtFully.concat([cur]),
            sellOfferBoughtPartially: null,
            sellOfferBoughtPartiallyTake: 0,
          };
        } else {
          return {
            leftToBuyQuantity: 0,
            sellOfferBoughtPartiallyTake: all.leftToBuyQuantity,
            sellOffersBoughtFully: all.sellOffersBoughtFully,
            sellOfferBoughtPartially: cur,
          };
        }
      },
      {
        leftToBuyQuantity: buyOfferQuantity,
        sellOffersBoughtFully: new Array<SellOffer>(),
        sellOfferBoughtPartially: null as null | SellOffer,
        sellOfferBoughtPartiallyTake: 0,
      },
    );

    const finalCost =
      (sellOfferParams.sellOfferBoughtPartially?.unitSellPriceCents ?? 0) *
        sellOfferParams.sellOfferBoughtPartiallyTake +
      sellOfferParams.sellOffersBoughtFully
        .map((sof) => sof.unitSellPriceCents * sof.quantity)
        .reduce((all, cur) => all + cur, 0);

    const boughtOffersCount =
      sellOfferParams.sellOffersBoughtFully.reduce(
        (all, cur) => all + cur.quantity,
        0,
      ) + sellOfferParams.sellOfferBoughtPartiallyTake;

    return {
      ...sellOfferParams,
      finalCost,
      boughtOffersCount,
    };
  }

  transactionUpdateSellOffersBoughtFully(
    db: Prisma.TransactionClient,
    sellOffers: SellOffer[],
    buyOffer: TransactionBuyOffer,
  ) {
    return Promise.all(
      sellOffers.map(async (sellOfferFull) => {
        await db.sellOffer.update({
          where: {
            sellOfferId: sellOfferFull.sellOfferId,
          },
          data: {
            quantity: {
              set: 0,
            },
            status: "OFFER_REALIZED",
            Transaction: {
              create: {
                buyOfferId: buyOffer.buyOfferId,
                status: "TRANSACTION_REALIZED",
                sellerId: sellOfferFull.userId,
                buyerId: buyOffer.userId,
              },
            },
            UserStock: {
              update: {
                stockQuantity: {
                  decrement: sellOfferFull.quantity,
                },
                User: {
                  update: {
                    balanceCents: {
                      increment:
                        sellOfferFull.unitSellPriceCents *
                        sellOfferFull.quantity,
                    },
                  },
                },
              },
            },
          },
        });
      }),
    );
  }

  transactionUpdateSellOfferBoughtPartially(
    db: Prisma.TransactionClient,
    sellOffer: SellOffer | null,
    sellOfferTake: number,
    buyOffer: TransactionBuyOffer,
  ) {
    if (sellOffer) {
      return db.sellOffer.update({
        where: {
          sellOfferId: sellOffer.sellOfferId,
        },
        data: {
          quantity: {
            decrement: sellOfferTake,
          },
          status: "ACTIVE",
          Transaction: {
            create: {
              buyOfferId: buyOffer.buyOfferId,
              status: "TRANSACTION_REALIZED",
              sellerId: sellOffer.userId,
              buyerId: buyOffer.userId,
            },
          },
          UserStock: {
            update: {
              stockQuantity: {
                decrement: sellOfferTake,
              },
              User: {
                update: {
                  balanceCents: {
                    increment: sellOffer.unitSellPriceCents * sellOfferTake,
                  },
                },
              },
            },
          },
        },
      });
    }

    return Promise.resolve();
  }

  transactionUpdateBuyOffer(
    db: Prisma.TransactionClient,
    buyOffer: TransactionBuyOffer,
    buyOfferQuantityLeft: number,
    finalCost: number,
  ) {
    return db.buyOffer.update({
      where: {
        buyOfferId: buyOffer.buyOfferId,
      },
      data: {
        status: buyOfferQuantityLeft > 0 ? "ACTIVE" : "OFFER_REALIZED",
        quantity: {
          set: buyOfferQuantityLeft,
        },
        User: {
          update: {
            balanceCents: {
              decrement: finalCost,
            },
          },
        },
      },
    });
  }

  transactionUpdateUserStock(
    db: Prisma.TransactionClient,
    buyerStockId: number,
    boughtOffersCount: number,
    buyOffer: TransactionBuyOffer,
  ) {
    return db.userStock.upsert({
      where: {
        userStockId: buyerStockId,
      },
      update: {
        stockQuantity: {
          increment: boughtOffersCount,
        },
      },
      create: {
        userId: buyOffer.userId,
        stockQuantity: boughtOffersCount,
        companyId: buyOffer.companyId,
      },
    });
  }

  async transactionCreateCompanyHistoryStockEntry(
    db: Prisma.TransactionClient,
    buyOffer: TransactionBuyOffer,
  ) {
    const cheapestOffer = await db.sellOffer.findFirst({
      where: {
        UserStock: {
          Company: {
            companyId: buyOffer.companyId,
          },
        },
        status: "ACTIVE",
      },
      take: 1,
      orderBy: {
        unitSellPriceCents: 'asc',
      },
    });

    if (cheapestOffer) {
      await db.companyStockPriceHistory.create({
        data: {
          priceCents: cheapestOffer.unitSellPriceCents,
          companyId: buyOffer.companyId,
        },
      });
    }
  }
}
