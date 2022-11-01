import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { OrderByForUserBuyOffer } from "../enum/orderByForUserBuyOffer.enum";
import { Pagination } from "./pagination.query";

export class GetUserBuyOfferQuery extends Pagination {
  @IsEnum(OrderByForUserBuyOffer)
  @IsOptional()
  readonly orderBy: OrderByForUserBuyOffer = OrderByForUserBuyOffer.buyOfferId;

  @IsString()
  @IsOptional()
  readonly companyName?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly status?: number;
}