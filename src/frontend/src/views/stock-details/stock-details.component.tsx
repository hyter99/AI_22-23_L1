import React from "react";
import { useParams } from 'react-router';

// styles
import styles from './stock-details.module.scss';

// templates
import TemplateView from '../../templates/view/view.template';
import TemplateBasicModal from "../../modals/basic-modal/basic-modal.template";

// hooks
import useStockDetails from "./stock-details.hook";

// components
import Button from "../../components/ui/button/button.component";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import LoadingModal from "../../modals/loading-modal/loading-modal.component";

// interfaces
interface IViewStockDetails {
  appVersion: string;
  isLogged?: boolean;
}

const ViewStockDetails: React.FC<IViewStockDetails> = (
  props
) => {
  const { id = '' } = useParams<{ id: string }>();
  const {
    priceFormatter,
    stockFetch,
    mappedData,
    isBuyModalOpened,
    setIsBuyModalOpened
  } = useStockDetails(id);

  return (
    <TemplateView
      appVersion={props.appVersion}
      viewTitle={`Szczegóły akcji: ${stockFetch.data?.Company.name}`}
      isLogged={props.isLogged}
      isFullScreen
    >
      <div className={styles.backdrop}>
        <div className={styles.panel}>
          {
            !stockFetch.isLoading ?
              stockFetch.data ?
                <>
                  <div id="stock-name" className={styles.line}>
                    <span className={styles.label}>Nazwa akcji:</span>
                    <span className={styles.value}>
                      {stockFetch.data?.Company.name}
                    </span>
                  </div>
                  <div id="stock-description" className={styles.line}>
                    <span className={styles.label}>Opis:</span>
                    <span className={styles.value}>
                      {stockFetch.data?.Company.description}
                    </span>
                  </div>
                  <div id="stock-count" className={styles.line}>
                    <span className={styles.label}>Liczba w obiegu:</span>
                    <span className={styles.value}>{stockFetch.data?.quantity}</span>
                  </div>
                  <div id="stock-min-price" className={styles.line}>
                    <span className={styles.label}>Aktualne oferty sprzedaży od:</span>
                    <span className={styles.value}>
                      {stockFetch.data?.priceCents
                        ? priceFormatter.format(stockFetch.data.priceCents / 100)
                        : 'Brak ofert'}
                    </span>
                  </div>
                  {
                    props.isLogged ?
                      <div id="stock-buy-button" className={styles.buyButtonWrap}>
                        <Button
                          type="button"
                          title="Kup"
                          backgroundColor="darkerGray"
                          fontColor="white"
                          handleClick={() => setIsBuyModalOpened(true)}
                        />
                      </div>
                    :
                      null
                  }
                  <div id="stock-history" className={styles.stockHistory}>
                    <div className={styles.label}>
                      Historia zmian ceny jednostkowej:
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mappedData}
                        margin={{
                          top: 15,
                          right: 5,
                          left: 30,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                        <XAxis dataKey="name" scale="auto" stroke="whitesmoke" />
                        <YAxis
                          stroke="whitesmoke"
                          tickFormatter={(value) => priceFormatter.format(value / 100)}
                        />
                        <Tooltip
                          content={(props) => {
                            const price = priceFormatter.format(
                              Number(props.payload?.at(0)?.value) / 100,
                            );
                            const date = new Date(props.payload?.at(0)?.payload.label);
  
                            return (
                              <div className={styles.tooltip}>
                                <div>
                                  <span>{'Cena: '}</span>
                                  <span>{price}</span>
                                </div>
                                <div>
                                  <span>{'Data: '}</span>
                                  <span>{date.toLocaleDateString()}</span>
                                </div>
                                <div>
                                  <span>{'Godzina: '}</span>
                                  <span>{date.toLocaleTimeString()}</span>
                                </div>
                              </div>
                            );
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          key="Data"
                          name="Cena"
                          stroke="lime"
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              :
                <div className={styles.noActionMessage}>
                  Nie ma akcji o podanym ID
                </div>
            :
              <LoadingModal
                message="Ładowanie..."
              />
          }
        </div>
        <TemplateBasicModal
          isOpened={isBuyModalOpened}
          onOutClick={() => setIsBuyModalOpened(false)}
        >
          <div>
             {/*TODO: create buy modal and fill it with mapped 'fetchData.data' object*/}
          </div>
        </TemplateBasicModal>
      </div>
    </TemplateView>
  );
};

export default ViewStockDetails;
