import styles from './stock-details.module.scss';

import TemplateView from '../../templates/view/view.template';
import { useParams } from 'react-router';
import type { StockController } from '../../../../backend/modules/stock/stock.controller';
import { useFetch } from '../../hooks/useFetch';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type StockGetOne = Awaited<
  ReturnType<typeof StockController['prototype']['getOne']>
>;

const priceFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
});

const ViewStockDetails: React.FC<{ appVersion: string; isLogged?: boolean }> = (
  props,
) => {
  const { id = '' } = useParams<{ id: string }>();

  const stockFetch = useFetch<StockGetOne>(`stocks/${id}`);

  const mappedData = stockFetch.data?.Company.StockPriceHistory.map((item) => {
    return {
      label: item.changeDate,
      value: item.priceCents,
    };
  });

  const handleBuyButtonClick = () => {
    // TODO: show modal
  };

  return (
    <TemplateView
      appVersion={props.appVersion}
      viewTitle="Szczegóły akcji X"
      isLogged={props.isLogged}
    >
      <div className={styles.backdrop}>
        <div className={styles.panel}>
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
          <div id="stock-buy-button" className={styles.buyButton}>
            <button
              id="stock-buy-button"
              className={styles.button}
              onClick={handleBuyButtonClick}
            >
              Kup
            </button>
          </div>
          <div id="stock-history" className={styles.stockHistory}>
            <div className={styles.label}>
              Historia zmian ceny jednostkowej:
            </div>
            <ResponsiveContainer width="100%">
              <LineChart
                data={mappedData}
                margin={{
                  top: 5,
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
        </div>
      </div>
    </TemplateView>
  );
};

export default ViewStockDetails;
