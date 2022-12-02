// interfaces
import { MyProfilePagesEnum } from "../my-profile-content.data";

interface IPagesToSelect {
  id: number;
  title: string;
  value: MyProfilePagesEnum
}

export const pagesToSelect: IPagesToSelect[] = [
  {
    id: 1,
    title: "Moje dane",
    value: MyProfilePagesEnum.DATA
  },
  {
    id: 2,
    title: "Moje akcje",
    value: MyProfilePagesEnum.STOCKS
  },
  {
    id: 3,
    title: "Moje oferty kupna",
    value: MyProfilePagesEnum.BUY_OFFERS
  },
  {
    id: 4,
    title: "Moje oferty sprzedaży",
    value: MyProfilePagesEnum.SELL_OFFERS
  }
];