import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { addPost } = useContext(PostListContext);
  const postBodyElement = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const postBody = postBodyElement.current.value;
    postBodyElement.current.value = ""; // this automatically clears after submitting the form

    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: postBody,
        userId: 181, // hardcoded
      })
    })
      .then(res => res.json())
      .then(post => { addPost(post); navigate("/"); });
  };

  return (
    <div className={`d-flex justify-content-center align-items-center p-4 ${styles.container}`}>

      <form className={`card p-5 shadow-lg border-0 rounded-4 ${styles.formCard}`} onSubmit={handleSubmit}>
        <h3 className="mb-4 fw-bold text-center text-primary">Create New Post</h3>

        <div className="mb-4">
          <label htmlFor="body" className="form-label fw-semibold text-secondary">
            Post Description
          </label>
          <textarea
            ref={postBodyElement}
            rows="5"
            className={`form-control form-control-lg bg-light ${styles.textArea}`}
            id="body"
            placeholder="What's on your mind?"
            required
          />
        </div>

        <button type="submit" className={`btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm ${styles.submitBtn}`}>
          Upload Post
        </button>
      </form>

    </div>
  );
}

export default CreatePost;