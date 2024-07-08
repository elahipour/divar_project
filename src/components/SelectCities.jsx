import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getCities } from "../helper/getCities";
import ListItems from "../components/ListItems";
import { provinceCitiesCounties } from "../services/provinces_cities_counties";
import isEmptySearchQuery from "../helper/isEmptySearchQuery";
import hasTheCitiesListChanged from '../helper/hasTheCitiesListChanged';
import {
  getUniqueCities,
  getUniqueProvinces,
} from "../helper/getUniqueProvinces";
import SearchCity from "./SearchCity";

function SelectCities({
  styles,
  setisChecked,
  isChecked,
  ISCHECKED_VALUES,
  handleChange,
  submitHandler,
  setShowProvinceCitiesCounties,
  searchParams,
}) {
  const [searchCity, setSearchCity] = useState("");
  const [province, setProvince] = useState("");
  const [step, setStep] = useState(1);

  function handleStep(toStep, province) {
    setProvince(province);
    setStep(toStep);
  }

  return (
    <div className={styles.citySelectionBoxWrapper}>
      <div className={styles.citySelectionBox}>
        <div>
          <h4>انتخاب شهر</h4>
          <span
            onClick={() => {
              setisChecked({});
            }}
          >
            حذف همه
          </span>
        </div>
        <div>
          {ISCHECKED_VALUES.map((c, index) => {
            return (
              c && (
                <span key={index}>
                  <span>{c}</span>
                </span>
              )
            );
          })}
        </div>
        <SearchCity
          styles={styles}
          searchCity={searchCity}
          setSearchCity={setSearchCity}
        />

        {/* city and province container */}

        {!searchCity ? (
          <div className={styles.provinceAndCityList}>
            {step === 1 && (
              <div>
                {getUniqueProvinces(provinceCitiesCounties).map(
                  (pcc, index) => {
                    return (
                      <p
                        onClick={() => handleStep(2, pcc.provinceName)}
                        key={index}
                      >
                        <span>{pcc.provinceName}</span>
                        <MdKeyboardArrowLeft />
                      </p>
                    );
                  }
                )}
              </div>
            )}

            {step === 2 && (
              <>
                <div className={styles.backToProvinceList}>
                  <FiArrowRight size={19} />
                  <span
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    همه شهرها
                  </span>
                </div>

                <div>
                  {getUniqueCities(
                    getCities(province, provinceCitiesCounties)
                  ).map((city) => (
                    <ListItems
                      key={`${city.provinceId}${city.cityId}${city.countyId}`}
                      {...city}
                      styles={styles}
                      handleChange={handleChange}
                      isChecked={isChecked}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.provinceAndCityList}>
            {getUniqueCities(getCities("all", provinceCitiesCounties))
              .filter((city) => city.cityName.includes(searchCity))
              .map((city) => (
                <ListItems
                  key={`${city.provinceId}${city.cityId}${city.countyId}`}
                  {...city}
                  styles={styles}
                  handleChange={handleChange}
                  isChecked={isChecked}
                />
              ))}
          </div>
        )}

        <div>
          <button
            disabled={
              //isEmptySearchQuery
              isEmptySearchQuery() ? true : false
            }
            style={
              //isEmptySearchQuery
              isEmptySearchQuery()
                ? { color: "gray", border: "none", background: "#ccc" }
                : {}
            }
            onClick={() => {
              setShowProvinceCitiesCounties(false);
              if (!searchParams.get("cities")) {
                setisChecked({});
              } else if (
              hasTheCitiesListChanged(ISCHECKED_VALUES)
              )
                setisChecked(JSON.parse(localStorage.getItem("markedCities")));
            }}
          >
            انصراف
          </button>

          <button
            disabled={
              !ISCHECKED_VALUES.filter((isMark) => isMark).length ? true : false
            }
            style={
              !ISCHECKED_VALUES.filter((isMark) => isMark).length
                ? { color: "gray", border: "none", background: "#ccc" }
                : {}
            }
            onClick={submitHandler}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectCities;
