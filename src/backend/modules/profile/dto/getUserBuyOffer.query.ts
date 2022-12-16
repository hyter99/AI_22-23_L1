import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { OrderByForUserBuyOffer } from "../enum/orderByForUserBuyOffer.enum";
import { Pagination } from "../../../queries/pagination.query";
import { OfferStatus } from "@prisma/client";

export class GetUserBuyOfferQuery extends Pagination {
  @IsEnum(OrderByForUserBuyOffer)
  @IsOptional()
  readonly orderBy: OrderByForUserBuyOffer = OrderByForUserBuyOffer.buyOfferId;

  @IsString()
  @IsOptional()
  readonly companyName?: string;


  @IsString()
  @IsOptional()
  readonly status?: OfferStatus;
}