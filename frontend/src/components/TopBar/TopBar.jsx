// import "./TopBar.css";
// import { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { User03Icon, Login01Icon } from "@hugeicons/core-free-icons";

// function TopBar() {
//   const [user, setUser] = useState(null);

//   // Função para carregar usuário do localStorage
//   const loadUser = () => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     // Carregar usuário inicial
//     loadUser();

//     // Escutar evento customizado de atualização de perfil
//     const handleProfileUpdate = () => {
//       loadUser();
//     };

//     window.addEventListener("profileUpdated", handleProfileUpdate);

//     // Limpar listener ao desmontar
//     return () => {
//       window.removeEventListener("profileUpdated", handleProfileUpdate);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setTimeout(() => {
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
//         {user ? (
//           <div className="user-profile">
//             {user.photo ? (
//               <NavLink to="/perfil">
//                 <img src={user.photo} alt={user.name} className="user-avatar" />
//               </NavLink>
//             ) : (
//               <NavLink to="/perfil">
//                 <div className="user-avatar-placeholder">
//                   <HugeiconsIcon icon={User03Icon} className="avatar-icon" />
//                 </div>
//               </NavLink>
//             )}
//             <button className="logout-btn" onClick={handleLogout}>
//               Sair
//             </button>
//           </div>
//         ) : (
//           <Link to="/login" className="login-icon-btn">
//             <HugeiconsIcon icon={Login01Icon} className="login-icon" />
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TopBar;

// =====
import "./TopBar.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon, Login01Icon } from "@hugeicons/core-free-icons";

function TopBar() {
  const [user, setUser] = useState(null);

  // Função para carregar usuário do localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("👤 Usuário carregado no TopBar:", {
          name: parsedUser.name,
          hasPhoto: !!parsedUser.photo,
          photoPreview: parsedUser.photo
            ? parsedUser.photo.substring(0, 50) + "..."
            : null,
        });
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao parsear usuário:", error);
        setUser(null);
      }
    } else {
      console.log("❌ Nenhum usuário no localStorage");
      setUser(null);
    }
  };

  useEffect(() => {
    // Carregar usuário inicial
    loadUser();

    // Escutar evento customizado de atualização de perfil
    const handleProfileUpdate = () => {
      console.log(
        "🔄 Evento profileUpdated recebido - Recarregando usuário..."
      );
      loadUser();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    // Também escutar mudanças no storage (para abas múltiplas)
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        console.log("🔄 Storage mudou - Recarregando usuário...");
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpar listeners ao desmontar
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    console.log("👋 Fazendo logout...");
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
              <NavLink to="/perfil" title="Ver perfil">
                <img
                  src={user.photo}
                  alt={`Foto de ${user.name}`}
                  className="user-avatar"
                  onError={(e) => {
                    console.error("❌ Erro ao carregar imagem do usuário");
                    e.target.style.display = "none";
                    e.target.nextSibling?.classList.remove("hidden");
                  }}
                />
                <div className="user-avatar-placeholder hidden">
                  <HugeiconsIcon icon={User03Icon} className="avatar-icon" />
                </div>
              </NavLink>
            ) : (
              <NavLink to="/perfil" title="Ver perfil">
                <div className="user-avatar-placeholder">
                  <HugeiconsIcon icon={User03Icon} className="avatar-icon" />
                </div>
              </NavLink>
            )}
            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Sair da conta"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-icon-btn" title="Fazer login">
            <HugeiconsIcon icon={Login01Icon} className="login-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopBar;
