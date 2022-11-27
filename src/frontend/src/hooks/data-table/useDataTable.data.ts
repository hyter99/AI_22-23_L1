// interfaces
import { IDataModals, IStocksInputFields, StockStatusEnum } from "./useDataTable.types";

export const initialStocksInputFields: IStocksInputFields = {
  searchField: "",
  orderBy: "",
  status: StockStatusEnum.ALL_OFFERS,
  isOrderTypeAscending: true
}

export const initialDataModals: IDataModals = {
  isBuyModalOpen: false,
  isSellModalOpen: false,
  isDeclineModalOpen: false
};