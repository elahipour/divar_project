import styles from "./divarusermenu.module.css";
import { CiUser } from "react-icons/ci";
import { GoLog } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { removeAuthCookies } from "../services/user";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";


function DivarUserMenu() {
const [searchParam,setSearchParam]=useSearchParams()
  const queryClient = useQueryClient();
  const { data, } = useQuery(["profile"], getProfile);
  const removeAuths = () => {
    removeAuthCookies("accessToken");
    removeAuthCookies("refreshToken");
    queryClient.invalidateQueries("my_post_list");
  };
  return (
    <div className={styles.usermenu}>
      <ul>
        
      {location.pathname!=='/admin' && <li>
          <CiUser size={20} />
          {data?.data?.role === "ADMIN"  ? (
            <Link to={"/admin"}>پنل ادمین</Link>
          ) : (
            <Link to={"/dashboard"}>دیوار من</Link>
          )}
        </li>
          }
        {
           data?.data?.role !== "ADMIN" && location.pathname!=='/dashboard' && <li>
          <GoLog size={20} />
          <Link to={"/dashboard"}>آگهی های من</Link>
        </li>
        }
       {
       data && <li>
          <MdLogout size={20} />
          <Link onClick={removeAuths} to={"/"}>
            خروج
          </Link>
        </li>
}
      </ul>
    </div>
  );
}

export default DivarUserMenu;
