import "./SideMenu.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Calendar03Icon,
  CheckmarkSquare03Icon,
  Clock01Icon,
  User03Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import LightLogo from "../LightLogo/LightLogo";

function SideMenu() {
  return (
    <>
      <div className="menu-container expanded">
        <div className="logo">
          <LightLogo></LightLogo>
        </div>
        <div className="links-container">
          <ul className="menu-links">
            <li>
              <Link to={"/"} className="nav-link active">
                <HugeiconsIcon icon={Home01Icon} className="link-icon" />
                Home
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-link">
                <HugeiconsIcon icon={Calendar03Icon} className="link-icon" />
                Calendário
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-link">
                <HugeiconsIcon
                  icon={CheckmarkSquare03Icon}
                  className="link-icon"
                />
                Metas
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-link">
                <HugeiconsIcon icon={Clock01Icon} className="link-icon" />
                Timer
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-link">
                <HugeiconsIcon icon={User03Icon} className="link-icon" />
                Meu perfil
              </Link>
            </li>
            <li className="nav-link">
              <button className="menu-btn">
                <HugeiconsIcon icon={ArrowLeft01Icon} className="link-icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
