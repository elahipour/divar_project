import { useQuery } from "@tanstack/react-query";
import { myPostList } from "../services/user";
import styles from "./postlist.module.css";
import Loader from "./Loader";
import { removePost } from "../services/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {sp} from '../helper/numbers'
function PostList() {
  const {  isLoading, data,error } = useQuery(["my_post_list"], myPostList);
  const queryClient=useQueryClient();

  const removePostHandler = (id) => {
    removePost(id)
      .then((res) => {toast.success("آگهی با موفقیت حذف شد.");queryClient.invalidateQueries('my_post_list')})
      .catch((error) => toast.error("مشکلی پیش آمده!"));
  };

  return (
    <>
    {isLoading ? (
      <Loader />
      ) : (
        <div className={styles.postlist}>
        {data?.data?.posts.map((post) => {
          return (
            <div key={post._id}>
              <span onClick={() => removePostHandler(post._id)}>X</span>
              <img src={`http://localhost:3000/${post.images[0]}`} />
              <p>{post.options.title}</p>
              <p>{post.options.content}</p>
              <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
              <p>{sp(post.amount)}</p>
            </div>
          );
        })
        }
        </div>
      )}
      </>
  );
}

export default PostList;
