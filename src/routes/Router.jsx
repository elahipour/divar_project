import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";
import Page404 from "../pages/Page404";
import Admin from "../pages/Admin";
import Loader from "../components/Loader";
import { useEffect } from "react";
import Chat from "../pages/Chat";

function Router({setCategory,category}) {
  const { data, isLoading } = useQuery(["profile"], getProfile);
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    const searchParamValue = JSON.parse(
      localStorage.getItem("searchQuery")
    )?.split("=")[1];
    if (searchParamValue) setSearchParam({ cities: searchParamValue });
  }, [location]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Homepage setCategory={setCategory} category={category}/>} />
          <Route
            path="/auth"
            element={
              !data ? (
                <Auth />
              ) : data.data.role === "USER" ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <Navigate to={"/admin"} />
              )
            }
          />
          <Route
            path={"/dashboard"}
            element={
              !data ? (
                <Auth />
              ) : data.data.role === "ADMIN" ? (
                <Navigate to={"/admin"} />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            path="/admin"
            element={
              data && data.data.role === "ADMIN" ? (
                <Admin />
              ) : data && data.data.role === "USER" ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <Navigate to={"/auth"} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              data && data.data.role === "USER" ? (
                <Chat />
              ) : (
               <Auth/>
              )
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
