import React from "react";

// styles
import styles from "./my-profile-data.module.scss";

// redux
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";

// functions
import { CentsToString } from "../../../../../functions/cents-to-string";

// hook
import useMyProfileData from "./my-profile-data.hook";

// components
import Button from "../../../../../components/ui/button/button.component";

// modals
import EditUserDataModal from "../../../../../modals/user-modals/edit-user-data-modal/edit-user-data-modal.component";
import AddFundsModal from "../../../../../modals/user-modals/add-funds-modal/add-funds-modal.component";

const MyProfileData: React.FC = ({}) => {
  const {modalsState, handleModalStateChange} = useMyProfileData();
  const {user} = useTypedSelector(state => state.login.loginData);
  
  return (
    <div className={styles.myProfileDataContainer}>
      <table>
        <tbody>
          <tr>
            <td>Imię:</td>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <td>Nazwisko:</td>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          title="Edytuj dane"
          backgroundColor="darkerGray"
          fontColor="white"
          handleClick={() => handleModalStateChange("isEditDataOpen", true)}
          bigFont
        />
      </div>
      <div className={styles.fundsRow}>
        <p>Saldo:</p>
        <p>{`${CentsToString(user.balanceCents)} PLN`}</p>
        <div className={`${styles.buttonWrapper} ${styles.marginLeft}`}>
          <Button
            type="button"
            title="Dodaj środki"
            backgroundColor="darkerGray"
            fontColor="white"
            handleClick={() => handleModalStateChange("isAddFundsOpen", true)}
            bigFont
          />
        </div>
      </div>
      {/*TODO - create EditUserDataModal*/}
      <EditUserDataModal
        isOpened={modalsState.isEditDataOpen}
        handleCancelClick={() => handleModalStateChange("isEditDataOpen", false)}
        data={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }}
      />
      {/*TODO - create AddFundsModal modal*/}
      <AddFundsModal
        isOpened={modalsState.isAddFundsOpen}
        handleCancelClick={() => handleModalStateChange("isAddFundsOpen", false)}
        actualBalanceCents={user.balanceCents}
      />
    </div>
  );
};

export default MyProfileData;