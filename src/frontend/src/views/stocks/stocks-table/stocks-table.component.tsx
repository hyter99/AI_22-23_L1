import React from "react";
import { Link } from "react-router-dom";

// styles
import styles from "./stocks-table.module.scss";

// SVGs
import SVGArrowDownV2 from "../../../assets/svg/arrow_down_v2.svg";

// components
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingModal from "../../../modals/loading-modal/loading-modal.component";
import Button from "../../../components/ui/button/button.component";

// functions
import { CentsToString } from "../../../functions/cents-to-string";

// data
import {stockTableHeaders} from "./stocks-table.data";

// interfaces
import { ISearchOrderBy, IStockAction, IStocksInputFields } from "../../../hooks/data-table/useDataTable.types";
interface IStocksTable {
  data: IStockAction[];
  searchInput: IStocksInputFields;
  isLogged?: boolean;
  isLoading?: boolean;
  isEndOfData?: boolean;
  fetchData: (isStart?: boolean) => void;
  toggleOrderBy: (orderByClicked: ISearchOrderBy) => void;
  handleDataModalChange: (name: string, value: boolean, selItemIdx?: number) => void;
}

const StocksTable: React.FC<IStocksTable> = ({
    data,
    searchInput,
    isLogged,
    isLoading,
    isEndOfData,
    fetchData,
    toggleOrderBy,
    handleDataModalChange
 }) => {
  
  return (
    <div className={styles.stocksTableWrapper}>
      {
        (data.length === 0 && !isLoading) ?
          <div className={styles.noActionsMessage}>
            Brak akcji
          </div>
        :
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={!isEndOfData}
            loader={
              isLoading ?
                <div className={styles.loaderWrapper}>
                  <LoadingModal
                    small
                    bgTransparent
                  />
                </div>
              :
                null
            }
            endMessage={
              <h4 className={styles.endOfDataMessage}>
                Koniec akcji
              </h4>
            }
            scrollableTarget="scrollableDiv"
            scrollThreshold="100px"
          >
            <table>
              <thead>
                <tr className="noSelect">
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
                </tr>
              </thead>
              <tbody>
              {
                data.map((item, index) => (
                  <tr
                    key={item.companyId}
                  >
                    <td>{`${index+1}.`}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{`${CentsToString(item.priceCents)} PLN`}</td>
                    <td className={styles.tdButton}>
                      {
                        isLogged ?
                          <div className={styles.buttonWrapper}>
                            <Button
                              fontColor="white"
                              backgroundColor="darkerGray"
                              title="Kup"
                              type="button"
                              bigFont
                              handleClick={() => handleDataModalChange("isBuyModalOpen", true, index)}
                            />
                          </div>
                        :
                          null
                      }
                      <div className={styles.buttonWrapper}>
                        <Link
                          to={`/szczegoly-akcji/${item.companyId}`}
                        >
                          <Button
                            fontColor="white"
                            backgroundColor="darkerGray"
                            title="Pokaż szczegóły"
                            type="button"
                            bigFont
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </InfiniteScroll>
      }
    </div>
  );
};

export default StocksTable;