import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { CalendarDays, Clock, Share2 } from "lucide-react";

export default function BlogDetail() {
  const { title } = useParams(); // URL should be like /read-blog/:title
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/read-blog?title=${encodeURIComponent(title)}`)
    
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [title]);
console.log(title, 'api')
  if (!blog) return <div className="text-center mt-20">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 ">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ←
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>

      <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {blog.published_by?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{blog.published_by?.name}</div>
            <div className="text-xs text-gray-400">Author</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <CalendarDays size={16} />
          <span>Published {new Date(blog.published_on).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>

        {/* <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>5 min read</span>
        </div> */}
      </div>

      {/* <button className="flex items-center gap-2 border px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 mb-6">
        <Share2 size={16} />
        Share Article
      </button> */}

      <hr className="mb-6" />

      <div className="prose prose-lg max-w-none text-gray-800">
        {blog.body}
      </div>
    </main>
  );
}
