import axios from "axios";
import { getCookie } from "./api";
import api from "./api";

const addPostHandler = (form) => {
  const formData = new FormData();
  for (let i in form) {
    formData.append(i, form[i]);
  }
  
  const token = getCookie("accessToken");
  return axios.post("http://localhost:3000/post/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`,
    },
  });
};

const myPostList = () => api.get("post/my").then((res) => res || false);
const removePost = (postId) => api.delete(`post/delete/${postId}`);

const removeAuthCookies = (coockieName) => {
  document.cookie = `${coockieName}=;max-age=-1;`;
};

export { addPostHandler, myPostList, removePost, removeAuthCookies };
