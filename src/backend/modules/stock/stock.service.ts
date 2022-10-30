import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { GetStocksQuery } from './dto/get-stocks.query';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  getMany(query: GetStocksQuery) {
    return this.prisma.stock.findMany({
      skip: query.page ? parseInt(query.page) * 10 : undefined,
      take: 10,
      orderBy: {
        [query.orderBy ?? 'stockId']: query.orderType ?? 'desc',
      },
      where: {
        StockToCompany: {
          name: query.companyName,
        },
      },
      select: {
        stockId: true,
        StockToCompany: {
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
        StockToCompany: {
          select: {
            companyId: true,
            name: true,
            description: true,
          },
        },
        quantity: true,
        priceCents: true,
        StockToStockPriceHistory: {
          select: {
            changeDate: true,
            priceCents: true,
          },
        },
      },
    });
  }
}
