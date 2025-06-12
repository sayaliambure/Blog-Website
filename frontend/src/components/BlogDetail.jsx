import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import ReactMarkdown from "react-markdown";
import { CalendarDays, Clock, Share2 } from "lucide-react";

export default function BlogDetail() {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/read-blog?title=${encodeURIComponent(title)}`)
     .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [title]);

  if (!blog) return <div className="text-center mt-20">Loading...</div>;
  <ReactMarkdown className="prose prose-md max-w-none text-gray-800">
    {blog.body}
  </ReactMarkdown>

  return (
    <main className="max-w-4xl mx-auto px-6 py-16"> 
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block"> 
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
        {blog.title}
      </h1>

      <div className="flex items-center gap-8 mb-8 text-base text-gray-600"> 
        <div className="flex items-center gap-3"> 
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white flex items-center justify-center font-semibold text-md"> 
            {blog.published_by?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-sm">{blog.published_by?.name}</div> 
            <div className="text-sm text-gray-400">Author</div> 
          </div>
        </div>

        <div className="flex items-center gap-1"> 
          <CalendarDays size={18} /> 
          <span>Published {new Date(blog.published_on).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>

        {/* <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>5 min read</span>
        </div>
      </div>

      <button className="flex items-center gap-3 border px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-100 mb-8">
        <Share2 size={18} />
        Share Article
      </button> */}
      </div> 

      <hr className="mb-8 border-t border-gray-200" /> 

      <div className="prose prose-md max-w-none text-gray-800 leading-relaxed whitespace-pre-line"> 
        {blog.body}
      </div>
    </main>
  );
}