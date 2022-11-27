// enums
import { MyProfilePagesEnum } from "../views/my-profile/content/my-profile-content.data";
import { MyProfileAvailableUrlEnum } from "../views/my-profile/my-profile.data";

export const translatePlEngMyProfilePageName = (currentPageName: MyProfileAvailableUrlEnum): MyProfilePagesEnum => {
  switch (currentPageName) {
    case MyProfileAvailableUrlEnum.DATA:
      return MyProfilePagesEnum.DATA;
    case MyProfileAvailableUrlEnum.STOCKS:
      return MyProfilePagesEnum.STOCKS;
    case MyProfileAvailableUrlEnum.BUY_OFFERS:
      return MyProfilePagesEnum.BUY_OFFERS;
    case MyProfileAvailableUrlEnum.SELL_OFFERS:
      return MyProfilePagesEnum.SELL_OFFERS;
    default:
      return MyProfilePagesEnum.DATA;
  }
};