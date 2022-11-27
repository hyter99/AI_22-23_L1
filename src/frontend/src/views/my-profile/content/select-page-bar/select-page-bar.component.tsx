import React from "react";

// styles
import styles from "./select-page-bar.module.scss";

// data
import { pagesToSelect } from "./select-page-bar.data";

// interfaces
import { MyProfilePagesEnum } from "../my-profile-content.data";
interface ISelectPageBar {
  selectedPage: MyProfilePagesEnum;
  handleSelectPage: (page: MyProfilePagesEnum) => void;
}

const SelectPageBar: React.FC<ISelectPageBar> = ({selectedPage, handleSelectPage}) => {
  
  return (
    <div className={styles.selectPageBarContainer}>
      <div className={styles.content}>
        {
          pagesToSelect.map((item, index) => (
            <div
              className={styles.itemContainer}
              key={item.id}
            >
              <div
                key={item.id}
                className={`
                  noSelect
                  ${styles.pageItem}
                  ${selectedPage === item.value ? styles.active : ""}
                `}
                onClick={() => handleSelectPage(item.value)}
              >
                {item.title}
              </div>
              {
                index < (pagesToSelect.length-1) ?
                  <div
                    key={`divider-${item.id}`}
                    className={styles.divider}
                  />
                :
                  null
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SelectPageBar;