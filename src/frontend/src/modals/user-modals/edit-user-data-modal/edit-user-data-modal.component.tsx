import React from "react";

// styles
import styles from "./edit-user-data-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useEditUserDataModal from "./edit-user-data-modal.hook";
import InputField from "../../../components/ui/input-field/input-field.component";
import Checkbox from "../../../components/ui/checkbox/checkbox.component";
import MessageBox from "../../../components/message-box/message-box.component";

// interfaces
interface IEditUserDataModal {
  isOpened: boolean;
  handleCancelClick: () => void;
}

const EditUserDataModal: React.FC<IEditUserDataModal> = ({
     isOpened,
     handleCancelClick
   }) => {
  const {
    isLoading,
    messageBar,
    inputFields,
    handleInputChange,
    inputFieldsError,
    isEmailChangeChecked,
    handleEmailCheckboxChange,
    handleSubmitClick
  } = useEditUserDataModal(isOpened);

  return (
    <TemplateActionModal
      isOpened={isOpened}
      isLoading={isLoading}
      title="Edycja danych profilu"
      submitButtonTitle="Zapisz"
      cancelButtonTitle="Zamknij"
      onSubmitClick={handleSubmitClick}
      onCancelClick={handleCancelClick}
    >
      <div className={styles.contentContainer}>
        <div className={styles.row}>
          <div className={`${styles.inputContainer} ${styles.short}`}>
            <InputField
              type="text"
              label="Imię"
              labelColor="black"
              placeholder="Imię"
              name="firstName"
              value={inputFields.firstName}
              handleChange={handleInputChange}
              isError={inputFieldsError.firstName !== ""}
              errorMessage={inputFieldsError.firstName}
            />
          </div>
          <div className={`${styles.inputContainer} ${styles.short}`}>
            <InputField
              type="text"
              label="Nazwisko"
              labelColor="black"
              placeholder="Nazwisko"
              name="lastName"
              value={inputFields.lastName}
              handleChange={handleInputChange}
              isError={inputFieldsError.lastName !== ""}
              errorMessage={inputFieldsError.lastName}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Checkbox
            name="checkbox"
            value="checkbox"
            checked={isEmailChangeChecked}
            label="Chcę zmienić email"
            labelColor="black"
            handleChange={(name, value, checked) => handleEmailCheckboxChange(checked)}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.inputContainer}>
            <InputField
              type="text"
              label="Email"
              labelColor="black"
              placeholder="Email"
              name="email"
              value={inputFields.email}
              handleChange={handleInputChange}
              isError={inputFieldsError.email !== ""}
              errorMessage={inputFieldsError.email}
              disabled={!isEmailChangeChecked}
            />
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

export default EditUserDataModal;