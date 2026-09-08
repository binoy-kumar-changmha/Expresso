import { useContext, useState, useRef, useEffect } from "react";
import { PostListContext } from "../store/post-list-store";
import styles from "./Post.module.css";
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaPaperPlane } from "react-icons/fa";

function Post({ post }) {
  const { deletePost, toggleReaction, addComment } = useContext(PostListContext);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // I don't know useRef yet, for later

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText(""); 
    }
  };

  const comments = post.comments || [];

  return (
    <div className={`card mb-4 rounded-3 ${styles.fbCard}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between p-3`}>
        <div className="d-flex align-items-center gap-2">
          <div className={styles.avatar}>
            <img src={`https://ui-avatars.com/api/?name=User+${post.userId}&background=random`} alt="Avatar" />
          </div>
          <div className="d-flex flex-column" style={{ lineHeight: '1.2' }}>
            <span className="fw-bold" style={{ fontSize: '0.95rem' }}>User {post.userId}</span>
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>Just now</span>
          </div>
        </div>
        
        <div className="position-relative" ref={dropdownRef}>
          <button 
            className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaEllipsisH className="text-secondary" />
          </button>
          
          {showDropdown && (
            <div className={`dropdown-menu show shadow-sm border-0 ${styles.dropdownMenu}`}>
              <button 
                className="dropdown-item text-danger fw-semibold d-flex align-items-center gap-2"
                onClick={() => deletePost(post.id)}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`px-3 pb-2 ${styles.fbBody}`}>
        <p className="card-text mb-0" style={{ fontSize: "0.95rem" }}>
          {post.body}
        </p>
      </div>

      {/* Reactions & Comments Count Bar */}
      {(post.reactions?.likes > 0 || comments.length > 0) && (
        <div className="px-3 py-2 d-flex align-items-center justify-content-between text-muted border-bottom mx-3" style={{ fontSize: "0.9rem" }}>
          <div className="d-flex align-items-center">
            {post.reactions?.likes > 0 && (
              <>
                <span className="bg-danger rounded-circle p-1 d-flex align-items-center justify-content-center me-2" style={{ width: "20px", height: "20px" }}>
                  <FaHeart className="text-white" size={10} />
                </span>
                {post.reactions.likes}
              </>
            )}
          </div>
          <div className="d-flex align-items-center hover-underline" style={{ cursor: "pointer" }} onClick={() => setShowComments(true)}>
            {comments.length > 0 && (
              <span>
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex align-items-center justify-content-between px-3 py-1 mt-1">
        <button
          onClick={() => toggleReaction(post.id)}
          className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 rounded-2 ${post.isLiked ? 'text-danger' : 'text-secondary'} ${styles.actionBtn}`}
        >
          {post.isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Love</span>
        </button>

        <button 
          className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 rounded-2 text-secondary ${styles.actionBtn}`}
          onClick={() => setShowComments(!showComments)}
        >
          <FaRegComment size={18} />
          <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Comment</span>
        </button>

        <button className={`btn flex-fill d-flex align-items-center justify-content-center gap-2 rounded-2 text-secondary ${styles.actionBtn}`}>
          <FaShare size={18} />
          <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-3 border-top bg-white rounded-bottom-3">
          {comments.length > 0 && (
            <div className="mb-3 d-flex flex-column gap-2">
              {comments.map((comment, index) => (
                <div key={index} className="d-flex gap-2">
                  <div className={styles.smallAvatar}>
                    <img src={`https://ui-avatars.com/api/?name=Guest&background=random`} alt="Avatar" />
                  </div>
                  <div className="bg-light p-2 rounded-4" style={{ fontSize: '0.9rem' }}>
                    <span className="fw-bold d-block" style={{ fontSize: '0.85rem' }}>Guest User</span>
                    {comment}
                  </div>
                </div>
              ))}
            </div>
          )}

          <form className="d-flex align-items-center gap-2" onSubmit={handleCommentSubmit}>
            <div className={styles.smallAvatar}>
              <img src={`https://ui-avatars.com/api/?name=Me&background=0D8ABC&color=fff`} alt="Me" />
            </div>
            <div className="d-flex align-items-center flex-fill bg-light rounded-pill px-3 py-1">
              <input 
                type="text" 
                className="form-control bg-transparent border-0 shadow-none p-1"
                placeholder="Write a comment..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ fontSize: '0.9rem' }}
              />
              <button 
                type="submit" 
                className={`btn btn-link text-primary p-1 text-decoration-none ${commentText.trim() ? '' : 'disabled'}`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;