import { useEffect, useState } from "react";
import SideMenu from "../../components/Sidemenu/Sidemenu";
import axios from "axios";

function Calendar() {
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
    <>
      <main className="view-container">
        <SideMenu />
        <div className="welcome-title">
          <h2 className="gradient-text">Calendário</h2>
          {/* {user ? <p>Olá, {user.name}</p> : <p>Você não está logado</p>} */}
        </div>
      </main>
    </>
  );
}

export default Calendar;
