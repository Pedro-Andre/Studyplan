// import { Link } from "react-router-dom";
// import Logo from "../../components/Logo/Logo";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
// import { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrMsg("");

//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email,
//         password,
//       });

//       console.log("📥 Token recebido:", response.data.token);

//       console.log("Login OK:", response.data);

//       // Salva o token
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       console.log(
//         "✅ Token salvo no localStorage:",
//         localStorage.getItem("token")
//       );

//       window.location.href = "/";
//       // setSuccess(true);
//     } catch (err) {
//       if (err.response) {
//         setErrMsg(err.response.data.error || "Erro ao fazer login");
//       } else {
//         setErrMsg("Erro de conexão com o servidor");
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="form" onSubmit={handleLogin}>
//         <Logo />
//         <h4 className="form-title gradient-text">Login</h4>

//         {/* Shows an Error or Succes when trying to login */}
//         {errMsg && <p className="error">{errMsg}</p>}
//         {success && <p className="success">Login realizado com sucesso!</p>}

//         <label htmlFor="email" className="label">
//           E-mail
//           <input
//             type="email"
//             id="email"
//             placeholder="usuario@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>

//         <label htmlFor="password" className="label">
//           Senha
//           <div className="input-password-container">
//             <input
//               type="password"
//               id="password"
//               placeholder="********"
//               className="input-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {/* <HugeiconsIcon icon={ViewOffSlashIcon} className="input-icon" /> */}
//           </div>
//         </label>

//         <span className="form-span">
//           Ainda não tem conta?
//           <Link to={"/cadastro"} className="form-span-link">
//             Criar conta
//           </Link>
//         </span>
//         <button type="submit" className="form-btn">
//           Entrar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// =========
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import axios from "axios";
import {
  validateLoginForm,
  hasErrors,
  getFirstError,
} from "../../services/frontendValidations.js";
import ErrorMessage, {
  FormErrorAlert,
  FormSuccessAlert,
} from "../../components/ErrorMessage/ErrorMessage";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Atualizar campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validar campo individual ao perder foco
  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validateLoginField(name, formData[name]);

    if (hasErrors(fieldErrors)) {
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    }
  };

  // Submeter formulário
  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    // Validar formulário completo
    const validationErrors = validateLoginForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setServerError(getFirstError(validationErrors));
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("📥 Token recebido:", response.data.token);
      console.log("Login OK:", response.data);

      // Salvar token e dados do usuário
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log(
        "✅ Token salvo no localStorage:",
        localStorage.getItem("token")
      );

      setSuccess(true);

      // Redirecionar após 1 segundo
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Erro no login:", err);

      // Tratar erros do backend
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          const field = error.path || error.param;
          if (!backendErrors[field]) {
            backendErrors[field] = [];
          }
          backendErrors[field].push(error.msg);
        });
        setErrors(backendErrors);
        setServerError(getFirstError(backendErrors));
      } else if (err.response?.data?.error) {
        setServerError(err.response.data.error);
      } else {
        setServerError("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <Logo />
        <h4 className="form-title gradient-text">Login</h4>

        {/* Alertas de Erro/Sucesso */}
        <FormErrorAlert error={serverError} />
        <FormSuccessAlert
          message={
            success ? "Login realizado com sucesso! Redirecionando..." : ""
          }
        />

        {/* Campo: Email */}
        <label htmlFor="email" className="label">
          E-mail
          <input
            type="email"
            id="email"
            name="email"
            placeholder="usuario@email.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "input-error" : ""}
            disabled={loading}
          />
          <ErrorMessage errors={errors} fieldName="email" />
        </label>

        {/* Campo: Senha */}
        <label htmlFor="password" className="label">
          Senha
          <div className="input-password-container">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className={`input-password ${
                errors.password ? "input-error" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            <HugeiconsIcon icon={ViewOffSlashIcon} className="input-icon" />
          </div>
          <ErrorMessage errors={errors} fieldName="password" />
        </label>

        <span className="form-span">
          Ainda não tem conta?
          <Link to={"/cadastro"} className="form-span-link">
            Criar conta
          </Link>
        </span>

        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
