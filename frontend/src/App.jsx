import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./components/BlogDetail";
import CreateBlog from "./components/CreateBlog";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={() => setLoggedIn(true)} />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/read-blogs/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
