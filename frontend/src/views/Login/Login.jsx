import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      console.log("📥 Token recebido:", response.data.token);

      console.log("Login OK:", response.data);

       // Salva o token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("✅ Token salvo no localStorage:", localStorage.getItem("token"));

      window.location.href = "/";
      // setSuccess(true);
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.error || "Erro ao fazer login");
      } else {
        setErrMsg("Erro de conexão com o servidor");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <Logo />
        <h4 className="form-title gradient-text">Login</h4>

        {/* Shows an Error or Succes when trying to login */}
        {errMsg && <p className="error">{errMsg}</p>}
        {success && <p className="success">Login realizado com sucesso!</p>}

        <label htmlFor="email" className="label">
          E-mail
          <input
            type="email"
            id="email"
            placeholder="usuario@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password" className="label">
          Senha
          <div className="input-password-container">
            <input
              type="password"
              id="password"
              placeholder="********"
              className="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <HugeiconsIcon icon={ViewOffSlashIcon} className="input-icon" />
          </div>
        </label>

        <span className="form-span">
          Ainda não tem conta?
          <Link to={"/cadastro"} className="form-span-link">
            Criar conta
          </Link>
        </span>
        <button type="submit" className="form-btn">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
