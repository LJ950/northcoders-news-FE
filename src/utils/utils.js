export const formattedDate = date => {
  const articleDate = new Date(date);
  const displayDate = `${articleDate.getDate()}/${articleDate.getMonth()}/${articleDate.getFullYear()}`;
  return displayDate;
};

export const disableVote = (user, voted, author) => {
  if (!voted && user.username && user.username !== author) return false;
  else return true;
};

export const author = (user, author) => {
  if (user === author) return true;
};
