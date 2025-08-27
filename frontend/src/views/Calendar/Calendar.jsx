import { useEffect, useState } from "react";
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
    <div>
      <h2>Calendario</h2>
      {user ? <p>Bem-vindo, {user.name}!</p> : <p>Carregando...</p>}
    </div>
  );
}

export default Calendar;
