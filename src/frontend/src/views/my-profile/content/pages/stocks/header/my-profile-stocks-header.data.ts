import { IStockTableHeader } from "../../../../../stocks/content/header/stocks-header-content.types";

export const myProfileStocksTableHeaders: IStockTableHeader[] = [
  {
    id: 1,
    title: "Lp.",
    orderByName: "",
    percentageWidth: 5
  },
  {
    id: 2,
    title: "Nazwa akcji",
    orderByName: "",
    percentageWidth: 31
  },
  {
    id: 3,
    title: "Posiadana liczba",
    orderByName: "quantity",
    percentageWidth: 25
  },
  {
    id: 4,
    title: "Min. cena",
    orderByName: "priceCents",
    percentageWidth: 17
  },
  {
    id: 5,
    title: "",
    orderByName: "",
    percentageWidth: 22
  }
];