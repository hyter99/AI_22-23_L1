import React from "react";

// styles
import styles from "./add-funds-modal.module.scss"

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useAddFundsModal from "./add-funds-modal.hook";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import MessageBox from "../../../components/message-box/message-box.component";

// functions
import { CentsToString } from "../../../functions/cents-to-string";

// interfaces
interface IAddFundsModal {
  isOpened: boolean;
  handleCancelClick: () => void;
}

const AddFundsModal: React.FC<IAddFundsModal> = ({
    isOpened,
    handleCancelClick
 }) => {
  const {
    isLoading,
    messageBar,
    inputAmount,
    handleInputAmountChange,
    inputAmountError,
    handleSubmitClick,
    actualBalanceCents
  } = useAddFundsModal(isOpened);

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
        <div className={styles.inputContainer}>
          <InputField
            type="text"
            placeholder="Kwota"
            label="Kwota:"
            labelColor="black"
            name="amount"
            value={inputAmount}
            handleChange={(name, value) => handleInputAmountChange(value)}
            isError={inputAmountError !== ""}
            errorMessage={inputAmountError}
          />
        </div>
        <div className={styles.dataRow}>
          <div className={`${styles.item} ${styles.title}`}>
            Aktualny stan konta:
          </div>
          <div className={styles.item}>
            {`${CentsToString(actualBalanceCents)} PLN`}
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={`${styles.item} ${styles.title}`}>
            Stan konta po zmianie:
          </div>
          <div className={styles.item}>
            {`${
              inputAmount !== "" ?
                CentsToString(actualBalanceCents + (parseFloat(inputAmount)*100))
              :
                CentsToString(actualBalanceCents)
            } PLN`}
          </div>
        </div>
        <div className={styles.messageBarContainer}>
          {
            (messageBar.isError || messageBar.isSuccess) ?
              <MessageBox
                message={messageBar.message ?? ""}
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

export default AddFundsModal;