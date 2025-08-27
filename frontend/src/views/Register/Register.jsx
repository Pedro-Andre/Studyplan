import "./Register.css";
import { Link } from "react-router-dom";
import LightLogo from "../../components/LightLogo/LightLogo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrMsg("");

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        name,
        username,
        email,
        password,
      });

      console.log("Usuário cadastrado:", response.data);

      window.location.href = "/login";
      // setSuccess(true);
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.error || "Erro no cadastro");
      } else {
        setErrMsg("Erro de conexão com o servidor");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleRegister}>
        <LightLogo className="a" />
        <h4 className="form-title gradient-text">Cadastro</h4>

        {/* Shows an Error or Success when trying to register a User */}
        {errMsg && <p className="error">{errMsg}</p>}
        {success && <p className="success">Usuário cadastrado com sucesso!</p>}

        <label htmlFor="name" className="label">
          Nome
          <input
            type="text"
            id="name"
            placeholder="Nome ou apelido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label htmlFor="username" className="label">
          Nome de usuário
          <input
            type="text"
            id="username"
            placeholder="@nomeUsuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

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
          Já tem uma conta?
          <Link to={"/login"} className="form-span-link">
            Fazer Login
          </Link>
        </span>
        <button type="submit" className="form-btn">
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default Register;
