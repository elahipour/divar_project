import { sp } from "../helper/numbers";
function Post({ post }) {
  return (
    <div>
      <img src={`http://localhost:3000/${post.images[0]}`} />
      <div>
        <h3>{post.options.title}</h3>

        <div>
          <p>{sp(post.amount)} تومان</p>
          <p>در {post.options.city}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
