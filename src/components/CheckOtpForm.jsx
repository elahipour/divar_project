import { useNavigate } from "react-router-dom";
import { checkOtp, setCookie } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";
import styles from "./sendotp.module.css";
import { sendOtp } from "../services/api";
import { useTimerActivation } from "../hooks/useTimerActivation";
import useCloseForm from "../hooks/useCloseForm";


function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const [second, setSecond, setReqCodeStatus, reqCodeStatus] =
    useTimerActivation();
  const [setAuthFormClose] = useCloseForm();
  const navigate = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  async function submitHandler(e) {
    e.preventDefault();
    if (code.length === 5) {
      const { res, error } = await checkOtp(mobile, code);
      if (res) {
        setCookie(res);
        if (data && data.data.role === "ADMIN") {
          refetch(["profile"]);
          navigate("/admin");
        } else {
          refetch(["profile"]);
          navigate("/dashboard");
        }
      }
    }
  }
  return (
   
      <form onSubmit={submitHandler}>
        <div className={styles.formHeader}>
          <h3>ورود به حساب کاربری</h3>
          <span onClick={() => setAuthFormClose(true)}>×</span>
        </div>

        <div className={styles.formBody}>
          <h4>کد تأیید را وارد کنید</h4>
          <p>کد پیامک‌ شده به شمارۀ «{mobile}» را وارد کنید.</p>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="کد تایید 6 رقمی"
          />
          <p>
            <a className={styles.changeMobileNumber} onClick={() => setStep(1)}>
              تغییر شماره موبایل
            </a>
          </p>
        </div>

        <div className={styles.formFooter}>
          <div className={styles.formFooterButton_checkotp}>
            {reqCodeStatus ? (
              <span>درخواست مجدد {second}</span>
            ) : (
              <button
                onClick={async () => {
                  await sendOtp(mobile);
                  setReqCodeStatus(true);
                  setSecond(30);
                }}
              >
                درخواست کد
              </button>
            )}
            <button type="submit">ورود</button>
          </div>
        </div>
      </form>

  );
}

export default CheckOtpForm;
