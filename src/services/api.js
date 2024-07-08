import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

const sendOtp = async (mobile) => {
  try {
    const res = await api.post("auth/send-otp", { mobile: mobile });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
const checkOtp = async (mobile, code) => {
  try {
    const res = await api.post("auth/check-otp", {
      mobile: mobile,
      code: code,
    });
    return { res };
  } catch (error) {
    return Promise.reject(error);
  }
};

const setCookie = (response) => {
  try {
    const { accessToken, refreshToken } = response.data;
    document.cookie = `accessToken=${accessToken}; max-age=${1 * 24 * 60 * 60}`;
    document.cookie = `refreshToken=${refreshToken}; max-age=${
      10 * 24 * 60 * 60
    }`;
  } catch (error) {
    console.log(error);
  }
};
const getCookie = (targetToken) => {
  if (!document.cookie) return null;
  const tokens = document.cookie.split(";");
  return tokens
    .find((token) => token.trim().split("=")[0] === targetToken)
    ?.split("=")[1];
};

const getNewToken = async () => {
  const token = getCookie("refreshToken");
  if (!token) return;
  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken: token,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

api.interceptors.request.use(
  (req) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) req.headers["Authorization"] = `bearer ${accessToken}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const res = await getNewToken();
      if (!res?.response) return;
      setCookie(res.response);
      return api(originalConfig);
    }
  }
);

const getProfile = () => api.get("/user/whoami").then((res) => res || false);
const getAllPost = () => api.get("/").then((res) => res || false);

export default api;
export { sendOtp, checkOtp, setCookie, getCookie, getProfile, getAllPost };
