import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Exists } from '../../../decorators/exists.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus } from '@prisma/client';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'Status'})
  status!: OfferStatus;
}
