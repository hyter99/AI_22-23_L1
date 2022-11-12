import { IStockTableHeader } from "./stocks.types";

export const stockTableHeaders: IStockTableHeader[] = [
  {
    id: 1,
    title: "Lp.",
    orderByName: "",
    percentageWidth: 6
  },
  {
    id: 2,
    title: "Nazwa akcji",
    orderByName: "",
    percentageWidth: 28
  },
  {
    id: 3,
    title: "Liczba w obiegu",
    orderByName: "quantity",
    percentageWidth: 24
  },
  {
    id: 4,
    title: "Min. cena",
    orderByName: "priceCents",
    percentageWidth: 20
  },
  {
    id: 5,
    title: "",
    orderByName: "",
    percentageWidth: 22
  }
];