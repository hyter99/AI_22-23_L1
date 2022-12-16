import React from "react";

// styles
import styles from "./decline-offer-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useDeclineOfferModal from "./decline-offer-modal.hook";

// components
import MessageBox from "../../../components/message-box/message-box.component";

// interfaces
import { IDeclineOfferData } from "./decline-offer-modal.types";
interface IDeclineOfferModal {
  isBuyModal: boolean;
  isOpened: boolean;
  handleCancelClick: () => void;
  additionalHandleSubmitClick: () => void;
  data: IDeclineOfferData | null;
}

const DeclineOfferModal: React.FC<IDeclineOfferModal> = ({
    isBuyModal,
    isOpened,
    handleCancelClick,
    additionalHandleSubmitClick,
    data
   }) => {
  const {
    isLoading,
    messageBar,
    handleSubmitClick
  } = useDeclineOfferModal(isBuyModal, isOpened, data?.id);

  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title={`Anuluj ofertę ${isBuyModal ? "kupna" : "sprzedaży"} akcji`}
      submitButtonTitle="Potwierdź"
      cancelButtonTitle="Zamknij"
      onSubmitClick={(e) => {
        handleSubmitClick(e)
          .then(() => additionalHandleSubmitClick())
          .catch(() => undefined);
      }}
      onCancelClick={handleCancelClick}
      isSubmitButtonDisabled={messageBar.isSuccess}
    >
      <div className={styles.contentContainer}>
        {
          data ?
            <>
              <p className={styles.info}>Czy na pewno chcesz anulować następującą akcję?</p>
              <p className={styles.info}>{data.name}: w liczbie {data.quantity}</p>
            </>
          :
            <p className={styles.info}>-</p>
        }
        <div className={styles.messageBarContainer}>
          {
            (messageBar.isError || messageBar.isSuccess) ?
              <MessageBox
                message={messageBar.message}
                isError={messageBar.isError}
                wide
              />
            :
              null
          }
        </div>
      </div>
    </TemplateActionModal>
  );
};

export default DeclineOfferModal;