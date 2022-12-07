import React from "react";

// styles
import styles from "./decline-offer-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useDeclineOfferModal from "./decline-offer-modal.hook";

// interfaces
import { IDeclineOfferData } from "./decline-offer-modal.types";
interface IDeclineOfferModal {
  isBuyModal: boolean;
  isOpened: boolean;
  handleCancelClick: () => void;
  data: IDeclineOfferData | null;
}

const DeclineOfferModal: React.FC<IDeclineOfferModal> = ({
    isBuyModal,
    isOpened,
    handleCancelClick,
    data
   }) => {
  const {
    isLoading,
    handleSubmitClick
  } = useDeclineOfferModal(isBuyModal);

  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title={`Anuluj ofertę ${isBuyModal ? "kupna" : "sprzedaży"} akcji`}
      submitButtonTitle="Potwierdź"
      cancelButtonTitle="Zamknij"
      onSubmitClick={handleSubmitClick}
      onCancelClick={handleCancelClick}
    >
      <div className={styles.contentContainer}>
        <p>Czy na pewno chcesz anulować następującą akcję?</p>
        <p>{data?.name}: w liczbie {data?.quantity}</p>
      </div>
    </TemplateActionModal>
  );
};

export default DeclineOfferModal;