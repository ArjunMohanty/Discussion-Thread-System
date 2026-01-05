import { useEffect, useState } from "react";
import axios from "axios";
import PostView from "./PostView";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activePost, setActivePost] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");



  const loadPosts = () => {
    axios.get("http://localhost:5000/posts")
      .then(res => setPosts(res.data));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = () => {
  if (!title || !content) return;

  axios.post("http://localhost:5000/posts", { title, content })
    .then(res => {
      setTitle("");
      setContent("");
      setActivePost(res.data); 
    });
};


  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div>
    <input
      className="search"
      placeholder="Search threads..."
      onChange={e => setSearch(e.target.value)}
    />

    {!activePost && (
      <div className="card">
        <input
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="primary" onClick={createPost}>
          Create Thread
        </button>
      </div>
    )}

    {activePost ? (
      <PostView
  post={activePost}
  goBack={() => {
    setActivePost(null);
    loadPosts(); 
  }}
/>

    ) : (
      filtered.map(post => (
        <div
          key={post._id}
          className="card"
          onClick={() => setActivePost(post)}
          style={{ cursor: "pointer" }}
        >
          <div className="post-title">{post.title}</div>
          <div className="post-content">{post.content}</div>
        </div>
      ))
    )}
  </div>
);

}
