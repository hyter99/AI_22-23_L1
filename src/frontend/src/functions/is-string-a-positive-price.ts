// functions
import { IsStringAPrice } from "./is-string-a-price";

export const IsStringAPositivePrice = (strNum: string): boolean => {
  return IsStringAPrice(strNum) && Number(strNum) > 0;
};