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

// export interface IMyStockActions {...}
// export interface IMyOffers {...}

export type ISearchOrderBy = 'quantity' | 'priceCents' | '';

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
