export const formattedDate = date => {
  const articleDate = new Date(date);
  const displayDate = `${articleDate.getDate()}/${articleDate.getMonth()}/${articleDate.getFullYear()}`;
  return displayDate;
};
