import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

import { Exists } from '../../../decorators/exists.decorator';

export class CreateSellOfferDto {
  @Exists('userStock', 'userStockId')
  @IsPositive()
  @IsNotEmpty()
  userStockId!: number;

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
