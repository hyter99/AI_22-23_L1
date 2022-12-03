// TODO - write data types
export interface IBuySellStockData {
  id: number;
  name: string;
  priceFromInCents?: number;
  availableQuantity?: number;
}

export interface IInputFields {
  quantity: string;
  price: string;
}

export interface IInputFieldsErrors {
  quantity: string;
  price: string;
}