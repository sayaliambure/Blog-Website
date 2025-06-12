import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CalendarDays, User } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8000/read-blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.sub);
      } catch {
        setUsername(null);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">BlogSpace</h1>
        <div className="space-x-4">
          {username ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-md hover:underline hover:decoration-blue-300 ">Hi {username}!</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload(); // refresh to update UI
              }}
              className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-sm text-gray-700 hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>
        )}

        </div>
      </header>

      {/* Hero */}
      <section className="text-center mt-24 px-4">
        <h2 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">BlogSpace</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
          Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/create" className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700">
            📝 Start Writing
          </Link>
          <Link to="/explore" className="flex items-center gap-2 border px-6 py-2 rounded-md text-gray-800 font-medium hover:bg-blue-200">
            🔍 Explore Blogs
          </Link>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="mt-32 px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Latest Blog Posts
        </h3>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Explore our collection of insightful articles, tutorials, and stories from our community of writers.
        </p>

        {/* Blog List */}
        <div className="mt-16 max-w-4xl mx-auto space-y-6 text-left">
          {blogs.length === 0 ? (
            <div className="text-center text-gray-500">
              <div className="text-5xl">📖</div>
              <p className="mt-4 text-lg font-medium">No blogs yet</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition"
              >
                <h3 className="text-2xl font-semibold mb-2 text-black-400">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {blog.body.length > 200 ? blog.body.slice(0, 200) + "..." : blog.body}
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-6 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {blog.published_by?.name || blog.published_by?.username}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    {new Date(blog.published_on).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <Link
                    to={`/read-blog/${encodeURIComponent(blog.title)}`}
                    className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-full font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
