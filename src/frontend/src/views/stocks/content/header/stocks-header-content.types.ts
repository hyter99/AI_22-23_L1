import { ISearchOrderBy } from "../../../../hooks/data-table/useDataTable.types";

export interface IStockTableHeader {
  id: number;
  title: string;
  orderByName: ISearchOrderBy;
  percentageWidth: number;
}