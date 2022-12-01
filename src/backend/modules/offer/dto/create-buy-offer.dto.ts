import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Exists } from '../../../decorators/exists.decorator';

export class CreateBuyOfferDto {
  @Exists('company', 'companyId')
  @IsPositive()
  @IsNotEmpty()
  companyId!: number;

  @IsPositive()
  @IsNotEmpty()
  unitBuyPriceCents!: number;

  @IsPositive()
  @IsNotEmpty()
  quantity!: number;

  @IsNumber()
  @IsNotEmpty()
  status!: number;
}
