import "./TopBar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";

function TopBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    setInterval(() => {
      window.location.href = "/login";
    }, 1300);
  };

  return (
    <div className="top-bar">
      <div className="welcome-title">
        <h2 className="title">Bem-vindo, </h2>
        {user ? (
          <span className="gradient-text home">{user.name}</span>
        ) : (
          <span>
            Você não está logado{" "}
            <Link to="/login" className="home-login">
              Fazer login
            </Link>
          </span>
        )}
      </div>

      <div className="btns-group">
        <ToggleDarkMode />
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default TopBar;
