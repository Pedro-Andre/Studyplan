// import "./TopBar.css";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";

// function TopBar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);

//     setInterval(() => {
//       window.location.href = "/login";
//     }, 1300);
//   };

//   return (
//     <div className="top-bar">
//       <div className="welcome-title">
//         <h2 className="title">Bem-vindo, </h2>
//         {user ? (
//           <span className="gradient-text home">{user.name}</span>
//         ) : (
//           <span>
//             Você não está logado{" "}
//             <Link to="/login" className="home-login">
//               Fazer login
//             </Link>
//           </span>
//         )}
//       </div>

//       <div className="btns-group">
//         <ToggleDarkMode />
//         <button className="logout-btn" onClick={handleLogout}>
//           Sair
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TopBar;

//=======
import "./TopBar.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon, Login01Icon } from "@hugeicons/core-free-icons";

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
    setTimeout(() => {
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

        {user ? (
          <div className="user-profile">
            {user.photo ? (
              <NavLink to="/perfil">
                <img src={user.photo} alt={user.name} className="user-avatar" />
              </NavLink>
            ) : (
              <NavLink to="/perfil">
                <div className="user-avatar-placeholder">
                  <HugeiconsIcon icon={User03Icon} className="avatar-icon" />
                </div>
              </NavLink>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-icon-btn">
            <HugeiconsIcon icon={Login01Icon} className="login-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopBar;
