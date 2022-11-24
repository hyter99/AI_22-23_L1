import React from "react";

// styles
import styles from "./buy-sell-stock-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useBuySellStockModal from "./buy-sell-stock-modal.hook";

// interfaces
import { IStockAction } from "../../../hooks/data-table/useDataTable.types";
interface IBuySellStockModal {
  isBuyModal: boolean;
  isOpened: boolean;
  handleCancelClick: () => void;
  data: IStockAction | null;
}

const BuySellStockModal: React.FC<IBuySellStockModal> = ({
  isBuyModal,
  isOpened,
  handleCancelClick,
  data
 }) => {
  const {
    isLoading,
    handleSubmitClick
  } = useBuySellStockModal();
  
  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title={`Złóż ofertę ${isBuyModal ? "kupna" : "sprzedaży"} akcji`}
      submitButtonTitle="Złóż ofertę"
      cancelButtonTitle="Zamknij"
      onSubmitClick={handleSubmitClick}
      onCancelClick={handleCancelClick}
    >
      <div className={styles.contentContainer}>
        {/*TODO - write body of the modal (with styling)*/}
        {data?.stockId}
      </div>
    </TemplateActionModal>
  );
};

export default BuySellStockModal;