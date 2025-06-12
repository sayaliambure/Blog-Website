import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({ title: "", body: "" });
  const [username, setUsername] = useState(null);
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const extractedUsername = getUsernameFromToken();
      if (!extractedUsername) {
        alert("Invalid token. Please login again.");
        navigate("/login");
      } else {
        setUsername(extractedUsername);
      }
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Username not found. Please log in.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    try {
      await axios.post(
        "/create-blog",
        { ...blogData, username, published_on: today, },
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
  
    <div className="min-h-screen bg-white px-6 py-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <input
          name="title"
          placeholder="Title"
          className="w-full text-4xl font-bold border-none outline-none mb-6 placeholder-gray-500 bg-gradient-to-br from-blue-50 to-purple-50"
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Write your blog here..."
          className="w-full min-h-[75vh] text-lg border-none outline-none placeholder-gray-400 bg-gradient-to-br from-blue-50 to-purple-50 resize-none"
          onChange={handleChange}
          required
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
