function hasTheCitiesListChanged(ISCHECKED_VALUES) {
  return (
    Object.values(JSON.parse(localStorage.getItem("markedCities"))).filter(
      (city) => city !== ""
    ).length !== ISCHECKED_VALUES.filter((isMark) => isMark).length
  );
}

export default hasTheCitiesListChanged;
