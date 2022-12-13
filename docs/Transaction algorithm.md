# Transaction algorithm chart

![Transaction algorithm](https://user-images.githubusercontent.com/65306120/197349715-4f53d61c-10c9-46ec-bc83-e718246d6d09.png)

## Old implementation
```TS
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
```