// interfaces
import {IStocksInputFields, IDataModals} from "./useDataTable.types";

export const initialStocksInputFields: IStocksInputFields = {
  searchField: "",
  orderBy: "",
  isOrderTypeAscending: true
}

export const initialDataModals: IDataModals = {
  isBuyModalOpen: false,
  isSellModalOpen: false,
  isDeclineModalOpen: false
};