export const TranslateRegisterErrorMessage = (messArr: string[]): string => {
  let messToRet = "Wystąpił nieoczekiwany błąd";

  if (messArr.includes("user.email is not unique")) {
    messToRet = "Istnieje użytkownik o podanym adresie email";
  }

  return messToRet;
};