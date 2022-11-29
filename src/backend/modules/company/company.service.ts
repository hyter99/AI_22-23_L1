import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { GetCompaniesQuery } from './dto/get-companies.query';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) { }

  getMany(query: GetCompaniesQuery) {
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
        throw new NotFoundException(`Company with id ${companyId} not found`);
      });
  }
}
