import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetStocksQuery {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  orderBy?: 'stockid' | 'companyId' | 'priceCents' | 'quantity';

  @IsString()
  @IsOptional()
  orderType?: 'asc' | 'desc';
}
