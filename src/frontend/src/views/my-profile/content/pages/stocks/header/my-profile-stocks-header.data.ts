import { IStockTableHeader } from "../../../../../stocks/content/header/stocks-header-content.types";

export const myProfileStocksTableHeaders: IStockTableHeader[] = [
  {
    id: 1,
    title: "Lp.",
    orderByName: "",
    percentageWidth: 11
  },
  {
    id: 2,
    title: "Nazwa akcji",
    orderByName: "",
    percentageWidth: 33
  },
  {
    id: 3,
    title: "Posiadana liczba",
    orderByName: "quantity",
    percentageWidth: 29
  },
  {
    id: 4,
    title: "",
    orderByName: "",
    percentageWidth: 27
  }
];