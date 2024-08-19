export const shortNum = (num: number) => {
  const stringOfNumber = new Map();

  stringOfNumber.set(0, "");
  stringOfNumber.set(1, "K");
  stringOfNumber.set(2, "M");
  stringOfNumber.set(3, "BN");

  const thousands = Math.floor((`${num}`.length - 1) / 3);

  const moreThousands = 1000 ** thousands;

  const str = stringOfNumber.get(thousands);
  const integer = num / moreThousands;

  return str === "M" ? integer.toFixed(1) + str : integer.toFixed(0) + str;
};
