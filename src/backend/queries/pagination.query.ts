import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Order } from '../enums/orderType.enum';

export class Pagination {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly take: number = 10;

  @IsEnum(Order)
  @IsOptional()
  readonly orderType: Order = Order.ASC;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
