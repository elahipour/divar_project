import styles from "../styles/page404.module.css";
import img404 from "../assets/404.png";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
function Page404() {
  const [searchParam,setSearchParam]=useSearchParams();
  useEffect(()=>{
    if(searchParam.get('cities')){
      setSearchParam({})
    }
  },[])
  return (
    <div className={styles.page404Container}>
      <div>
        <img src={img404} alt="page_not_found" />
        <h2>این راه به جایی نمی‌رسد!</h2>
        <p>به نظر آدرس را اشتباه وارد کرده‌اید.</p>
        <p>
          برای پیدا کردن مسیر درست می‌توانید سری به{" "}
          <Link to={"/"}>صفحهٔ اول دیوار</Link> بزنید.
        </p>
      </div>
    </div>
  );
}

export default Page404;
