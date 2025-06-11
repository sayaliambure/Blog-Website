import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function BlogDetail() {
  const { title } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/read-blog/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => alert("Blog not found"));
  }, [id]);

  const deleteBlog = async () => {
    try {
      await API.delete(`/delete-blog/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Blog deleted.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Unauthorized or error");
    }
  };

  return blog ? (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
      <button onClick={deleteBlog}>Delete</button>
    </div>
  ) : (
    <p>Loading blog...</p>
  );
}
