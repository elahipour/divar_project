import SendOtpForm from "../components/SendOtpForm";
import CheckOtpForm from "../components/CheckOtpForm";
import { useState } from "react";
import styles from "../styles/sendotp.module.css";

function Auth() {
    const [step,setStep]=useState(1);
    const [mobile,setMobile]=useState('');
    const [code,setCode]=useState('');
  return (
    <div className={styles.formContainer}>
        {step===1 && <SendOtpForm mobile={mobile} setMobile={setMobile} setStep={setStep}/>}
        {step===2 && <CheckOtpForm mobile={mobile} code={code} setCode={setCode} setStep={setStep}/>}
    </div>
  )
}

export default Auth