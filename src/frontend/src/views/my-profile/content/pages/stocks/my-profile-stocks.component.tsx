import React, { useContext } from "react";

// styles
import styles from "./my-profile-stocks.module.scss";

// components
import SearchBar from "../../../../../components/search-bar/search-bar.component";
import StocksTable from "../../../../../components/stocks-table/stocks-table.component";
import BackToTopButton from "../../../../../components/back-to-top-button/back-to-top-button.component";
import MyProfileStocksHeader from "./header/my-profile-stocks-header.component";
import MyProfileStocksBody from "./body/my-profile-stocks-body.component";

// modals
import BuySellStockModal from "../../../../../modals/user-modals/buy-sell-stock-modal/buy-sell-stock-modal.component";

// hooks
import useDataTable from "../../../../../hooks/data-table/useDataTable";

// context
import { IsMobileViewContext } from "../../../../../providers/is-mobile-view-provide.component";

// interfaces
import { IMyStockAction } from "../../../../../hooks/data-table/useDataTable.types";
interface IStocksContent {
  
}

const MyProfileStocks: React.FC<IStocksContent> = ({}) => {
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
  } = useDataTable<IMyStockAction>("myStockActions");
  const {isMobileView} = useContext(IsMobileViewContext);

  return (
    <>
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
          <MyProfileStocksHeader
            searchInput={searchInput}
            toggleOrderBy={toggleOrderBy}
          />
        }
        bodyContent={
          <MyProfileStocksBody
            data={data}
            handleBuyOfferButtonClick={(index) => handleDataModalChange("isBuyModalOpen", true, index)}
            handleSellOfferButtonClick={(index) => handleDataModalChange("isSellModalOpen", true, index)}
          />
        }
      />
      <BuySellStockModal
        isBuyModal={true}
        isOpened={dataModals.isBuyModalOpen}
        handleCancelClick={() => handleDataModalChange("isBuyModalOpen", false)}
        data={
          selectedItemIdx !== -1 ?
            {
              id: data[selectedItemIdx].Company.companyId,
              name: data[selectedItemIdx].Company.name
              // TODO - Don't know what to add in 'priceFromInCents' field (we don;t acquire precise data from backendAPI)
            }
          :
            null
        }
      />
      <BuySellStockModal
        isBuyModal={false}
        isOpened={dataModals.isSellModalOpen}
        handleCancelClick={() => handleDataModalChange("isSellModalOpen", false)}
        data={
          selectedItemIdx !== -1 ?
            {
              id: data[selectedItemIdx].Company.companyId,
              name: data[selectedItemIdx].Company.name,
              availableQuantity: data[selectedItemIdx].stockQuantity
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

export default MyProfileStocks;