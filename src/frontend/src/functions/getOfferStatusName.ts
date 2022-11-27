// enum
import { StockStatusEnum } from "../hooks/data-table/useDataTable.types";

// data
import { myProfileBuySellOfferStateSelect as availableStatuses} from "../views/my-profile/content/pages/buy-sell-offers/my-profile-buy-sell-offers.data";

export const GetOfferStatusName = (statusCode: StockStatusEnum): string => {
  const foundItem = availableStatuses.find(item => item.value === statusCode);
  
  if (foundItem) {
    return foundItem.title;
  }
  
  return "-";
};