import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetStocksQuery } from './dto/get-stocks.query';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  get(@Query() getStocksQuery: GetStocksQuery) {
    return this.stockService.getMany(getStocksQuery);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.stockService.getOne(parseInt(id));
  }
}
