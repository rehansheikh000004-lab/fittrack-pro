import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="center-box">
        <h2>You are not logged in</h2>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Welcome {user.username}</h2>

      <div className="quick-links">
        <Link to="/analytics" className="btn">View Analytics</Link>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
