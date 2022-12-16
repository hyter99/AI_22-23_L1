import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

import { Exists } from '../../../decorators/exists.decorator';
import { ApiProperty } from '@nestjs/swagger'
import { BuyOffer, OfferStatus } from '@prisma/client';

export class CreateSellOfferDto {
  @Exists('userStock', 'userStockId')
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'UserStock ID'})
  userStockId!: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Selling price'})
  unitSellPriceCents!: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Quantity'})
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Status'})
  status!: OfferStatus;
}
