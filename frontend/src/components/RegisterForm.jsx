import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ id: "", username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/create-user", formData);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" placeholder="ID" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
