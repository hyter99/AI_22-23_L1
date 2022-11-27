export type ISelectedDataType = "stockActions" | "myStockActions" | "mySellOffers" | "myBuyOffers";

interface IStockCompany {
  companyId: number;
  name: string;
  description: string;
}

// data types to show
export interface IStockAction {
  stockId: number;
  Company: IStockCompany;
  quantity: number;
  priceCents: number;
}

export interface IMyStockAction {
  userStockId: number;
  stockQuantity: number;
  Company: IStockCompany;
}

export interface IMyOfferAction {
  offerId: number;
  stockId: number;
  unitPriceCents: number;
  quantity: number;
  created: string;
  status: number;
}

// orderBy options
export type ISearchOrderBy = "quantity" | "priceCents" | "created" | "status" | "";

// statuses (TODO - change statuses)
export enum StockStatusEnum {
  ALL_OFFERS = -1,
  ACTIVE_OFFER = 0,
  EXPIRED_OFFER = 1
}

export interface IStocksInputFields {
  searchField: string;
  status: StockStatusEnum;
  orderBy: ISearchOrderBy;
  isOrderTypeAscending: boolean;
}

export interface IDataModals {
  isBuyModalOpen: boolean;
  isSellModalOpen: boolean;
  isDeclineModalOpen: boolean;
}