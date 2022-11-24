import React from "react";

// styles
import styles from "./edit-user-data-modal.module.scss";

// templates
import TemplateActionModal from "../../action-modal/action-modal.template";

// hooks
import useEditUserDataModal from "./edit-user-data-modal.hook";

// interfaces
import { IEditUserData } from "./edit-user-data-modal.types";
interface IEditUserDataModal {
  isOpened: boolean;
  handleCancelClick: () => void;
  data: IEditUserData;
}

const EditUserDataModal: React.FC<IEditUserDataModal> = ({
     isOpened,
     handleCancelClick,
     data
   }) => {
  const {
    isLoading,
    handleSubmitClick
  } = useEditUserDataModal(data);

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
        {/*TODO - write body of the modal (with styling)*/}
      </div>
    </TemplateActionModal>
  );
};

export default EditUserDataModal;