import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

import { Exists } from '../../../decorators/exists.decorator';

export class CreateSellOfferDto {
  @Exists('stock', 'stockId')
  @IsPositive()
  @IsNotEmpty()
  stockId!: number;

  @IsPositive()
  @IsNotEmpty()
  unitSellPriceCents!: number;

  @IsPositive()
  @IsNotEmpty()
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  status!: number;
}
