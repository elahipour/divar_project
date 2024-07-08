import { useSearchParams } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function Homepage({setCategory,category}) {
  const homepage_body = {
    display: "flex",
    gap: "25px",
  };
const callback=()=>{
  
}
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [category, setCategory] = useState("");
  // useEffect(() => {
  // setSearchParams(JSON.parse(localStorage.getItem("searchQuery")))
  // }, [])

  
  return (
    <div style={homepage_body}>
      <Sidebar setCategory={setCategory}/>
      <Main category={category}/>
    </div>
  );
}

export default Homepage;
