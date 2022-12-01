// enums
import { MyProfilePagesEnum } from "../views/my-profile/content/my-profile-content.data";
import { MyProfileAvailableUrlEnum } from "../views/my-profile/my-profile.data";

export const TranslateEngPlMyProfilePageName = (currentPageName: MyProfilePagesEnum): MyProfileAvailableUrlEnum => {
  switch (currentPageName) {
    case MyProfilePagesEnum.DATA:
      return MyProfileAvailableUrlEnum.DATA;
    case MyProfilePagesEnum.STOCKS:
      return MyProfileAvailableUrlEnum.STOCKS;
    case MyProfilePagesEnum.BUY_OFFERS:
      return MyProfileAvailableUrlEnum.BUY_OFFERS;
    case MyProfilePagesEnum.SELL_OFFERS:
      return MyProfileAvailableUrlEnum.SELL_OFFERS;
    default:
      return MyProfileAvailableUrlEnum.DATA;
  }
};