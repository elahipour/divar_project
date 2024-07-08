import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

function Chat() {
    const [searchParam,setSearchParam]=useSearchParams();
    useEffect(()=>{
      const searchParamValue=JSON.parse(localStorage.getItem('searchQuery'))?.split("=")[1];
      if(searchParamValue)
      setSearchParam({cities:searchParamValue})
    },[])
  return (
    <div>Chat</div>
  )
}

export default Chat