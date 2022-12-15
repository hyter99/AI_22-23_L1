import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Exists } from '../../../decorators/exists.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { BuyOffer, OfferStatus } from '@prisma/client';

export class CreateBuyOfferDto {
  @Exists('company', 'companyId')
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Company ID'})
  companyId!: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Buying price'})
  unitBuyPriceCents!: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Quantity'})
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, description: 'Status'})
  status!: OfferStatus;
}
