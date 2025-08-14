import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="form-container">
        <h4 className="form-title">Cadastro</h4>
        <form action="" className="form">
          <label htmlFor="user-name" className="label">
            Nome de usuário
            <input type="text" name="" id="user-name" />
          </label>
          <label htmlFor="email" className="label">
            Email
            <input type="email" name="" id="email" />
          </label>
          <label htmlFor="password" className="label">
            Senha
            <input type="password" name="" id="password" />
          </label>
          <button className="form-btn">Ciar conta</button>
        </form>
        <div className="login-page">
          <span>
            Já tem uma conta?
            <Link to={"/login"}>Fazer Login</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
