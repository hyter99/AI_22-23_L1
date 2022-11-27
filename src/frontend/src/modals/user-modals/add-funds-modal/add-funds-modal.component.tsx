import React from "react";

// styles
import styles from "./add-funds-modal.module.scss"

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useAddFundsModal from "./add-funds-modal.hook";

// interfaces
interface IAddFundsModal {
  isOpened: boolean;
  handleCancelClick: () => void;
  actualBalanceCents: number;
}

const AddFundsModal: React.FC<IAddFundsModal> = ({
    isOpened,
    handleCancelClick,
    actualBalanceCents
 }) => {
  const {
    isLoading,
    handleSubmitClick
  } = useAddFundsModal(actualBalanceCents);

  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title="Dodawanie środków"
      submitButtonTitle="Dodaj"
      cancelButtonTitle="Zamknij"
      onSubmitClick={handleSubmitClick}
      onCancelClick={handleCancelClick}
    >
      <div className={styles.contentContainer}>
        {/*TODO - write body of the modal (with styling)*/}
      </div>
    </TemplateActionModal>
  );
};

export default AddFundsModal;