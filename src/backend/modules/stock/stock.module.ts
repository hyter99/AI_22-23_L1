import { Module } from '@nestjs/common';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
