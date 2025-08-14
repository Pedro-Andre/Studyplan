import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Pomodoro from "../views/Pomodoro/Pomodoro";
import Calendar from "../views/Calendar/Calendar";
import NotFound from "../views/NotFound/NotFound";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
