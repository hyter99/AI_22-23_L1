import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { OrderByForUserSellOffer } from "../enum/orderByForUserSellOffer.enum";
import { Pagination } from "../../../queries/pagination.query";

export class GetUserSellOfferQuery extends Pagination {
  @IsEnum(OrderByForUserSellOffer)
  @IsOptional()
  readonly orderBy: OrderByForUserSellOffer = OrderByForUserSellOffer.sellOfferId;

  // @IsString()
  // @IsOptional()
  // readonly companyName?: string;
  // No relation between SellOffer and Stock, thus cannot find CompanyName in a decent way.

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly status?: number;
}