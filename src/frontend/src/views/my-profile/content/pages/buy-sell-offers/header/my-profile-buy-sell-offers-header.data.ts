import { IStockTableHeader } from "../../../../../stocks/content/header/stocks-header-content.types";

export const myProfileBuySellOffersTableHeaders: IStockTableHeader[] = [
  {
    id: 1,
    title: "Lp.",
    orderByName: "",
    percentageWidth: 4
  },
  {
    id: 2,
    title: "Nazwa akcji",
    orderByName: "",
    percentageWidth: 20
  },
  {
    id: 3,
    title: "Liczba",
    orderByName: "quantity",
    percentageWidth: 13
  },
  {
    id: 4,
    title: "Cena",
    orderByName: "priceCents",
    percentageWidth: 15
  },
  {
    id: 5,
    title: "Data złożenia",
    orderByName: "created",
    percentageWidth: 22
  },
  {
    id: 6,
    title: "Status",
    orderByName: "",
    percentageWidth: 13
  },
  {
    id: 7,
    title: "",
    orderByName: "",
    percentageWidth: 13
  }
];