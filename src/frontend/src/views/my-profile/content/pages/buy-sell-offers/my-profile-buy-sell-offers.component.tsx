import React, { useContext } from "react";

// styles
import styles from "./my-profile-buy-sell-offers.module.scss";

// components
import SearchBar from "../../../../../components/search-bar/search-bar.component";
import StocksTable from "../../../../../components/stocks-table/stocks-table.component";
import BackToTopButton from "../../../../../components/back-to-top-button/back-to-top-button.component";
import Select from "../../../../../components/ui/select/select.component";
import MyProfileBuySellOffersHeader from "./header/my-profile-buy-sell-offers-header.component";
import MyProfileBuySellOffersBody from "./body/my-profile-buy-sell-offers-body.component";

// modals
import DeclineOfferModal from "../../../../../modals/user-modals/decline-offer-modal/decline-offer-modal.component";

// hooks
import useDataTable from "../../../../../hooks/data-table/useDataTable";

// data
import { myProfileBuySellOfferStateSelect } from "./my-profile-buy-sell-offers.data";

// context
import { IsMobileViewContext } from "../../../../../providers/is-mobile-view-provide.component";

// interfaces
import { IMyOfferAction } from "../../../../../hooks/data-table/useDataTable.types";

interface IMyProfileOffers {
  areBuyOffers: boolean;
}

const MyProfileOffers: React.FC<IMyProfileOffers> = ({areBuyOffers}) => {
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
    isEndOfData,
    removeItemAtIndex
  } = useDataTable<IMyOfferAction>(areBuyOffers ? "myBuyOffers" : "mySellOffers");
  const {isMobileView} = useContext(IsMobileViewContext);

  return (
    <>
      <div className={styles.searchBarWrapper}>
        <div className={styles.inputField}>
          <SearchBar
            placeholder="Szukaj akcji"
            name="searchField"
            value={searchInput.searchField}
            handleChange={handleInputChange}
            onSearchClick={onSearchClick}
            isPaddingInsideLeft={isMobileView}
          />
        </div>
        <div className={styles.select}>
          <Select
            placeholder=""
            name="status"
            value={searchInput.status.toString()}
            label="Status:"
            options={myProfileBuySellOfferStateSelect.map(item => ({
              textToShow: item.title,
              value: item.value.toString()
            }))}
            handleChange={handleInputChange}
            isLabelOnLeft
            noErrorBar
            whiteLabel
            isExtended
          />
        </div>
      </div>
      <StocksTable
        dataLength={data.length}
        isLoading={isLoading}
        fetchData={fetchData}
        isEndOfData={isEndOfData}
        headerContent={
          <MyProfileBuySellOffersHeader
            searchInput={searchInput}
            toggleOrderBy={toggleOrderBy}
          />
        }
        bodyContent={
          <MyProfileBuySellOffersBody
            data={data}
            handleDeclineOfferButtonClick={(index) => handleDataModalChange("isDeclineModalOpen", true, index)}
          />
        }
      />
      <DeclineOfferModal
        isBuyModal={areBuyOffers}
        isOpened={dataModals.isDeclineModalOpen}
        handleCancelClick={() => handleDataModalChange("isDeclineModalOpen", false)}
        additionalHandleSubmitClick={() => removeItemAtIndex()}
        data={
          selectedItemIdx !== -1 ?
            {
              id: data[selectedItemIdx].offerId,
              name: data[selectedItemIdx].name,
              quantity: data[selectedItemIdx].quantity
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

export default MyProfileOffers;