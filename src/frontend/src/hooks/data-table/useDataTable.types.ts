export type ISelectedDataType = "stockActions" | "myStockActions" | "mySellOffers" | "myBuyOffers";

// data types to show
export interface IStockAction {
  stockId: number;
  Company: {
    companyId: number;
    name: string;
    description: string;
  };
  quantity: number;
  priceCents: number;
}

// export interface IMyStockActions {...}
// export interface IMyOffers {...}

export type ISearchOrderBy = "quantity" | "priceCents" | "";

export interface IStocksInputFields {
  searchField: string;
  orderBy: ISearchOrderBy;
  isOrderTypeAscending: boolean;
}

export interface IDataModals {
  isBuyModalOpen: boolean;
  isSellModalOpen: boolean;
  isDeclineModalOpen: boolean;
}