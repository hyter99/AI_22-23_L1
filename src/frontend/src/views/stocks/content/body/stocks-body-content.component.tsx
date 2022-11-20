import React from "react";

// styles
import styles from "./stocks-body-content.module.scss";

// components
import Button from "../../../../components/ui/button/button.component";
import { Link } from "react-router-dom";

// functions
import { CentsToString } from "../../../../functions/cents-to-string";

// interfaces
import { IStockAction } from "../../../../hooks/data-table/useDataTable.types";
interface IStocksBodyContent {
  data: IStockAction[];
  isLogged?: boolean;
  handleDataModalChange: (name: string, value: boolean, selItemIdx?: number) => void;
}

const StocksBodyContent: React.FC<IStocksBodyContent> = ({data, isLogged, handleDataModalChange}) => {
  
  return (
    <>
      {
        data.map((item, index) => (
          <tr
            key={item.stockId}
          >
            <td>{`${index+1}.`}</td>
            <td>{item.Company.name}</td>
            <td>{item.quantity}</td>
            <td>{`${CentsToString(item.priceCents)} PLN`}</td>
            <td>
              {
                isLogged ?
                  <div className={styles.buttonWrapper}>
                    <Button
                      fontColor="white"
                      backgroundColor="darkerGray"
                      title="Kup"
                      type="button"
                      bigFont
                      handleClick={() => handleDataModalChange("isBuyModalOpen", true, index)}
                    />
                  </div>
                :
                  null
              }
              <div className={styles.buttonWrapper}>
                <Link
                  to={`/szczegoly-akcji/${item.stockId}`}
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

export default StocksBodyContent;