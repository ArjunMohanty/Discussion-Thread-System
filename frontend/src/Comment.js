import axios from "axios";
import { useState } from "react";

export default function Comment({ comment, buildTree, reload }) {
  const [reply, setReply] = useState("");

  const formatTime = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  const addReply = () => {
    if (!reply) return;

    axios.post("http://localhost:5000/comments", {
      postId: comment.postId,
      text: reply,
      parentId: comment._id
    }).then(() => {
      setReply("");
      reload();
    });
  };

  return (
    <div style={{ marginLeft: "20px", borderLeft: "2px solid #343536", paddingLeft: "10px" }}>
      <p>{comment.text}</p>

      <small style={{ color: "#818384", fontSize: "12px" }}>
        {formatTime(comment.createdAt)}
      </small>


      <small style={{ color: "#818384", fontSize: "12px", display: "block", marginTop: "4px" }}>
        Replying to this comment
      </small>

      <input
        placeholder="Reply"
        value={reply}
        onChange={e => setReply(e.target.value)}
      />
      <button onClick={addReply}>Reply</button>

      {buildTree(comment._id)}
    </div>
  );
}
