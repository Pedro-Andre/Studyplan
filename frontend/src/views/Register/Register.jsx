import "./Register.css";
import { Link } from "react-router-dom";
import LightLogo from "../../components/LightLogo/LightLogo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";

function Register() {
  return (
    <>
      <div className="form-container">
        <form action="" className="form">
          <LightLogo className="a" />
          <h4 className="form-title gradient-text">Cadastro</h4>
          <label htmlFor="name" className="label">
            Nome
            <input
              type="text"
              name=""
              id="name"
              placeholder="Nome ou apelido"
            />
          </label>
          <label htmlFor="user-name" className="label">
            Nome de usuário
            <input
              type="text"
              name=""
              id="user-name"
              placeholder="@nomeUsuario"
            />
          </label>
          <label htmlFor="email" className="label">
            E-mail
            <input
              type="email"
              name=""
              id="email"
              placeholder="usuário@email.com"
            />
          </label>
          <label htmlFor="password" className="label">
            Senha
            <div className="input-password-container">
              <input
                type="password"
                id="password"
                placeholder=""
                className="input-password"
              />
              <HugeiconsIcon icon={ViewOffSlashIcon} className="input-icon" />
            </div>
          </label>
          <span className="form-span">
            Já tem uma conta?
            <Link to={"/login"} className="form-span-link">
              Fazer Login
            </Link>
          </span>
          <button className="form-btn">Ciar conta</button>
        </form>
      </div>
    </>
  );
}

export default Register;
