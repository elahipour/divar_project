import api from "./api";
const addCategory = (data) => api.post("category", data);
const getCategory = () => api.get("category").then(res=>res || false);
const removeCategory=(id)=>{
return api.delete(`category/${id}`);
}
export { addCategory,getCategory ,removeCategory};
