function getUniqueProvinces(arr) {
  const uniqueProvinces = {};
  arr.forEach((item) => {
    if (!uniqueProvinces[item.provinceName]) {
      uniqueProvinces[item.provinceName] = item;
    }
  });
  return Object.values(uniqueProvinces);
}


function getUniqueCities(arr) {
  const uniqueCities = {};
  arr.forEach((item) => {
    if (!uniqueCities[item.cityName]) {
      uniqueCities[item.cityName] = item;
    }
  });
  return Object.values(uniqueCities);
}
export { getUniqueProvinces, getUniqueCities };
