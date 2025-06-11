import BlogList from "../components/BlogList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Welcome to the Blog Site</h1>
      <div className="flex justify-center gap-4 mb-6">
        <Link className="text-blue-600 underline" to="/create">Create Blog</Link>
        <Link className="text-blue-600 underline" to="/login">Login</Link>
        <Link className="text-blue-600 underline" to="/register">Register</Link>
      </div>
      <BlogList />
    </div>
  );
}
