import { useEffect, useState } from "react";

// types
import { ISelectedDataType, IStockAction, IStocksInputFields, IDataModals, ISearchOrderBy } from "./useDataTable.types";

// data
import { initialStocksInputFields, initialDataModals } from "./useDataTable.data";

function useDataTable<T>(selectedDataType: ISelectedDataType) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isEndOfData, setIsEndOfData] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<IStocksInputFields>(initialStocksInputFields);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataModals, setDataModals] = useState<IDataModals>(initialDataModals);
  const [selectedItemIdx, setSelectedItemIdx] = useState<number>(-1);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const ELEMENTS_PER_PAGE = 20;
  const additionUrl: string =
    selectedDataType === "stockActions" ? "stocks"
    : selectedDataType === "myStockActions" ? "profile/stock"
    : selectedDataType === "mySellOffers" ? "profile/sell-offers"
    : "profile/buy-offers";
  //@ts-ignore
  const API_URL = `${import.meta.env.VITE_BACKED_URL}/api/` + additionUrl;

  useEffect(() => {
    fetchData(true);
    setIsFirstRender(false);
  },[]);

  useEffect(() => {
    if (!isFirstRender) {
      onSearchClick();
    }
  },[searchInput.orderBy, searchInput.isOrderTypeAscending]);

  /* TO BE REMOVED */
  useEffect(() => {
    console.log("data length:", data.length);
  },[data]);

  const fetchData = (isStart?: boolean) => {
    // Get and change the page
    const pageToFetch = isStart ? 0 : currentPage+1;
    setCurrentPage(pageToFetch);

    // Prepare url
    const fetchUrl: string = API_URL.concat(
      `?page=${pageToFetch}`,
      `&take=${ELEMENTS_PER_PAGE}`,
      searchInput.searchField !== "" ? `&companyName=${searchInput.searchField}` : "",
      searchInput.orderBy !== "" ? `&orderBy=${searchInput.orderBy}` : "",
      `&orderType=${searchInput.isOrderTypeAscending ? "asc" : "desc"}`
    );
    /* TO BE REMOVED */
    console.log("fetchUrl:", fetchUrl);

    // Make fetch of desired page
    setIsLoading(true);
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const resData = await response.json();
        if (response.ok) {
          if (resData.length > 0) {
            let dataToAppend: T[] = [];

            if (selectedDataType === "stockActions") {
              dataToAppend = resData.map((item: any) => ({
                stockId: item.stockId,
                quantity: item.quantity,
                StockToCompany: {
                  companyId: item.StockToCompany.quantity,
                  name: item.StockToCompany.name,
                  description: item.StockToCompany.description
                },
                priceCents: item.priceCents
              } as IStockAction)) as T[];
            }
            /* TO DO - add 'else if' for other 'selectedDataType' */
            setData(prev => [
              ...prev,
              ...dataToAppend
            ]);
          }
          else {
            setIsEndOfData(true);
          }
        }
        else {
          console.log("error:", resData);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log("fatal error:", err);
      });
  };

  const onSearchClick = () => {
    if (!isLoading) {
      setIsEndOfData(false);
      setData([]);
      fetchData(true);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setSearchInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDataModalChange = (name: string, value: boolean, selItemIdx?: number) => {
    setDataModals(prev => ({
      ...prev,
      [name]: value
    }));

    const itemIdxToSet: number = (selItemIdx && value) ? selItemIdx : -1;
    setSelectedItemIdx(itemIdxToSet);
  };

  const toggleOrderBy = (orderByClicked: ISearchOrderBy) => {
    let orderByToSet: ISearchOrderBy = "";
    let ascendingValueToSet = true;

    if (searchInput.orderBy === orderByClicked) {
      if (searchInput.isOrderTypeAscending) {
        orderByToSet = orderByClicked;
        ascendingValueToSet = false;
      }
    }
    else {
      orderByToSet = orderByClicked;
    }

    setSearchInput(prev => ({
      ...prev,
      orderBy: orderByToSet,
      isOrderTypeAscending: ascendingValueToSet
    }));
  };

  return {
    data,
    fetchData,
    searchInput,
    isEndOfData,
    isLoading,
    dataModals,
    selectedItemIdx,
    handleInputChange,
    handleDataModalChange,
    toggleOrderBy,
    onSearchClick
  };
}

export default useDataTable;