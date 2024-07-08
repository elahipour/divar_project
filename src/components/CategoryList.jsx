import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getCategory } from "../services/admin";
import styles from "./categoryList.module.css";
import Loader from "./Loader";
import { removeCategory } from "../services/admin";

function CategoryList() {
  const queryClient=useQueryClient();
  const { data, isLoading, error } = useQuery(["getCategory"], getCategory);
const removeHandler=async(id)=>{
  const res=await removeCategory(id)
if(res.status===200)
    queryClient.invalidateQueries("getCategory")
}
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.categoryList}>
        {data?.data.map((category) => (
          <div key={category._id}>
           <div>
            <span onClick={()=>removeHandler(category._id)}>X</span>
            <img src={`${category.icon}.svg`} alt={category.icon} />
            <h5>{category.name}</h5>
           </div>
            <p>slug:{category.slug}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default CategoryList;
