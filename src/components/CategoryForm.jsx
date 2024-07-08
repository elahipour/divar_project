import { useState } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../services/admin";
import styles from "../styles/admin.module.css";
import Loader from "./Loader";
function CategoryForm() {
  const queryClient=useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const { mutate, isLoading,isError, error, data } = useMutation(addCategory,{onSuccess:()=>queryClient.invalidateQueries('getCategory')});
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) {
      return;
    }
    mutate(form);
  };
  console.log({ data, isLoading, error });
  return (
    <form onChange={changeHandler} onSubmit={submitHandler}>
      <h3>دسته بندی جدید</h3>
     
        {isLoading && <Loader />}
        {data?.status === 201 && (
          <div className={styles.setCategorySuccess}>
            <span>ثبت موفق</span>
          </div>
        ) }
        {!!error && (
          <div className={styles.setCategoryFailed}>
            <span>ثبت ناموفق </span>
          </div>
        )}
   
      <div>
        <label htmlFor="name">اسم دسته بندی</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="slug">اسلاگ</label>
        <input type="text" name="slug" id="slug" />
      </div>
      <div>
        <label htmlFor="icon">آیکون</label>
        <input type="text" name="icon" id="icon" />
      </div>
      <button type="submit" disabled={isLoading}>ایجاد</button>
    </form>
  );
}

export default CategoryForm;
