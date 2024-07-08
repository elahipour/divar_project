function getCities(province, allCities) {
  if(province==='all')return allCities;
  return allCities.filter((cities) => cities.provinceName === province);
}

export { getCities };
