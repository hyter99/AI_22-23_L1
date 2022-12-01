import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetCompaniesQuery } from './dto/get-companies.query';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly stockService: CompanyService) {}

  @Get()
  get(@Query() getStocksQuery: GetCompaniesQuery) {
    return this.stockService.getMany(getStocksQuery);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.stockService.getOne(parseInt(id));
  }
}
