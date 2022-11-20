import React, { useContext } from "react";

// styles
import styles from "./stocks-content.module.scss";

// components
import SearchBar from "../../../components/search-bar/search-bar.component";
import StocksTable from "../../../components/stocks-table/stocks-table.component";
import BackToTopButton from "../../../components/back-to-top-button/back-to-top-button.component";

// templates
import TemplateBasicModal from "../../../modals/basic-modal/basic-modal.template";

// hooks
import useDataTable from "../../../hooks/data-table/useDataTable";

// interfaces
import { IStockAction } from "../../../hooks/data-table/useDataTable.types";
import { IsMobileViewContext } from "../../../providers/is-mobile-view-provide.component";
import StocksHeaderContent from "./header/stocks-header-content.component";
import StocksBodyContent from "./body/stocks-body-content.component";
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
              handleDataModalChange={handleDataModalChange}
            />
          }
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
    </>
  );
};

export default StocksContent;