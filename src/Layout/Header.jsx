import styles from "./header.module.css";
import { IoMdHelpBuoy } from "react-icons/io";
import { PiChatCircle } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import divarIcon from "../assets/top_menu_icons/divarIcon.svg";
import { Link, useSearchParams } from "react-router-dom";
import DivarUserMenu from "../components/DivarUserMenu";
import { useEffect, useState } from "react";
function Header({
  setShowProvinceCitiesCounties,
  showProvinceCitiesCounties,
  city,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    if (!city.length) {
      setShowProvinceCitiesCounties(true);
    }
  }, []);

  return (
    <header>
      <nav className={styles.topmenu}>
        <ul className={styles.topmenu_rightsection}>
          <li>
            <Link
              to={`${
                JSON.parse(localStorage.getItem("searchQuery"))?.split("=")[1]
                  ? `/?cities=${searchParam.get("cities")}`
                  : "/"
              }`}
            >
              <img src={divarIcon} width={50} alt="دیوار" />
            </Link>
          </li>
          |
          <li onClick={() => setShowProvinceCitiesCounties(true)}>
            <CiLocationOn size={20} />
            <>
              {!showProvinceCitiesCounties ? (
                !city.length ? (
                  <span>انتخاب شهر</span>
                ) : city.length === 1 ? (
                  <span>{city[0]}</span>
                ) : (
                  <span>{city.length} شهر</span>
                )
              ) : (
                "درحال انتخاب شهر"
              )}
            </>
          </li>
        </ul>

        <ul className={styles.topmenu_leftsection}>
          <li
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <CiUser size={20} />
            <span>دیوار من</span>
            {showMenu && <DivarUserMenu />}
          </li>
          <li>
            <PiChatCircle size={20} />
            <Link to={"/chat"}>چت</Link>
          </li>
          <li>
            <IoMdHelpBuoy size={20} />
            <Link to={"/support"}>پشتیبانی</Link>
          </li>
          <li>
            <Link to={"/dashboard"} className={styles.ad_register}>
              ثبت آگهی
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
