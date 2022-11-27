import React from "react";

// styles
import styles from "./stocks-header-content.module.scss";

// SVGs
import SVGArrowDownV2 from "../../../../assets/svg/arrow_down_v2.svg";

// data
import { stockTableHeaders } from "./stocks-header-content.data";

// interfaces
import { ISearchOrderBy, IStocksInputFields } from "../../../../hooks/data-table/useDataTable.types";
interface IStocksHeaderContent {
  toggleOrderBy: (orderByName: ISearchOrderBy) => void;
  searchInput: IStocksInputFields;
}

const StocksHeaderContent: React.FC<IStocksHeaderContent> = ({toggleOrderBy, searchInput}) => {
  const isOrderByHeader = (orderByName: ISearchOrderBy) => {
    return (orderByName === "priceCents" || orderByName === "quantity");
  };  
  
  return (
    <>
      {
        stockTableHeaders.map(headerData => (
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

export default StocksHeaderContent;