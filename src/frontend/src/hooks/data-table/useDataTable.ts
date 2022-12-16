import { useEffect, useState } from "react";

// types
import {
  ISelectedDataType,
  IStockAction,
  IStocksInputFields,
  IDataModals,
  ISearchOrderBy,
  IMyStockAction, IMyOfferAction, StockStatusEnum
} from "./useDataTable.types";

// data
import { initialStocksInputFields, initialDataModals } from "./useDataTable.data";
import { environment } from "../../constants/environment-variables";

// redux
import { useTypedSelector } from "../useTypedSelector";

function useDataTable<T>(selectedDataType: ISelectedDataType) {  
  const FIRST_PAGE_NUM = 1;
  const ELEMENTS_PER_PAGE = 20;
  const ADDITION_URL: string =
    selectedDataType === "stockActions" ? "companies"
    : selectedDataType === "myStockActions" ? "profile/stock"
    : selectedDataType === "mySellOffers" ? "profile/sell-offers"
    : "profile/buy-offers";
  
  const API_URL = `${environment.backendUrl}/api/` + ADDITION_URL;
  
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE_NUM);
  const [isEndOfData, setIsEndOfData] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<IStocksInputFields>(initialStocksInputFields);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataModals, setDataModals] = useState<IDataModals>(initialDataModals);
  const [selectedItemIdx, setSelectedItemIdx] = useState<number>(-1);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  
  const {accessToken} = useTypedSelector(state => state.login.loginData);
  
  useEffect(() => {
    setData([]);
    setIsEndOfData(false);
    setSearchInput(initialStocksInputFields);
    setDataModals(initialDataModals);
    setSelectedItemIdx(-1);
    setIsFirstRender(false);
    fetchData(true);
    
    //console.log("API_URL:", API_URL);
  },[selectedDataType]);

  useEffect(() => {
    if (!isFirstRender) {
      onSearchClick();
    }
  },[searchInput.orderBy, searchInput.isOrderTypeAscending, searchInput.status]);

  /* TO BE REMOVED */
  useEffect(() => {
    console.log("data:", data);
  },[data]);

  const fetchData = (isStart?: boolean) => {
    // Get and change the page
    const pageToFetch = isStart ? FIRST_PAGE_NUM : currentPage+1;
    setCurrentPage(pageToFetch);

    // Prepare url with queryParams
    const fetchUrl: string = API_URL.concat(
      `?page=${pageToFetch}`,
      `&take=${ELEMENTS_PER_PAGE}`,
      searchInput.searchField !== "" ? `&companyName=${searchInput.searchField}` : "",
      searchInput.status !== StockStatusEnum.ALL_OFFERS ? `&status=${searchInput.status}` : "",
      // There is other 'orderBy' name for 'price' in 'sell-offers' and 'buy-offers' views
      searchInput.orderBy !== "" ?
        `&orderBy=${
          selectedDataType === "myBuyOffers" ?
            searchInput.orderBy === "priceCents" ?
              "unitBuyPriceCents"
            :
              searchInput.orderBy
          : selectedDataType === "mySellOffers" ?
              searchInput.orderBy === "priceCents" ?
                "unitSellPriceCents"
              :
                searchInput.orderBy
          : selectedDataType === "myStockActions" ?
            searchInput.orderBy === "quantity" ?
              "stockQuantity"
            :
              searchInput.orderBy
          :
            searchInput.orderBy
        }`
      :
        "",
      `&orderType=${searchInput.isOrderTypeAscending ? "asc" : "desc"}`
    );
    /* TO BE REMOVED */
    console.log("fetchUrl:", fetchUrl);

    // Prepare headers for fetch
    const fetchHeaders: any = {
      'Content-Type': 'application/json'
    }
    
    if (selectedDataType !== "stockActions") {
      fetchHeaders["Authorization"] = `Bearer ${accessToken}`;
    }
    
    // Make fetch of desired page
    setIsLoading(true);
    fetch(fetchUrl, {
      method: 'GET',
      headers: fetchHeaders
    })
      .then(async response => {
        const resData = await response.json();
        if (response.ok) {
          if (resData.length > 0) {
            let dataToAppend: T[] = [];
            
            // Create proper data object (based on 'selectedDataType')
            if (selectedDataType === "stockActions") {
              dataToAppend = resData.map((item: any) => ({
                companyId: item.companyId,
                quantity: item.quantity,
                description: item.description,
                name: item.name,
                priceCents: item.priceCents
              } as IStockAction)) as T[];
            }
            else if (selectedDataType === "myStockActions") {
              dataToAppend = resData.map((item: any) => ({
                userStockId: item.userStockId,
                stockQuantity: item.stockQuantity,
                priceCents: item.priceCents,
                Company: {
                  companyId: item.Company.companyId,
                  name: item.Company.name,
                  description: item.Company.description
                }
              } as IMyStockAction)) as T[];
            }
            else {// (selectedDataType === "myBuyOffers" || selectedDataType === "mySellOffers")
              dataToAppend = resData.map((item: any) => ({
                offerId: selectedDataType === "myBuyOffers" ? item.buyOfferId : item.sellOfferId,
                companyId: selectedDataType === "myBuyOffers" ? item.companyId : item.userStockId,
                unitPriceCents: selectedDataType === "myBuyOffers" ? item.unitBuyPriceCents : item.unitSellPriceCents,
                quantity: item.quantity,
                created: item.created,
                status: item.status,
                name: selectedDataType === "myBuyOffers" ? item.Company.name : item.UserStock.Company.name
              } as IMyOfferAction)) as T[];
            }
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
      })
      .catch(err => {
        console.log("fatal error:", err);
      })
      .finally( () => {
        setIsLoading(false);
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
    let valueToSet: string | number = value;
    if (name === "status") {
      valueToSet = parseInt(valueToSet);
    }
    
    setSearchInput(prev => ({
      ...prev,
      [name]: valueToSet
    }));
  };
  
  // useEffect(() => {
  //   console.log("searchInput", searchInput);
  // },[searchInput]);

  const handleDataModalChange = (
    name: "isBuyModalOpen" | "isSellModalOpen" | "isDeclineModalOpen",
    value: boolean,
    selItemIdx?: number
  ) => {
    setDataModals(prev => ({
      ...prev,
      [name]: value
    }));
    
    const itemIdxToSet: number = ((selItemIdx !== undefined) && value) ? selItemIdx : -1;
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
  
  const removeItemAtIndex = (idx: number) => {
    if (idx >= 0) {
      const shallowData = [...data];
      shallowData.splice(idx,1);
      setData(shallowData);
    }
  };

  return {
    data,
    fetchData,
    searchInput,
    isEndOfData,
    isLoading,
    dataModals,
    selectedItemIdx,
    currentPage,
    handleInputChange,
    handleDataModalChange,
    toggleOrderBy,
    onSearchClick,
    removeItemAtIndex
  };
}

export default useDataTable;