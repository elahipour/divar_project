import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCloseForm=()=>{
const navigate=useNavigate();
const [authFormClose,setAuthFormClose]=useState(false);
useEffect(()=>{
  if(authFormClose){
    navigate("/")
  }
},[authFormClose])
return [setAuthFormClose];
}


export default useCloseForm