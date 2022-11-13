import React, { useContext } from "react";

// styles
import styles from "./stocks.module.scss";

// templates
import TemplateView from "../../templates/view/view.template";
import TemplateBasicModal from "../../modals/basic-modal/basic-modal.template";

// components
import StocksTable from "./stocks-table/stocks-table.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import BackToTopButton from "../../components/back-to-top-button/back-to-top-button.component";

// hooks
import useDataTable from "../../hooks/data-table/useDataTable";

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
        <StocksTable
          data={data}
          searchInput={searchInput}
          isLogged={isLogged}
          isLoading={isLoading}
          fetchData={fetchData}
          isEndOfData={isEndOfData}
          toggleOrderBy={toggleOrderBy}
          handleDataModalChange={handleDataModalChange}
        />
      </div>
      <TemplateBasicModal
        isOpened={dataModals.isBuyModalOpen}
        onOutClick={() => handleDataModalChange("isBuyModalOpen", false)}
      >
        <div>
          {/*TODO - prepare buy modal in separate component (with logic) AND paste it here*/}
          {/*itemData={data[selectedItemIdx]}*/}
        </div>
      </TemplateBasicModal>
      <BackToTopButton
        elementId="scrollableDiv"
      />
    </TemplateView>
  );
};

export default ViewStocks;