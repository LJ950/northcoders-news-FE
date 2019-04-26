export const formattedDate = date => {
  const articleDate = new Date(date);
  const displayDate = `${articleDate.getDate()}/${articleDate.getMonth()}/${articleDate.getFullYear()}`;
  return displayDate;
};

export const disableVote = (loggedIn, voted) => {
  // if (loggedIn && !voted) return false;
  // else return true;
  if (loggedIn) return false;
  else return true;
};
