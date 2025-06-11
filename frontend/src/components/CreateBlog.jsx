import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({ id: "", title: "", body: "" });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getUsernameFromToken = () => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub;
    } catch {
      return null;
    }
  };

  const fetchUserId = async () => {
    const username = getUsernameFromToken();
    try {
      const res = await axios.get(`/get-user-by-username/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(res.data.user_id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserId();
    }
  }, []);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID not loaded.");
      return;
    }
    try {
      await axios.post(
        "/create-blog",
        { ...blogData, user_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" placeholder="Blog ID" onChange={handleChange} required />
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="body" placeholder="Body" onChange={handleChange} required />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlog;
