import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";


export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${POST_ID}`)
      .then(res => setPost(res.data));

    axios.get(`http://localhost:5000/comments/${POST_ID}`)
      .then(res => setComments(res.data));
  }, []);

  const addComment = () => {
    axios.post("http://localhost:5000/comments", {
      postId: POST_ID,
      text,
      parentId: null
    });
  };

  const buildTree = (parentId = null) =>
    comments
      .filter(c => c.parentId === parentId)
      .map(c => (
        <Comment key={c._id} comment={c} buildTree={buildTree} />
      ));

  if (!post) return null;

 return (
  <div className="comment">
    <p>{comment.text}</p>

    <input
      placeholder="Reply"
      value={reply}
      onChange={e => setReply(e.target.value)}
    />
    <button className="secondary" onClick={addReply}>
      Reply
    </button>

    {buildTree(comment._id)}
  </div>
);

}
