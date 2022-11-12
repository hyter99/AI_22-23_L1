import React, { useContext } from "react";

// styles
import styles from "./stocks.module.scss";

// SVGs
import SVGArrowDownV2 from "../../assets/svg/arrow_down_v2.svg";

// templates
import TemplateView from "../../templates/view/view.template";

// components
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../../components/search-bar/search-bar.component";
import Button from "../../components/ui/button/button.component";
import { Link } from "react-router-dom";
import BackToTopButton from "../../components/back-to-top-button/back-to-top-button.component";

// hooks
import useDataTable from "../../hooks/data-table/useDataTable";

// functions
import { CentsToString } from "../../functions/cents-to-string";

// data
import { stockTableHeaders } from "./stocks.data";

// context
import { IsMobileViewContext } from "../../providers/is-mobile-view-provide.component";

// interfaces
interface IViewStocks {
  appVersion: string;
  isLogged?: boolean;
}
import { IStockAction } from "../../hooks/data-table/useDataTable.types";

const ViewStocks:React.FC<IViewStocks> = ({appVersion, isLogged}) => {
  const {
    data,
    fetchData,
    onSearchClick,
    searchInput,
    handleInputChange,
    handleDataModalChange,
    toggleOrderBy,
    selectedItemIdx,
    isLoading,
    dataModals,
    isEndOfData
  } = useDataTable<IStockAction>("stockActions");
  const {isMobileView} = useContext(IsMobileViewContext);

  return (
    <TemplateView
      appVersion={appVersion}
      viewTitle="Akcje"
      isLogged={isLogged}
    >
      <div className={styles.container}>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            placeholder="Szukaj akcji"
            name="searchField"
            value={searchInput.searchField}
            handleChange={handleInputChange}
            onSearchClick={onSearchClick}
            isPaddingInsideLeft={isMobileView}
          />
        </div>
        <div className={styles.stocksTableWrapper}>
          {
            data.length === 0 && !isLoading ?
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
                    <h4 className={styles.loader}>
                      Ładowanie...
                    </h4>
                  :
                    null
                }
                endMessage={
                  <h4 className={styles.loader}>
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
                          key={item.stockId}
                        >
                          <td>{`${index+1}.`}</td>
                          <td>{item.Company.name}</td>
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
                                to={`/szczegoly-akcji/${item.stockId}`}
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
      </div>
      {
        dataModals.isBuyModalOpen ?
          <></>
          // TO DO - prepare buy modal in separate component (with logic) AND paste it here
          // we pass to him onOutClick function (to close modal) and stock action data
          // 1. itemData={data[selectedItemIdx]}
          // 2. onOutClick={() => handleDataModalChange("isBuyModalOpen", false)}
        :
          null
      }
      <BackToTopButton
        elementId="scrollableDiv"
      />
    </TemplateView>
  );
};

export default ViewStocks;