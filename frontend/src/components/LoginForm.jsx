import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={login}>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
