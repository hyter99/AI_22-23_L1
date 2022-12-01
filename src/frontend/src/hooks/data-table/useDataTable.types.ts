import { CompanyController } from '../../../../backend/modules/company/company.controller';

export type ISelectedDataType =
  | 'stockActions'
  | 'myStockActions'
  | 'mySellOffers'
  | 'myBuyOffers';

// data types to show

export type IStockAction = Awaited<
  ReturnType<typeof CompanyController['prototype']['get']>
>[number];

export interface IMyStockAction {
  userStockId: number;
  stockQuantity: number;
  Company: IStockAction;
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
