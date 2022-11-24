import {useState, useEffect} from "react";
import { useParams } from "react-router";

// enums
import { MyProfilePagesEnum } from "./my-profile-content.data";
import { MyProfileAvailableUrlEnum } from "../my-profile.data";

// functions
import {translateEngPlMyProfilePageName} from "../../../functions/translate-pl-eng-my-profile-page-name";
import {translatePlEngMyProfilePageName} from "../../../functions/translate-eng-pl-my-profile-page-name";
import { changeUrlSuffix } from "../../../functions/change-url-suffix";

const useMyProfileContent = () => {
  const [selectedPage, setSelectedPage] = useState<MyProfilePagesEnum>(MyProfilePagesEnum.DATA);
  const {page_name = MyProfileAvailableUrlEnum.DATA} = useParams<{page_name: MyProfileAvailableUrlEnum}>();
  
  // Set selectPage at beginning from url
  useEffect(() => {
    // Get url from parameter
    const translatedPageName = translatePlEngMyProfilePageName(page_name);
    setSelectedPage(translatedPageName);
  },[]);
  
  // Change url at every selectedPage state change
  useEffect(() => {
    establishNewUrlSuffix();
  },[selectedPage]);
  
  // Custom establishment function with previous translation of selectedPage state
  const establishNewUrlSuffix = () => {
    changeUrlSuffix(translateEngPlMyProfilePageName(selectedPage));
  };
  
  return {
    selectedPage,
    setSelectedPage
  };
};

export default useMyProfileContent;