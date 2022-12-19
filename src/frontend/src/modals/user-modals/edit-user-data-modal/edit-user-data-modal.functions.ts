export const TranslateEditUserDataErrorMessage = (messArr: string[]): string => {
  let messToRet = "Wystąpił nieoczekiwany błąd";

  if (messArr.includes("user.email is not unique")) {
    messToRet = "Podany adres email jest zajęty";
  }

  return messToRet;
};