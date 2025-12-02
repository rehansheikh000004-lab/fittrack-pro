import { useState } from "react";
import client from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [msg,setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/api/auth/signup", { username, email, password });
      nav("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <form className="card" onSubmit={submit}>
        <h2>Create Account</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        <button>Signup</button>
        <p className="error">{msg}</p>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
