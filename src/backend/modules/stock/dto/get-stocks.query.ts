import { IsIn, IsOptional, IsString } from 'class-validator';
import { Pagination } from '../../../queries/pagination.query';

export class GetStocksQuery extends Pagination {
  @IsIn(['companyId', 'name', 'description'])
  @IsString()
  @IsOptional()
  orderBy?: 'companyId' | 'name' | 'description';
}
