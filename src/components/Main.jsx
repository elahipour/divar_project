import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./main.module.css";
import { getAllPost } from "../services/api";
import Post from "./Post";
import { useSearchParams } from "react-router-dom";
function Main({ category }) {
  const { data, isLoading } = useQuery(["posts"], getAllPost);
  const [searchParam, setSearchParam] = useSearchParams();
  // console.log(data?.data?.posts[0].options.city);
  return (
    <div className={styles.main}>
      {searchParam.get("cities") &&
      data?.data?.posts
          .filter((post) => {
            return searchParam
              .get("cities")
              ?.split("-")
              .some(
                (city) =>
                  post?.options?.city?.includes(city.split(" ")[0]) &&
                  post.category === category
              );
          })
          .map((post) => <Post key={post._id} post={post} />)}
  

      {!searchParam.get("cities") &&
        data?.data?.posts.map((post) =>  post.category === category && <Post key={post._id} post={post} />)}
    </div>
  );
}

export default Main;
