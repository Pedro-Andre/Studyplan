// import "./Home.css";
// import SideMenu from "../../components/SideMenu/SideMenu";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Home() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get("http://localhost:3000/calendario", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUser(res.data.user))
//       .catch((err) => console.error(err));

//     console.log(user);
//   }, []);

//   return (
//     <main className="view-container">
//       <SideMenu />
//       <div className="top-bar">
//         <div className="welcome-title">
//           <h2>Bem-vindo, </h2>
//           {user ? (
//             <span className="gradient-text">Olá, {user.name}</span>
//           ) : (
//             <p>
//               Você não está logado{" "}
//               <Link to="/login" className="home-login">
//                 Fazer login
//               </Link>
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;

// logout test
import "./Home.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
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
    setUser(null); // Atualiza interface sem reload
    window.location.href = "/login"; // (Opcional) redireciona para login
  };

  return (
    <main className="view-container">
      <SideMenu />
      <div className="top-bar">
        <div className="welcome-title">
          <h2>Bem-vindo, </h2>
          {user ? (
            <span className="gradient-text home">{user.name}</span>
          ) : (
            <p>
              Você não está logado{" "}
              <Link to="/login" className="home-login">
                Fazer login
              </Link>
            </p>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </main>
  );
}

export default Home;
