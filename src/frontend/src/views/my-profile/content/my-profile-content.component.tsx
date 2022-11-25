import React from "react";

// styles
import styles from "./my-profile-content.module.scss";

// templates
import TemplateContentOfPage from "../../../templates/content-of-page/content-of-page.component";

// enum
import { MyProfilePagesEnum } from "./my-profile-content.data";

// hook
import useMyProfileContent from "./my-profile-content.hook";

// components
import SelectPageBar from "./select-page-bar/select-page-bar.component";
import MyProfileData from "./pages/data/my-profile-data.component";
import MyProfileStocks from "./pages/stocks/my-profile-stocks.component";
import MyProfileOffers from "./pages/buy-sell-offers/my-profile-buy-sell-offers.component";

const MyProfileContent: React.FC = () => {
  const {selectedPage, setSelectedPage} = useMyProfileContent();
  
  return (
    <TemplateContentOfPage>
      <div className={styles.myProfileContainer}>
        <div className={styles.topBarContainer}>
          <SelectPageBar
            selectedPage={selectedPage}
            handleSelectPage={setSelectedPage}
          />
        </div>
        {
          selectedPage === MyProfilePagesEnum.DATA ?
            <MyProfileData/>
          : selectedPage === MyProfilePagesEnum.STOCKS ?
            <MyProfileStocks/>
          : selectedPage === MyProfilePagesEnum.BUY_OFFERS ?
            <MyProfileOffers
              areBuyOffers={true}
            />
          : // MyProfilePagesEnum.SELL_OFFERS
            <MyProfileOffers
              areBuyOffers={false}
            />
        }
      </div>
    </TemplateContentOfPage>
  );
};

export default MyProfileContent;