import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }

  @Cron(new Date(Date.now() + 5000))
  // @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    // 0 - Active offer
    // 1 - Expired offer
    // 2 - User has no suffecient funds
    // 3 - User has no stock
    // 4 - Offer realized
    // 5 - Transaction realized

    // this.checkOfferValidity()
    this.transactionCycle()
  }

  async checkOfferValidity() {
    await this.prisma.buyOffer.updateMany({
      where: {
        status: 0,
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000)
        }
      },
      data: {
        status: 1
      }
    })

    await this.prisma.sellOffer.updateMany({
      where: {
        status: 0,
        created: {
          lte: new Date(Date.now() - 60 * 60 * 1000)
        }
      },
      data: {
        status: 1
      }
    })
  }

  async transactionCycle() {
    const activeBuyOffers = await this.prisma.buyOffer.findMany({
      where: {
        status: 0
      },
      include: {
        User: {
          select: {
            balanceCents: true
          }
        }
      }
    })

    for (const buyOffer of activeBuyOffers) {
      await this.findMatchingSellOffers(buyOffer)
    }
  }

  async findMatchingSellOffers(buyOffer: any) {
    const { balanceCents } = buyOffer.User;
    let { quantity } = buyOffer;

    if (balanceCents < quantity * buyOffer.unitBuyPriceCents) {
      await this.throwUserHasNoSufficientFundsError(buyOffer.buyOfferId)
      return
    }

    const matchingSellOffer = await this.prisma.sellOffer.findMany({
      where: {
        status: 0,
        unitSellPriceCents: {
          lte: buyOffer.unitBuyPriceCents
        },
        UserStock: {
          companyId: buyOffer.companyId
        }
      },
      orderBy: {
        unitSellPriceCents: 'asc'
      }
    })

    for (const sellOffer of matchingSellOffer) {
      if (quantity === 0) return
      //const requiredBalancea = sellOffer.quantity >= buyOffer.quantity ? sellOffer.unitSellPriceCents * buyOffer.quantity : sellOffer.unitSellPriceCents * sellOffer.quantity

      const userStock = await this.prisma.userStock.findFirst({
        where: {
          userId: buyOffer.userId,
          companyId: buyOffer.companyId
        },
        select: {
          userStockId: true
        }
      })
      const buyerStockId = userStock?.userStockId === undefined ? -1 : userStock.userStockId;

      if (sellOffer.quantity >= quantity) { //Triggers when number of purchased stock is lesser then or equal number of sold stock
        const cost = sellOffer.unitSellPriceCents * quantity

        const sellOfferStatus = quantity === sellOffer.quantity ? 4 : 0;

        //Database transaction
        await this.prisma.$transaction([
          this.prisma.buyOffer.update({
            where: {
              buyOfferId: buyOffer.buyOfferId
            },
            data: {
              status: 4,
              quantity: {
                decrement: quantity
              },
              User: {
                update: {
                  balanceCents: {
                    decrement: cost
                  }
                },
              }
            }
          }),

          this.prisma.sellOffer.update({
            where: {
              sellOfferId: sellOffer.sellOfferId
            },
            data: {
              quantity: {
                decrement: quantity
              },
              status: sellOfferStatus,
              UserStock: {
                update: {
                  stockQuantity: {
                    decrement: quantity
                  },
                  User: {
                    update: {
                      balanceCents: {
                        increment: cost
                      }
                    }
                  }
                }
              }
            }
          }),

          this.prisma.userStock.upsert({
            where: {
              userStockId: buyerStockId
            },
            update: {
              stockQuantity: {
                increment: quantity
              },
            },
            create: {
              userId: buyOffer.userId,
              stockQuantity: quantity,
              companyId: buyOffer.companyId
            }
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
        ])

        quantity = 0
      } else { //Triggers when number of purchased stock is greater then number of sold stock
        const cost = sellOffer.unitSellPriceCents * sellOffer.quantity

        //Database transaction
        await this.prisma.$transaction([
          this.prisma.buyOffer.update({
            where: {
              buyOfferId: buyOffer.buyOfferId
            },
            data: {
              status: 0,
              quantity: {
                decrement: sellOffer.quantity
              },
              User: {
                update: {
                  balanceCents: {
                    decrement: cost
                  }
                },
              }
            }
          }),

          this.prisma.sellOffer.update({
            where: {
              sellOfferId: sellOffer.sellOfferId
            },
            data: {
              quantity: {
                decrement: sellOffer.quantity
              },
              status: 4,
              UserStock: {
                update: {
                  stockQuantity: {
                    decrement: sellOffer.quantity
                  },
                  User: {
                    update: {
                      balanceCents: {
                        increment: cost
                      }
                    }
                  }
                }
              }
            }
          }),

          this.prisma.userStock.upsert({
            where: {
              userStockId: buyerStockId
            },
            update: {
              stockQuantity: {
                increment: sellOffer.quantity
              },
            },
            create: {
              userId: buyOffer.userId,
              stockQuantity: sellOffer.quantity,
              companyId: buyOffer.companyId
            }
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
        ])

        quantity -= sellOffer.quantity;
      }
    }
  }

  async throwUserHasNoSufficientFundsError(buyOfferId: number) {
    await this.prisma.buyOffer.update({
      where: {
        buyOfferId: buyOfferId
      },
      data: {
        status: 2
      }
    })
  }
}