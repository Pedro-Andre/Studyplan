import "./NotFound.css";
import { NavLink } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";
import img404 from "../../public/404.png";

function NotFound() {
  return (
    <main className="view-container not-found-container">
      <h1 className="gradient-text">Studyplan</h1>
      <h4 className="page-text">Página não encontrada ou inexistente</h4>
      <NavLink to="/" className="not-found-link">
        <HugeiconsIcon icon={Home01Icon} className="link-icon" />
        Voltar para tela inicial
      </NavLink>
      <img src={img404} alt="Imagem de Erro" className="img-error" />
    </main>
  );
}

export default NotFound;
