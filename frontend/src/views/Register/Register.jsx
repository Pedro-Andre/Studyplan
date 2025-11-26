// import "./Register.css";
// import { Link } from "react-router-dom";
// import Logo from "../../components/Logo/Logo";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
// import { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErrMsg("");

//     try {
//       const response = await axios.post("http://localhost:3000/cadastro", {
//         name,
//         username,
//         email,
//         password,
//       });

//       console.log("Usuário cadastrado:", response.data);

//       window.location.href = "/login";
//       // setSuccess(true);
//     } catch (err) {
//       if (err.response) {
//         setErrMsg(err.response.data.error || "Erro no cadastro");
//       } else {
//         setErrMsg("Erro de conexão com o servidor");
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="form" onSubmit={handleRegister}>
//         <Logo className="a" />
//         <h4 className="form-title gradient-text">Cadastro</h4>

//         {/* Shows an Error or Success when trying to register a User */}
//         {errMsg && <p className="error">{errMsg}</p>}
//         {success && <p className="success">Usuário cadastrado com sucesso!</p>}

//         <label htmlFor="name" className="label">
//           Nome
//           <input
//             type="text"
//             id="name"
//             placeholder="Nome ou apelido"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </label>

//         <label htmlFor="username" className="label">
//           Nome de usuário
//           <input
//             type="text"
//             id="username"
//             placeholder="@nomeUsuario"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>

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
//             <HugeiconsIcon icon={ViewOffSlashIcon} className="input-icon" />
//           </div>
//         </label>

//         <span className="form-span">
//           Já tem uma conta?
//           <Link to={"/login"} className="form-span-link">
//             Fazer Login
//           </Link>
//         </span>
//         <button type="submit" className="form-btn">
//           Criar conta
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// =========

import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import axios from "axios";
import {
  validateRegisterForm,
  hasErrors,
  getFirstError,
} from "../../services/frontendValidations.js";
import ErrorMessage, {
  FormErrorAlert,
  FormSuccessAlert,
} from "../../components/ErrorMessage/ErrorMessage";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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

  // Validar campo individual ao perder foco (onBlur)
  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validateRegisterField(name, formData[name]);

    if (hasErrors(fieldErrors)) {
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    }
  };

  // Submeter formulário
  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    // Validar formulário completo
    const validationErrors = validateRegisterForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setServerError(getFirstError(validationErrors));
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Usuário cadastrado:", response.data);
      setSuccess(true);

      // Redirecionar após 1.5 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.error("Erro no cadastro:", err);

      // Tratar erros do backend
      if (err.response?.data?.errors) {
        // Se o backend retornar erros de validação
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
      <form className="form" onSubmit={handleRegister}>
        <Logo className="a" />
        <h4 className="form-title gradient-text">Cadastro</h4>

        {/* Alertas de Erro/Sucesso */}
        <FormErrorAlert error={serverError} />
        <FormSuccessAlert
          message={
            success ? "Usuário cadastrado com sucesso! Redirecionando..." : ""
          }
        />

        {/* Campo: Nome */}
        <label htmlFor="name" className="label">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome ou apelido"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? "input-error" : ""}
            disabled={loading}
          />
          <ErrorMessage errors={errors} fieldName="name" />
        </label>

        {/* Campo: Username */}
        <label htmlFor="username" className="label">
          Nome de usuário
          <input
            type="text"
            id="username"
            name="username"
            placeholder="@nomeUsuario"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username ? "input-error" : ""}
            disabled={loading}
          />
          <ErrorMessage errors={errors} fieldName="username" />
        </label>

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
          Já tem uma conta?
          <Link to={"/login"} className="form-span-link">
            Fazer Login
          </Link>
        </span>

        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}

export default Register;
