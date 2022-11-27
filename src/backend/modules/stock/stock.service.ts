import { Injectable, NotFoundException } from '@nestjs/common';
import { combineLatest } from 'rxjs';

import { PrismaService } from '../database/prisma.service';
import { GetStocksQuery } from './dto/get-stocks.query';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) { }

  getMany(query: GetStocksQuery) {
    const take = query.take ? query.take : 10;

    return this.prisma.company.findMany({
      skip: query.skip,
      take: take,
      orderBy: {
        [query.orderBy ?? 'stockId']: query.orderType ?? 'desc',
      },
      select: {
        companyId: true,
        name: true,
        description: true,
      },
    });
  }

  getOne(companyId: number) {
    return this.prisma.company
      .findFirstOrThrow({
        where: {
          companyId
        },
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
            orderBy: {
              changeDate: 'asc',
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(`Stcok with id ${companyId} not found`);
      });
  }
}
