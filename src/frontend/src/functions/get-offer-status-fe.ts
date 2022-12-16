// enum
import { StockStatusEnum } from "../hooks/data-table/useDataTable.types";

export const GetOfferStatusFE = (statusStr: string): StockStatusEnum => {
  switch(statusStr) {
    case "ACTIVE":
      return StockStatusEnum.ACTIVE_OFFERS;
    case "EXPIRED":
      return StockStatusEnum.EXPIRED_OFFERS;
    case "NO_SUFFICIENT_FUNDS":
      return StockStatusEnum.USER_HAS_NO_SUFFICIENT_FUNDS;
    case "NO_USER_STOCK":
      return StockStatusEnum.USER_HAS_NO_STOCK;
    case "OFFER_REALIZED":
      return StockStatusEnum.OFFER_REALIZED;
    case "TRANSACTION_REALIZED":
      return StockStatusEnum.TRANSACTION_REALIZED;
    default: // f.i. blank string ("")
      return StockStatusEnum.ALL_OFFERS;
  }
};
  