export const correctFiltersText = (text: string) => {
  return text
    ? `${text[0].toUpperCase()}${text.slice(1).replace("_", " ")}`
    : text;
};
