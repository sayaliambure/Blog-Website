import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/read-blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // return (
  //   <div>
  //     <h2>All Blogs</h2>
  //     {blogs.map((blog) => (
  //       <div key={blog.id}>
  //         <Link to={`/read-blogs/${blog.id}`}>
  //           <h3>{blog.title}</h3>
  //         </Link>
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
  <div className="max-w-2xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
    {blogs.map((blog) => (
      <div key={blog.id} className="border-b py-4">
        <Link to={`/read-blogs/${blog.id}`} className="text-blue-600 hover:underline">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
        </Link>
      </div>
    ))}
  </div>
);
}
