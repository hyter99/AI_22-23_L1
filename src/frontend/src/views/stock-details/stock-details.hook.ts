import { useState } from "react";

// hooks
import { useFetch } from '../../hooks/useFetch';

// controller class
import type { StockController } from '../../../../backend/modules/company/company.controller';

type StockGetOne = Awaited<
  ReturnType<typeof StockController['prototype']['getOne']>
>;

const useStockDetails = (id: string) => {
  const priceFormatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  });

  const stockFetch = useFetch<StockGetOne>(`stocks/${id}`);

  const mappedData = stockFetch.data?.Company.StockPriceHistory.map((item) => {
    return {
      label: item.changeDate,
      value: item.priceCents,
    };
  });
  //console.log("stockFetch:", stockFetch);
  const [isBuyModalOpened, setIsBuyModalOpened] = useState<boolean>(false);

  return {
    priceFormatter,
    stockFetch,
    mappedData,
    isBuyModalOpened,
    setIsBuyModalOpened
  };
};

export default useStockDetails;