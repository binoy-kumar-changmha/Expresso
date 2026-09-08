import { createContext, useReducer, useState, useEffect } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => { },
  deletePost: () => { },
  toggleReaction: () => { },
  addComment: () => { },
  fetching: false,
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "TOGGLE_REACTION") {
    newPostList = currPostList.map((post) => {
      if (post.id === action.payload.postId) {
        if (post.isLiked) {
          return { ...post, reactions: post.reactions - 1, isLiked: false };
        } else {
          return { ...post, reactions: post.reactions + 1, isLiked: true };
        }
      }
      return post;
    });
  } else if (action.type === "ADD_COMMENT") {
    newPostList = currPostList.map((post) => {
      if (post.id === action.payload.postId) {
        return {
          ...post,
          comments: [...(post.comments || []), action.payload.commentText]
        };
      }
      return post;
    });
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer,[]);
  const [fetching, setFetching] = useState(false);


  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  const toggleReaction = (postId) => {
    dispatchPostList({
      type: "TOGGLE_REACTION",
      payload: {
        postId,
      },
    });
  };

  const addComment = (postId, commentText) => {
    dispatchPostList({
      type: "ADD_COMMENT",
      payload: {
        postId,
        commentText
      }
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: { posts },
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then(data => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    }
  }, []);

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost, toggleReaction, addComment, fetching}}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
