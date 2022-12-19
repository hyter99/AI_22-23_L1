import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

import { Exists } from '../../../decorators/exists.decorator';
import { ApiProperty } from '@nestjs/swagger'
import { OfferStatus } from '@prisma/client';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Status'})
  status!: OfferStatus;
}
