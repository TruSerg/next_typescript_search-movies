export const replaceCurrencyByComma = (currency: number) =>
  currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
