import React from "react";

// styles
import styles from "./my-profile-buy-sell-offers-body.module.scss";

// components
import Button from "../../../../../../components/ui/button/button.component";

// functions
import { CentsToString } from "../../../../../../functions/cents-to-string";
import ConvertTimeFromBackendApi from "../../../../../../functions/convert-time-from-backend-api";
import { GetOfferStatusName } from "../../../../../../functions/getOfferStatusName";

// interfaces
import { IMyOfferAction } from "../../../../../../hooks/data-table/useDataTable.types";
interface IMyProfileBuySellOffersBody {
  data: IMyOfferAction[];
  handleDeclineOfferButtonClick: (index?: number) => void;
}

const MyProfileBuySellOffersBody: React.FC<IMyProfileBuySellOffersBody> = ({data, handleDeclineOfferButtonClick}) => {

  return (
    <>
      {
        data.map((item, index) => {
          const statusName = GetOfferStatusName(item.status);
          
          return (
            <tr
              key={item.offerId}
            >
              <td>{`${index + 1}.`}</td>
              <td>{""}</td>
              {/*TODO - fill the 'action's name' from backendAPI when it's done*/}
              <td>{item.quantity}</td>
              <td>{`${CentsToString(item.unitPriceCents)} PLN`}</td>
              <td>{ConvertTimeFromBackendApi(item.created)}</td>
              {/*convert date*/}
              <td
                className={
                  statusName === "Aktywny" ?
                    styles.colorGreen
                  : statusName === "Wygasły" ?
                      styles.colorRed
                  :
                    ""
                }
              >{statusName}</td>
              {/*convert status*/}
              <td>
                <div className={styles.buttonWrapper}>
                  <Button
                    fontColor="white"
                    backgroundColor="darkerGray"
                    title="Anuluj"
                    type="button"
                    bigFont
                    handleClick={() => handleDeclineOfferButtonClick(index)}
                  />
                </div>
              </td>
            </tr>
          )
        })
      }
    </>
  )
};

export default MyProfileBuySellOffersBody;