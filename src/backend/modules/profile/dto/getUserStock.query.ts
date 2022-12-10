import { IsEnum, IsOptional, IsString } from "class-validator";
import { OrderByForUserStock } from "../enum/orderByForUserStock.enum";
import { Pagination } from "../../../queries/pagination.query";

export class GetUserStockQuery extends Pagination {
  @IsEnum(OrderByForUserStock)
  @IsOptional()
  orderBy: OrderByForUserStock = OrderByForUserStock.userStockId;
  
  @IsString()
  @IsOptional()
  companyName?: string;
}