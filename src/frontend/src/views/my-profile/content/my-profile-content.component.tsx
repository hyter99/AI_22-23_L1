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
          //    DATA COMPONENT
            <></>
          : selectedPage === MyProfilePagesEnum.STOCKS ?
          //    STOCKS COMPONENT
              <></>
          : selectedPage === MyProfilePagesEnum.BUY_OFFERS ?
          //    BUY-OFFERS COMPONENT
              <></>
          :
          //    SELL-OFFERS COMPONENT
              <></>
        }
      </div>
    </TemplateContentOfPage>
  );
};

export default MyProfileContent;