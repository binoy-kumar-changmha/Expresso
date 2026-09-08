import { useContext } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import DefaultMessage from "./DefaultMessage";
import LoadingState from "./LoadingState";

function PostList() {
  const { postList, fetching } = useContext(PostListContext);

  return (
    <>
      {fetching && <LoadingState />}
      {!fetching && postList.length === 0 && <DefaultMessage />}
      <div className="d-flex flex-wrap gap-4 px-4 pt-5 pb-4 justify-content-center">
        {!fetching && postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostList