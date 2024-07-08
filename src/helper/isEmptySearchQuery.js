function isEmptySearchQuery() {
  return (
    !localStorage.getItem("markedCities") ||
    !Object.values(JSON.parse(localStorage.getItem("markedCities"))).filter(
      (isMark) => isMark
    ).length
  );
}

export default isEmptySearchQuery;
