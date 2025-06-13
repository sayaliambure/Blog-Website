import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await API.post("/login", formData);
      localStorage.setItem("token", res.data.access_token);
      onLogin();
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-10">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
        {/* <p className="text-gray-600">Login to your BlogSpace account</p> */}
      </div>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
         Login
        </h2>

        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>

        {/* <div className="bg-blue-50 text-left text-sm text-gray-700 p-4 rounded-md border mt-2">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>username: <code>test</code></p>
          <p>Password: <code>123</code></p>
        </div> */}
      </div>
    </div>
  );
}
