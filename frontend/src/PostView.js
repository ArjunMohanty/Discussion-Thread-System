import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

export default function PostView({ post, goBack }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

 const formatTime = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


  const loadComments = () => {
    axios.get(`http://localhost:5000/comments/${post._id}`)
      .then(res => setComments(res.data));
  };

  useEffect(() => {
    loadComments();
  }, [post._id]);

  const addComment = () => {
    if (!text) return;

    axios.post("http://localhost:5000/comments", {
      postId: post._id,
      text,
      parentId: null
    }).then(() => {
      setText("");
      loadComments();
    });
  };

  const deletePost = async () => {
    const confirmDelete = window.confirm("Delete this thread?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/posts/${post._id}`);
      goBack();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. Check console.");
    }
  };

  const buildTree = (parentId = null) =>
    comments
      .filter(c => String(c.parentId) === String(parentId))
      .map(c => (
        <Comment
          key={c._id}
          comment={c}
          reload={loadComments}
          buildTree={buildTree}
        />
      ));

  return (
    <div>
      <button className="secondary back-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="card">
        <div className="post-header">
          <div>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.content}</div>

            <small style={{ color: "#818384" }}>
              Posted on {formatTime(post.createdAt)}
            </small>

          </div>

          <button
            className="delete-icon"
            onClick={deletePost}
            title="Delete thread"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="card">
        <input
          placeholder="Add comment"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="primary" onClick={addComment}>
          Comment
        </button>
      </div>

      {buildTree()}
    </div>
  );
}
