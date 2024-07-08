import { sendOtp } from "../services/api";
import styles from "./sendotp.module.css";
import useCloseForm from "../hooks/useCloseForm";
function SendOtpForm({ mobile, setMobile, setStep }) {

const [setAuthFormClose]=useCloseForm();

  async function submitHandler(e) {
    e.preventDefault();
    if (mobile.length !== 11) return;
   await sendOtp(mobile);
    setStep(2);
  }
  return (
   
      <form onSubmit={submitHandler}>
        <div className={styles.formHeader}>
          <h3>ورود به حساب کاربری</h3>
          <span onClick={()=>setAuthFormClose(true)}>×</span>
        </div>

        <div className={styles.formBody}>
          <h4>شماره موبایل خود را وارد کنید</h4>
          <p>قبل از ثبت آگهی لطفا وارد حساب کاربری خود شوید</p>
          <p>کد تایید به این شماره پیامک می شود.</p>

          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="شماره موبایل"
          />
          <p>
            <a href="#"> شرایط استفاده از خدمات </a>و
            <a href="#">حریم خصوصی </a> دیوار را می پذیرم
          </p>
        </div>

        <div className={styles.formFooter}>
          <button type="submit">تایید</button>
        </div>
      </form>

  );
}

export default SendOtpForm;
