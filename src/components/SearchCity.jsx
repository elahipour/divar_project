
import { CiSearch } from "react-icons/ci";

function SearchCity({styles,searchCity,setSearchCity}) {
    function searchHandler(e) {
        const value = e.target.value;
        setSearchCity(value);
      }
  return (
    <>
      <div>حداقل یک شهر انتخاب کنید</div>
      <div className={styles.searchBox}>
        <input
          type="text"
          id="input"
          onChange={searchHandler}
          value={searchCity}
        />
        <i>
          <label htmlFor="input">
            <CiSearch size={20} />
          </label>
        </i>
      </div>
    </>
  );
}

export default SearchCity;
