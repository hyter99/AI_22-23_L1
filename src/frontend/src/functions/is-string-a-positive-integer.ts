export const IsStringAPositiveInteger = (strNum: string): boolean => {
  const num = Number(strNum);
  
  return Number.isInteger(num) && num > 0;
};