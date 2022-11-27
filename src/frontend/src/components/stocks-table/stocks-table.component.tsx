import React, { ReactNode } from "react";

// styles
import styles from "./stocks-table.module.scss";

// components
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingModal from "../../modals/loading-modal/loading-modal.component";

// interfaces
interface IStocksTable {
  dataLength: number;
  isLoading?: boolean;
  isEndOfData?: boolean;
  fetchData: (isStart?: boolean) => void;
  headerContent: ReactNode;
  bodyContent: ReactNode;
}

const StocksTable: React.FC<IStocksTable> = ({
    dataLength,
    isLoading,
    isEndOfData,
    fetchData,
    headerContent,
    bodyContent
 }) => {
  
  return (
    <div className={styles.stocksTableWrapper}>
      {
        (dataLength === 0 && !isLoading) ?
          <div className={styles.noActionsMessage}>
            Brak akcji
          </div>
        :
          <InfiniteScroll
            dataLength={dataLength}
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
                  {headerContent}
                </tr>
              </thead>
              <tbody>
                {bodyContent}
              </tbody>
            </table>
          </InfiniteScroll>
      }
    </div>
  );
};

export default StocksTable;