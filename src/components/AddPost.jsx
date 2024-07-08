import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/admin";
import { useEffect, useState } from "react";
import { addPostHandler } from "../services/user";
import styles from "./addpost.module.css";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function AddPost() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["getCategory"], getCategory);
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: "",
  });
  useEffect(() => {
    setForm({ ...form, category: data?.data[0]["_id"] });
  }, []);
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addPostHandler(form)
      .then((res) => {
        toast.success("آگهی با موفقیت به ثبت رسید");
        queryClient.invalidateQueries("my_post_list");
      })
      .catch((error) => toast.error("مشکلی پیش آمده!"));
  };
  return (
    <form
      id={styles.addpost_form}
      onChange={changeHandler}
      onSubmit={submitHandler}
    >
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">مبلغ</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>

      <select name="category" id="category">
        {data?.data.map((category) => {
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>

      <label htmlFor="images">تصویر </label>
      <input type="file" name="images" id="images" />
      <button type="submit">ایجاد</button>
    </form>
  );
}

export default AddPost;
