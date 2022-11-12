import { IsIn, IsOptional, IsString } from 'class-validator';
import { Pagination } from '../../../queries/pagination.query';

export class GetStocksQuery extends Pagination {
  @IsString()
  @IsOptional()
  companyName?: string;

  @IsIn(['stockid', 'companyId', 'priceCents', 'quantity'])
  @IsString()
  @IsOptional()
  orderBy?: 'stockid' | 'companyId' | 'priceCents' | 'quantity';
}
