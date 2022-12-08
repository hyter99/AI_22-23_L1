import React from "react";

// styles
import styles from "./my-profile-stocks-body.module.scss";

// components
import Button from "../../../../../../components/ui/button/button.component";
import { Link } from "react-router-dom";

// interfaces
import { IMyStockAction } from "../../../../../../hooks/data-table/useDataTable.types";
interface IMyProfileStocksBody {
  data: IMyStockAction[];
  handleBuyOfferButtonClick: (index?: number) => void;
  handleSellOfferButtonClick: (index?: number) => void;
}

const MyProfileStocksBody: React.FC<IMyProfileStocksBody> = ({data, handleBuyOfferButtonClick, handleSellOfferButtonClick}) => {

  return (
    <>
      {
        data.map((item, index) => (
          <tr
            key={item.userStockId}
          >
            <td>{`${index+1}.`}</td>
            <td>{item.Company.name}</td>
            <td>{item.stockQuantity}</td>
            {/*TODO - add priceCents body*/}
            <td>
              <div className={styles.buttonWrapper}>
                <Button
                  fontColor="white"
                  backgroundColor="darkerGray"
                  title="Sprzedaj"
                  type="button"
                  bigFont
                  handleClick={() => handleSellOfferButtonClick(index)}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  fontColor="white"
                  backgroundColor="darkerGray"
                  title="Kup"
                  type="button"
                  bigFont
                  handleClick={() => handleBuyOfferButtonClick(index)}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Link
                  to={`/szczegoly-akcji/${item.Company.companyId}`}
                >
                  <Button
                    fontColor="white"
                    backgroundColor="darkerGray"
                    title="Pokaż szczegóły"
                    type="button"
                    bigFont
                  />
                </Link>
              </div>
            </td>
          </tr>
        ))
      }
    </>
  )
};

export default MyProfileStocksBody;