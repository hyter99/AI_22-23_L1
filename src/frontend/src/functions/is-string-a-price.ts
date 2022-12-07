export const IsStringAPrice = (strNum: string): boolean => {
  const rgx = /^\d+\.?\d{0,2}$/;
  return rgx.test(strNum);
};