import { useEffect, useState } from "react";

const useTimerActivation = () => {
    
    const [second, setSecond] = useState(30);
    const [reqCodeStatus, setReqCodeStatus] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecond(second - 1);
    }, 1000);
    second === 0 && setReqCodeStatus(false) && clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [second]);
  return [second, setSecond, setReqCodeStatus, reqCodeStatus];
};

export { useTimerActivation };