export const CentsToString = (cents: number): string => {
  /*OLD VERSION - with issue while decimal number is less than 10*/
  // const realDollars = Math.trunc(cents/100);
  // const realCents = cents%100;
  //
  // console.log(cents)
  // return `${realDollars.toString()}.${realCents.toString()}`;
  
  return (cents/100).toFixed(2).toString();
};