function ListItems({
  cityId,
  cityName,
  provinceId,
  countyId,
  styles,
  handleChange,
  isChecked,
}) {
  return (
    <label htmlFor={`${provinceId}${cityId}${countyId}`}>
      <p>
        <span>{cityName}</span>
        <input
          type="checkbox"
          id={`${provinceId}${cityId}${countyId}`}
          name={`${provinceId}${cityId}${countyId}`}
          className={styles.citylist_check}
          onChange={handleChange}
          checked={
            isChecked[`${provinceId}${cityId}${countyId}`] ? true : false
          }
        />
      </p>
    </label>
  );
}

export default ListItems;
