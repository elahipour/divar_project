import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

import styles from "./layout.module.css";
import { useEffect } from "react";
import { prepareForSearchParams } from "../helper/prepareForSearchParams";

import { useSearchParams } from "react-router-dom";
import SelectCities from "../components/SelectCities";

function Layout({ children, category }) {
  const [showProvinceCitiesCounties, setShowProvinceCitiesCounties] =
    useState(true);
  const [isChecked, setisChecked] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const ISCHECKED_VALUES = Object.values(isChecked);

  useEffect(() => {
    if (
      // JSON.parse(localStorage.getItem("searchQuery")) &&
      // Object.values(JSON.parse(localStorage.getItem("searchQuery"))).filter(
      //   (isMark) => isMark
      // ).length
      ISCHECKED_VALUES.filter((isMark) => isMark).length
    ) {
      setShowProvinceCitiesCounties(false);
    } else {
      setShowProvinceCitiesCounties(true);
    }
    // searchParams.get("cities") &&
    //   localStorage.setItem(
    //     "searchQuery",
    //     JSON.stringify(`cities=${searchParams.get("cities")}`)
    //   );

    // if(localStorage.getItem("markedCities") && Object.keys(JSON.parse(localStorage.getItem("markedCities"))).length)
    if (localStorage.getItem("markedCities"))
      setisChecked(JSON.parse(localStorage.getItem("markedCities")));
    const cities = prepareForSearchParams(isChecked);
    setSearchParams({ cities: cities, category: category });
  }, [searchParams, category]);

  function handleChange(e) {
    const cityName = e.target.previousElementSibling.innerText;
    const { name, checked } = e.target;
    setisChecked((isChecked) => {
      return {
        ...isChecked,
        [name]: checked ? cityName : "",
      };
    });

    if (!isChecked[name]) {
      setisChecked((isChecked) => {
        return { ...isChecked, [name]: cityName };
      });
    } else {
      const index = ISCHECKED_VALUES.indexOf(cityName);
      ISCHECKED_VALUES.splice(index, 1);
    }
  }
  function submitHandler() {
    const cities = prepareForSearchParams(isChecked);
    setSearchParams({ cities: cities });
    // if (!cities) setSearchParams({});
    setShowProvinceCitiesCounties(false);
    localStorage.setItem("markedCities", JSON.stringify(isChecked));
  }

  return (
    <>
      <Header
        setShowProvinceCitiesCounties={setShowProvinceCitiesCounties}
        showProvinceCitiesCounties={showProvinceCitiesCounties}
        city={ISCHECKED_VALUES.filter((item) => item !== "")}
      />
      {showProvinceCitiesCounties && (
        <SelectCities
          styles={styles}
          setisChecked={setisChecked}
          isChecked={isChecked}
          ISCHECKED_VALUES={ISCHECKED_VALUES}
          handleChange={handleChange}
          submitHandler={submitHandler}
          setShowProvinceCitiesCounties={setShowProvinceCitiesCounties}
          searchParams={searchParams}
        />
      )}
      {children}
      <Footer />
    </>
  );
}

export default Layout;
