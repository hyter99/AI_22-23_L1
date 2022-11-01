import { IsEnum, IsOptional, IsString } from "class-validator";
import { OrderByForUserStock } from "../enum/orderByForUserStock.enum";
import { Pagination } from "./pagination.query";

export class GetUserStockQuery extends Pagination {
  @IsEnum(OrderByForUserStock)
  @IsOptional()
  readonly orderBy: OrderByForUserStock = OrderByForUserStock.userStockId;
  
  @IsString()
  @IsOptional()
  readonly companyName?: string;
}