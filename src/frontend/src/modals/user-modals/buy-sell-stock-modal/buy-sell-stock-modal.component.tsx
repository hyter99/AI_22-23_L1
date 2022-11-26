import React from "react";

// styles
import styles from "./buy-sell-stock-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// components
import InputField from "../../../components/ui/input-field/input-field.component";
import MessageBox from "../../../components/message-box/message-box.component";

// hooks
import useBuySellStockModal from "./buy-sell-stock-modal.hook";

// functions
import { CentsToString } from "../../../functions/cents-to-string";

// interfaces
import { IBuySellStockData } from "./buy-sell-stock-modal.types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
interface IBuySellStockModal {
  isBuyModal: boolean;
  isOpened: boolean;
  handleCancelClick: () => void;
  data: IBuySellStockData | null;
}

const BuySellStockModal: React.FC<IBuySellStockModal> = ({
  isBuyModal,
  isOpened,
  handleCancelClick,
  data
 }) => {
  const {
    isLoading,
    inputFields,
    handleInputChange,
    inputFieldsErrors,
    messageBar,
    handleSubmitClick,
    calculateTotalPrice
  } = useBuySellStockModal(isOpened, isBuyModal, data?.id);
  const {balanceCents: usersBalanceCents} = useTypedSelector(state => state.login.loginData.user);
  
  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title={`Złóż ofertę ${isBuyModal ? "kupna" : "sprzedaży"} akcji`}
      submitButtonTitle="Złóż ofertę"
      cancelButtonTitle="Zamknij"
      onSubmitClick={handleSubmitClick}
      onCancelClick={handleCancelClick}
      isSubmitButtonDisabled={calculateTotalPrice() === "-" || messageBar.isSuccess}
    >
      <div className={styles.contentContainer}>
        <div className={styles.dataRow}>
          <div className={`${styles.item} ${styles.big} ${styles.title}`}>
            Nazwa akcji:
          </div>
          <div className={`${styles.item} ${styles.big}`}>
            {data?.name}
          </div>
        </div>
        {
          data?.priceFromInCents ? //TODO - change to always visible when we acquire that data from backend API
            <div className={styles.dataRow}>
              <div className={`${styles.item} ${styles.big} ${styles.title}`}>
                Oferty {isBuyModal ? "kupna" : "sprzedaży"} od:
              </div>
              <div className={`${styles.item} ${styles.big}`}>
                {`${CentsToString(data?.priceFromInCents)} PLN`}
              </div>
            </div>
          :
            null
        }
        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <InputField
              type="text"
              labelColor="black"
              name="quantity"
              value={inputFields.quantity}
              label="Liczba"
              placeholder="Liczba"
              handleChange={handleInputChange}
              isError={inputFieldsErrors.quantity !== ""}
              errorMessage={inputFieldsErrors.quantity}
              isBorderBlack
            />
          </div>
          <div className={styles.inputContainer}>
            <InputField
              type="text"
              labelColor="black"
              name="price"
              value={inputFields.price}
              label="Cena"
              placeholder="Cena"
              handleChange={handleInputChange}
              isError={inputFieldsErrors.price !== ""}
              errorMessage={inputFieldsErrors.price}
              isBorderBlack
            />
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={`${styles.item} ${styles.title}`}>
            Cena całkowita:
          </div>
          <div className={styles.item}>
            {calculateTotalPrice()}
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={`${styles.item} ${styles.title}`}>
            Posiadane środki:
          </div>
          <div className={styles.item}>
            {`${CentsToString(usersBalanceCents)} PLN`}
          </div>
        </div>
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

export default BuySellStockModal;