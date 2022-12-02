import React, { useContext } from "react";

// styles
import styles from "./stocks-content.module.scss";

// templates
import TemplateContentOfPage from "../../../templates/content-of-page/content-of-page.component";


// components
import SearchBar from "../../../components/search-bar/search-bar.component";
import StocksTable from "../../../components/stocks-table/stocks-table.component";
import BackToTopButton from "../../../components/back-to-top-button/back-to-top-button.component";
import StocksHeaderContent from "./header/stocks-header-content.component";
import StocksBodyContent from "./body/stocks-body-content.component";

// modals
import BuySellStockModal from "../../../modals/user-modals/buy-sell-stock-modal/buy-sell-stock-modal.component";

// hooks
import useDataTable from "../../../hooks/data-table/useDataTable";

// interfaces
import { IStockAction } from "../../../hooks/data-table/useDataTable.types";
import { IsMobileViewContext } from "../../../providers/is-mobile-view-provide.component";

interface IStocksContent {
  isLogged?: boolean;
}

const StocksContent: React.FC<IStocksContent> = ({isLogged}) => {
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
    <>
      <TemplateContentOfPage>
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
        <StocksTable
          dataLength={data.length}
          isLoading={isLoading}
          fetchData={fetchData}
          isEndOfData={isEndOfData}
          headerContent={
            <StocksHeaderContent
              searchInput={searchInput}
              toggleOrderBy={toggleOrderBy}
            />
          }
          bodyContent={
            <StocksBodyContent
              isLogged={isLogged}
              data={data}
              handleBuyOfferButtonClick={(index) => handleDataModalChange("isBuyModalOpen", true, index)}
            />
          }
        />
      </TemplateContentOfPage>
      <BuySellStockModal
        isBuyModal={true}
        isOpened={dataModals.isBuyModalOpen}
        handleCancelClick={() => handleDataModalChange("isBuyModalOpen", false)}
        data={
          selectedItemIdx !== -1 ?
            {
              id: data[selectedItemIdx].companyId,
              name: data[selectedItemIdx].name,
              priceFromInCents: data[selectedItemIdx].priceCents
            }
          :
            null
        }
      />
      <BackToTopButton
        elementId="scrollableDiv"
      />
    </>
  );
};

export default StocksContent;