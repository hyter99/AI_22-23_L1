import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { OrderByForUserSellOffer } from "../enum/orderByForUserSellOffer.enum";
import { Pagination } from "../../../queries/pagination.query";
import { OfferStatus } from "@prisma/client";

export class GetUserSellOfferQuery extends Pagination {
  @IsEnum(OrderByForUserSellOffer)
  @IsOptional()
  readonly orderBy: OrderByForUserSellOffer = OrderByForUserSellOffer.sellOfferId;

  @IsString()
  @IsOptional()
  readonly companyName?: string;


  @IsString()
  @IsOptional()
  readonly status?: OfferStatus;
}