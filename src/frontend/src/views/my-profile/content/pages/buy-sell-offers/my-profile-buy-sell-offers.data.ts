// interfaces
import { IMyProfileBuySellOfferStateSelect } from "./my-profile-buy-sell-offers.type";

// enum
import { StockStatusEnum } from "../../../../../hooks/data-table/useDataTable.types";

export const myProfileBuySellOfferStateSelect: IMyProfileBuySellOfferStateSelect[] = [
  {
    title: "Dowolny",
    value: StockStatusEnum.ALL_OFFERS
  },
  {
    title: "Aktywny",
    value: StockStatusEnum.ACTIVE_OFFER
  },
  {
    title: "Wygasły",
    value: StockStatusEnum.EXPIRED_OFFER
  }
];