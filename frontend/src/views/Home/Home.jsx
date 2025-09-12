import "./Home.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/calendario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error(err));

    console.log(user);
  }, []);

  return (
    <main className="view-container">
      <SideMenu />
      <div className="welcome-title">
        <h2>Bem-vindo,</h2>
        {user ? <p>Olá, {user.name}</p> : <p>Você não está logado</p>}
      </div>
    </main>
  );
}

export default Home;
