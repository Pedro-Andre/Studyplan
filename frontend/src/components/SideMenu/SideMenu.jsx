import "./SideMenu.css";
import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Calendar03Icon,
  CheckmarkSquare03Icon,
  Clock01Icon,
  User03Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

function SideMenu() {
  const [expanded, setExpanded] = useState(
    () => JSON.parse(localStorage.getItem("menuExpanded")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("menuExpanded", JSON.stringify(expanded));
  }, [expanded]);

  return (
    <div className={`menu-container ${expanded ? "expanded" : ""}`}>
      <div className="logo">
        <NavLink to="/" end>
          <Logo />
        </NavLink>
      </div>
      <div className="links-container">
        <ul className="menu-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end
            >
              <HugeiconsIcon icon={Home01Icon} className="link-icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendario"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <HugeiconsIcon icon={Calendar03Icon} className="link-icon" />
              Calendário
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/metas"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <HugeiconsIcon
                icon={CheckmarkSquare03Icon}
                className="link-icon"
              />
              Metas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pomodoro"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <HugeiconsIcon icon={Clock01Icon} className="link-icon" />
              Timer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <HugeiconsIcon icon={User03Icon} className="link-icon" />
              Perfil
            </NavLink>
          </li>
          <li className="nav-link">
            <button
              className="menu-btn"
              onClick={() => setExpanded((prev) => !prev)}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="link-icon" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
