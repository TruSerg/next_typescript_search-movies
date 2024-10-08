export const getTimeFromMins = (mins: number) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  if (!minutes) {
    return `${hours}ч`;
  } else if (!hours) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};
