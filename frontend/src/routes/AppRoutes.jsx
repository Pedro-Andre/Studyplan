import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Pomodoro from "../views/Pomodoro/Pomodoro";
import Calendar from "../views/Calendar/Calendar";
import NotFound from "../views/NotFound/NotFound";
import Profile from "../views/Profile/Profile";
import Goals from "../views/Goals/Goals";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="metas" element={<Goals />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
