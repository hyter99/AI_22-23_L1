import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { GetCompaniesQuery } from './dto/get-companies.query';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: GetCompaniesQuery) {
    const take = query.take ? query.take : 10;

    let orderBy: string = "";
    if(query.orderBy === "quantity" || query.orderBy ===  "priceCents"){
      orderBy = query.orderBy;
      query.orderBy = undefined;
    }

    const results = await this.prisma.company.findMany({
      skip: query.skip,
      take: take,
      orderBy: {
        [query.orderBy ?? 'companyId']: query.orderType ?? 'desc',
      },
      where: { name: { contains: query.companyName, mode: 'insensitive' } },
      select: {
        companyId: true,
        name: true,
        description: true,
        UserStock: {
          select: {
            _count: true,
            SellOffer: {
              select: {
                quantity: true,
                unitSellPriceCents: true,
              },
              where: {
                status: 0,
              },
            },
          },
        },
      },
    });

    const companies = results.map((result) => {
      return {
        ...result,
        quantity: result.UserStock.reduce(
          (all, cur) =>
            all + cur.SellOffer.reduce((all2, cur2) => all2 + cur2.quantity, 0),
          0,
        ),
        priceCents:
          result.UserStock.length > 0
            ? Math.min(
              ...result.UserStock.flatMap((us) => 
                us.SellOffer.map((so) => so.unitSellPriceCents),
              ),
            )
          : 0 // I changed null to 0. I don't know if null was essential. Everything seems to work fine.
        // priceCents:
        //   result.UserStock.flatMap((us) =>
        //     us.SellOffer.map((so) => so.unitSellPriceCents),
        //   ).reduce((all, cur) => (all < cur ? all : cur)) ?? null,
      };
    });

    if (orderBy != "") {
      companies.sort((a,b) => {
        const sortOrder = query.orderType === 'asc' ? 1: -1;
        let result;
        if(orderBy === "priceCents"){
          result = (a.priceCents < b.priceCents) ? -1 : (a.priceCents > b.priceCents) ? 1 : 0;
        } else {
          result = (a.quantity < b.quantity) ? -1 : (a.quantity > b.quantity) ? 1 : 0;
        }
        
        return result * sortOrder;
      })
    }

    return companies;
  }

  async getOne(companyId: number) {
    const result = await this.prisma.company
      .findFirstOrThrow({
        where: {
          companyId,
        },
        select: {
          companyId: true,
          name: true,
          description: true,
          UserStock: {
            select: {
              _count: true,
              SellOffer: {
                select: {
                  quantity: true,
                  unitSellPriceCents: true,
                },
                where: {
                  status: 0,
                },
              },
            },
          },
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

    return {
      ...result,
      quantity: result.UserStock.reduce(
        (all, cur) =>
          all + cur.SellOffer.reduce((all2, cur2) => all2 + cur2.quantity, 0),
        0,
      ),
      minPrice:
        result.UserStock.flatMap((us) =>
          us.SellOffer.map((so) => so.unitSellPriceCents),
        ).reduce((all, cur) => (all < cur ? all : cur)) ?? null,
    };
  }
}
