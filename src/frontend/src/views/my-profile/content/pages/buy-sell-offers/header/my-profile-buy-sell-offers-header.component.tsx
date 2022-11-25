import React from "react";

// styles
import styles from "./my-profile-buy-sell-offers-header.module.scss";

// SVGs
import SVGArrowDownV2 from "../../../../../../assets/svg/arrow_down_v2.svg";

// data
import { myProfileBuySellOffersTableHeaders } from "./my-profile-buy-sell-offers-header.data";

// interfaces
import { ISearchOrderBy, IStocksInputFields } from "../../../../../../hooks/data-table/useDataTable.types";
interface IMyProfileBuySellOffersHeader {
  toggleOrderBy: (orderByName: ISearchOrderBy) => void;
  searchInput: IStocksInputFields;
}

const MyProfileBuySellOffersHeader: React.FC<IMyProfileBuySellOffersHeader> = ({toggleOrderBy, searchInput}) => {
  const isOrderByHeader = (orderByName: ISearchOrderBy) => {
    return (orderByName === "quantity" || orderByName === "priceCents" || orderByName === "created");
  };
  
  return (
    <>
      {
        myProfileBuySellOffersTableHeaders.map(headerData => (
          <th
            key={headerData.id}
            style={{width: `${headerData.percentageWidth}%`}}
            className={`${isOrderByHeader(headerData.orderByName) ? styles.cursorPointer : ""}`}
            onClick={() =>
              isOrderByHeader(headerData.orderByName) ?
                toggleOrderBy(headerData.orderByName)
              :
                undefined
            }
          >
            {headerData.title}
            {
              (isOrderByHeader(headerData.orderByName) && (headerData.orderByName === searchInput.orderBy)) ?
                <img
                  src={SVGArrowDownV2}
                  alt="arrow"
                  className={`
                    ${styles.arrow}
                    ${searchInput.isOrderTypeAscending ? styles.ascendingArrow : styles.descendingArrow}
                  `}
                />
              :
                null
            }
          </th>
        ))
      }
    </>
  )
};

export default MyProfileBuySellOffersHeader;