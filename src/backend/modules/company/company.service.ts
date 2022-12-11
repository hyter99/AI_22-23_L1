import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { GetCompaniesQuery } from './dto/get-companies.query';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(query: GetCompaniesQuery) {
    const take = query.take ? query.take : 10;

    const results = await this.prisma.company.findMany({
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
          : null
      };
    });
    
    companies.sort((a,b) => {
      const sortOrder = query.orderType === 'asc' ? 1: -1
      let result = 0;
      switch(query.orderBy){
        case "description": {
          if(a.description !== null && b.description !== null)
          result = (a.description < b.description) ? -1 : (a.description > b.description) ? 1 : 0;
          break;
        }
        case "companyId": {
          if(a.companyId !== null && b.companyId !== null)
          result = (a.companyId < b.companyId) ? -1 : (a.companyId > b.companyId) ? 1 : 0;
          break;
        }
        case "name": {
          if(a.name !== null && b.name !== null)
          result = (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
          break;
        }
        case "quantity": {
          if(a.quantity !== null && b.quantity !== null)
          result = (a.quantity < b.quantity) ? -1 : (a.quantity > b.quantity) ? 1 : 0;
          break;
        }
        case "priceCents": {
          if(a.priceCents !== null && b.priceCents !== null)
          result = (a.priceCents < b.priceCents) ? -1 : (a.priceCents > b.priceCents) ? 1 : 0;
          break;
        }
      }
      return result * sortOrder;
    })

    let finalResult = [];

    for (let i = query.skip; i<query.skip + take; i++) {
      if(companies[i])
      finalResult.push(companies[i]);
    }

    return finalResult;
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
