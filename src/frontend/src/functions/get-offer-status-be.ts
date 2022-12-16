// enums
import { StockStatusEnum } from "../hooks/data-table/useDataTable.types";

export const GetOfferStatusBE = (statusInt: StockStatusEnum): string  => {
  switch(statusInt) {
    case StockStatusEnum.ACTIVE_OFFERS:
      return "ACTIVE";
    case StockStatusEnum.EXPIRED_OFFERS:
      return "EXPIRED";
    case StockStatusEnum.USER_HAS_NO_SUFFICIENT_FUNDS:
      return "NO_SUFFICIENT_FUNDS";
    case StockStatusEnum.USER_HAS_NO_STOCK:
      return "NO_USER_STOCK";
    case StockStatusEnum.OFFER_REALIZED:
      return "OFFER_REALIZED";
    case StockStatusEnum.TRANSACTION_REALIZED:
      return "TRANSACTION_REALIZED";
    default: // f.i. ALL_OFFERS
      return "";
  }
};
  