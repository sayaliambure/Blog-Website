import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { CalendarDays, User } from "lucide-react";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/read-blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Latest Blog Posts</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our collection of insightful articles, tutorials, and stories from our community of writers.
        </p>

        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition">
             {/* <div key={index} className="bg-white border-l-4 border-blue-500 p-6 rounded-lg shadow flex justify-between items-start hover:shadow-md transition"> */}
            
              <h3 className="text-2xl font-semibold mb-2 text-blue-700">
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
          ))}
        </div>
      </div>
    </section>
  );
}
