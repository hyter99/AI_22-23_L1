export const CentsToString = (cents: number): string => {
  const realDollars = Math.trunc(cents/100);
  const realCents = cents%100;

  return `${realDollars.toString()}.${realCents.toString()}`;
};