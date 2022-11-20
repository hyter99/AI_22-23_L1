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
  
  return (
    <>
      {
        stockTableHeaders.map(headerData => (
          <th
            key={headerData.id}
            style={{width: `${headerData.percentageWidth}%`}}
            className={`${(headerData.orderByName === "priceCents" || headerData.orderByName === "quantity") ? styles.cursorPointer : ""}`}
            onClick={() =>
              (headerData.orderByName === "priceCents" || headerData.orderByName === "quantity") ?
                toggleOrderBy(headerData.orderByName)
              :
                undefined
            }
          >
            {headerData.title}
            {
              (headerData.orderByName === "priceCents" || headerData.orderByName === "quantity") && (headerData.orderByName === searchInput.orderBy) ?
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