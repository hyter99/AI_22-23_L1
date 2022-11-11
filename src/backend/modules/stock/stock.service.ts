import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { GetStocksQuery } from './dto/get-stocks.query';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  getMany(query: GetStocksQuery) {
    const take = query.take ? query.take : 10;

    return this.prisma.stock.findMany({
      skip: query.skip,
      take: take,
      orderBy: {
        [query.orderBy ?? 'stockId']: query.orderType ?? 'desc',
      },
      where: {
        Company: {
          name: query.companyName,
        },
      },
      select: {
        stockId: true,
        Company: {
          select: {
            companyId: true,
            name: true,
            description: true,
          },
        },
        quantity: true,
        priceCents: true,
      },
    });
  }

  getOne(stockId: number) {
    return this.prisma.stock.findFirst({
      where: {
        stockId: stockId,
      },
      select: {
        stockId: true,
        Company: {
          select: {
            companyId: true,
            name: true,
            description: true,
            StockPriceHistory: {
              select: {
                companyStockPriceHistoryId: true,
                changeDate: true,
                priceCents: true,
              },
            },
          },
        },
        quantity: true,
        priceCents: true,
      },
    });
  }
}
