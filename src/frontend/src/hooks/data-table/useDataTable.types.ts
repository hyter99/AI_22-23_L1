import { CompanyController } from '../../../../backend/modules/company/company.controller';

export type ISelectedDataType =
  | 'stockActions'
  | 'myStockActions'
  | 'mySellOffers'
  | 'myBuyOffers';

// data types to show
// export type IStockAction = Awaited<
//   ReturnType<typeof CompanyController['prototype']['get']>
// >[number];
export type IStockAction = {
  companyId: number;
  name: string;
  description: string;
  quantity: number;
  priceCents: number | null;
}

export interface IMyStockAction {
  userStockId: number;
  stockQuantity: number;
  priceCents: number | null;
  Company: {
    companyId: number;
    name: string;
    description: string;
  };
}

export interface IMyOfferAction {
  offerId: number;
  companyId: number;
  unitPriceCents: number;
  quantity: number;
  created: string;
  status: number;
  name: string;
}

// orderBy options
export type ISearchOrderBy = "quantity" | "priceCents" | "created" | "status" | "";

// statuses
export enum StockStatusEnum {
  ALL_OFFERS = -1,
  ACTIVE_OFFERS = 0,
  EXPIRED_OFFERS = 1,
  USER_HAS_NO_SUFFICIENT_FUNDS = 2,
  USER_HAS_NO_STOCK = 3,
  OFFER_REALIZED = 4,
  TRANSACTION_REALIZED = 5
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
