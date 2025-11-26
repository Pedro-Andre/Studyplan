// import { useState, useEffect } from "react";
// import SideMenu from "../../components/SideMenu/SideMenu";
// import "../Profile/Profile.css";
// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   Pen01Icon,
//   HourglassIcon,
//   LocationCheck01Icon,
//   UserIcon,
// } from "@hugeicons/core-free-icons";
// import TopBar from "../../components/TopBar/TopBar";
// import axios from "axios";
// import {
//   validateProfileForm,
//   validatePasswordChangeForm,
//   hasErrors,
//   getFirstError,
// } from "../../services/frontendValidations.js";
// import ErrorMessage, {
//   FormErrorAlert,
//   FormSuccessAlert,
// } from "../../components/ErrorMessage/ErrorMessage";

// function Profile() {
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [user, setUser] = useState({
//     nome: "",
//     email: "",
//     novaSenha: "",
//     confirmarSenha: "",
//     metasConcluidas: 0,
//     tempoTotal: "0h e 0min",
//     foto: null,
//   });

//   const [senhaAtual, setSenhaAtual] = useState("");

//   // Buscar dados do perfil
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3000/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUser({
//         nome: response.data.nome,
//         email: response.data.email,
//         novaSenha: "",
//         confirmarSenha: "",
//         metasConcluidas: response.data.metasConcluidas,
//         tempoTotal: response.data.tempoTotal.texto,
//         foto: response.data.foto,
//       });
//     } catch (error) {
//       console.error("Erro ao buscar perfil:", error);
//       setServerError("Erro ao carregar perfil");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));

//     // Limpar erro do campo ao digitar
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//     setServerError("");
//     setSuccess("");
//   };

//   const handleSenhaAtualChange = (e) => {
//     setSenhaAtual(e.target.value);

//     // Limpar erro
//     if (errors.senhaAtual) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors.senhaAtual;
//         return newErrors;
//       });
//     }
//     setServerError("");
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;

//     if (["nome", "email"].includes(name)) {
//       const profileErrors = validateProfileField(name, user[name]);
//       if (hasErrors(profileErrors)) {
//         setErrors((prev) => ({ ...prev, ...profileErrors }));
//       } else {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[name];
//           return newErrors;
//         });
//       }
//     }

//     if (["senhaAtual", "novaSenha", "confirmarSenha"].includes(name)) {
//       const passwordData = {
//         senhaAtual,
//         novaSenha: user.novaSenha,
//         confirmarSenha: user.confirmarSenha,
//       };
//       const passwordErrors = validatePasswordField(name, passwordData);
//       if (hasErrors(passwordErrors)) {
//         setErrors((prev) => ({ ...prev, ...passwordErrors }));
//       } else {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[name];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const handleSave = async () => {
//     setServerError("");
//     setSuccess("");
//     const allErrors = {};

//     // Validar perfil
//     const profileErrors = validateProfileForm({
//       nome: user.nome,
//       email: user.email,
//     });
//     Object.assign(allErrors, profileErrors);

//     // Validar senha se foi preenchida
//     if (senhaAtual || user.novaSenha || user.confirmarSenha) {
//       const passwordErrors = validatePasswordChangeForm({
//         senhaAtual,
//         novaSenha: user.novaSenha,
//         confirmarSenha: user.confirmarSenha,
//       });
//       Object.assign(allErrors, passwordErrors);
//     }

//     // Se houver erros, exibir e parar
//     if (hasErrors(allErrors)) {
//       setErrors(allErrors);
//       setServerError(getFirstError(allErrors));
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       // Atualizar nome e email
//       const response = await axios.put(
//         "http://localhost:3000/profile",
//         {
//           name: user.nome,
//           email: user.email,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Atualizar senha se preenchida
//       if (senhaAtual && user.novaSenha) {
//         await axios.put(
//           "http://localhost:3000/profile/password",
//           {
//             senhaAtual,
//             novaSenha: user.novaSenha,
//             confirmarSenha: user.confirmarSenha,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }

//       // Atualizar localStorage com novos dados
//       const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//       const updatedUser = {
//         ...storedUser,
//         name: response.data.user.name,
//         email: response.data.user.email,
//         photo: user.foto,
//       };
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       // Disparar evento para atualizar TopBar
//       window.dispatchEvent(new Event("profileUpdated"));

//       setSuccess("Perfil atualizado com sucesso!");
//       setEditMode(false);
//       setSenhaAtual("");
//       setErrors({});

//       // Recarregar perfil
//       setTimeout(() => {
//         fetchProfile();
//         setSuccess("");
//       }, 2000);
//     } catch (error) {
//       console.error("Erro ao atualizar perfil:", error);

//       // Tratar erros do backend
//       if (error.response?.data?.errors) {
//         const backendErrors = {};
//         error.response.data.errors.forEach((err) => {
//           const field = err.path || err.param;
//           if (!backendErrors[field]) {
//             backendErrors[field] = [];
//           }
//           backendErrors[field].push(err.msg);
//         });
//         setErrors(backendErrors);
//         setServerError(getFirstError(backendErrors));
//       } else if (error.response?.data?.error) {
//         setServerError(error.response.data.error);
//       } else {
//         setServerError("Erro ao atualizar perfil");
//       }
//     }
//   };

//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validar tamanho (máximo 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setServerError("A imagem deve ter no máximo 5MB");
//       return;
//     }

//     // Converter para base64
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result;

//       const token = localStorage.getItem("token");
//       try {
//         await axios.put(
//           "http://localhost:3000/profile/photo",
//           { profileImage: base64Image },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setUser((prev) => ({ ...prev, foto: base64Image }));

//         // Atualizar localStorage
//         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//         storedUser.photo = base64Image;
//         localStorage.setItem("user", JSON.stringify(storedUser));

//         // Disparar evento para atualizar TopBar
//         window.dispatchEvent(new Event("profileUpdated"));

//         setSuccess("Foto atualizada com sucesso!");
//         setTimeout(() => setSuccess(""), 3000);
//       } catch (error) {
//         console.error("Erro ao atualizar foto:", error);
//         setServerError(
//           error.response?.data?.error ||
//             "Erro ao atualizar foto. Tente uma imagem menor."
//         );
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDeleteAccount = async () => {
//     const senha = prompt(
//       "Digite sua senha para confirmar a exclusão da conta:"
//     );
//     if (!senha) return;

//     if (!confirm("Tem certeza? Esta ação é irreversível!")) {
//       return;
//     }

//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete("http://localhost:3000/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { senha },
//       });

//       alert("Conta deletada com sucesso");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Erro ao deletar conta:", error);
//       setServerError(error.response?.data?.error || "Erro ao deletar conta");
//     }
//   };

//   if (loading) {
//     return (
//       <main className="view-container">
//         <SideMenu />
//         <div className="content">
//           <TopBar />
//           <p className="loading-text">Carregando perfil...</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="view-container">
//       <div className="orb orb-1"></div>
//       <div className="orb orb-2"></div>
//       <SideMenu />

//       <div className="content">
//         <TopBar />
//         <div className="profile-page">
//           <div className="profile-header">
//             <div className="titles">
//               <h1 className="gradient-text">Perfil</h1>
//             </div>
//           </div>

//           <div className="profile-card">
//             {/* Alertas */}
//             <FormErrorAlert error={serverError} />
//             <FormSuccessAlert message={success} />

//             <div className="card-header">
//               <div className="profile-left">
//                 <div className="photo-wrapper">
//                   {user.foto ? (
//                     <img
//                       src={user.foto}
//                       alt="Foto do usuário"
//                       className="profile-photo"
//                     />
//                   ) : (
//                     <div className="profile-photo-placeholder">
//                       <HugeiconsIcon
//                         icon={UserIcon}
//                         style={{ width: "6rem", height: "6rem" }}
//                       />
//                     </div>
//                   )}
//                   {editMode && (
//                     <label className="edit-photo-btn">
//                       <HugeiconsIcon icon={Pen01Icon} />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handlePhotoChange}
//                         style={{ display: "none" }}
//                       />
//                     </label>
//                   )}
//                 </div>
//                 <div className="profile-info">
//                   <h2 className="gradient-text small-text">{user.nome}</h2>
//                   <p className="info-item">
//                     <HugeiconsIcon icon={LocationCheck01Icon} /> Metas
//                     concluídas: {user.metasConcluidas}
//                   </p>
//                   <p className="info-item">
//                     <HugeiconsIcon icon={HourglassIcon} /> Tempo realizando as
//                     metas: {user.tempoTotal}
//                   </p>
//                 </div>
//               </div>
//               <div className="teste-btn">
//                 {!editMode ? (
//                   <button
//                     className="edit-button"
//                     onClick={() => setEditMode(true)}
//                   >
//                     <HugeiconsIcon icon={Pen01Icon} />
//                   </button>
//                 ) : (
//                   <div className="div-none"></div>
//                 )}
//               </div>
//             </div>

//             <div className="profile-form">
//               {editMode && (
//                 <>
//                   <label>Nome de usuário</label>
//                   <input
//                     type="text"
//                     name="nome"
//                     value={user.nome}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Nome de usuário"
//                     className={errors.nome ? "input-error" : ""}
//                   />
//                   <ErrorMessage errors={errors} fieldName="nome" />

//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Email"
//                     className={errors.email ? "input-error" : ""}
//                   />
//                   <ErrorMessage errors={errors} fieldName="email" />

//                   <label>Senha Atual</label>
//                   <input
//                     type="password"
//                     value={senhaAtual}
//                     onChange={handleSenhaAtualChange}
//                     onBlur={(e) => {
//                       e.target.name = "senhaAtual";
//                       handleBlur(e);
//                     }}
//                     placeholder="Digite sua senha atual para alterar"
//                     className={errors.senhaAtual ? "input-error" : ""}
//                   />
//                   <ErrorMessage errors={errors} fieldName="senhaAtual" />

//                   <label>Nova Senha</label>
//                   <input
//                     type="password"
//                     name="novaSenha"
//                     value={user.novaSenha}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Deixe em branco para não alterar"
//                     className={errors.novaSenha ? "input-error" : ""}
//                   />
//                   <ErrorMessage errors={errors} fieldName="novaSenha" />

//                   <label>Confirmar Nova Senha</label>
//                   <input
//                     type="password"
//                     name="confirmarSenha"
//                     value={user.confirmarSenha}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Confirme a nova senha"
//                     className={errors.confirmarSenha ? "input-error" : ""}
//                   />
//                   <ErrorMessage errors={errors} fieldName="confirmarSenha" />
//                 </>
//               )}
//             </div>

//             {editMode && (
//               <>
//                 <div className="centralize-delete">
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="delete-profile"
//                     style={{
//                       background: "transparent",
//                       border: "none",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Excluir conta
//                   </button>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn close-modal-btn"
//                     onClick={() => {
//                       setEditMode(false);
//                       setSenhaAtual("");
//                       setErrors({});
//                       setServerError("");
//                       setSuccess("");
//                       fetchProfile();
//                     }}
//                   >
//                     Cancelar
//                   </button>
//                   <button className="btn delete-btn" onClick={handleSave}>
//                     Salvar
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Profile;

// ====
import { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import "../Profile/Profile.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Pen01Icon,
  HourglassIcon,
  LocationCheck01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import TopBar from "../../components/TopBar/TopBar";
import axios from "axios";
import {
  validateProfileForm,
  validatePasswordChangeForm,
  hasErrors,
  getFirstError,
} from "../../services/frontendValidations.js";
import ErrorMessage, {
  FormErrorAlert,
  FormSuccessAlert,
} from "../../components/ErrorMessage/ErrorMessage";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    nome: "",
    email: "",
    novaSenha: "",
    confirmarSenha: "",
    metasConcluidas: 0,
    tempoTotal: "0h e 0min",
    foto: null,
  });

  const [senhaAtual, setSenhaAtual] = useState("");

  // Buscar dados do perfil
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📸 Dados do perfil recebidos:", response.data);

      // Atualizar estado com os dados do backend
      setUser({
        nome: response.data.nome,
        email: response.data.email,
        novaSenha: "",
        confirmarSenha: "",
        metasConcluidas: response.data.metasConcluidas,
        tempoTotal: response.data.tempoTotal.texto,
        foto: response.data.foto, // Vem do backend
      });

      // IMPORTANTE: Sincronizar localStorage com dados do backend
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        name: response.data.nome,
        email: response.data.email,
        photo: response.data.foto, // Usar 'photo' no localStorage
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("✅ localStorage atualizado:", updatedUser);

      // Disparar evento para atualizar TopBar
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      setServerError("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setServerError("");
    setSuccess("");
  };

  const handleSenhaAtualChange = (e) => {
    setSenhaAtual(e.target.value);

    // Limpar erro
    if (errors.senhaAtual) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.senhaAtual;
        return newErrors;
      });
    }
    setServerError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    // Validar perfil (nome e email)
    if (["nome", "email"].includes(name)) {
      const profileErrors = validateProfileForm({ [name]: user[name] });
      if (hasErrors(profileErrors)) {
        setErrors((prev) => ({
          ...prev,
          ...profileErrors,
        }));
      }
    }

    // Validar senha
    if (["novaSenha", "confirmarSenha"].includes(name)) {
      const passwordData = {
        senhaAtual,
        novaSenha: user.novaSenha,
        confirmarSenha: user.confirmarSenha,
      };
      const passwordErrors = validatePasswordChangeForm(passwordData);

      if (hasErrors(passwordErrors)) {
        setErrors((prev) => ({
          ...prev,
          ...passwordErrors,
        }));
      }
    }
  };

  const handleSave = async () => {
    setServerError("");
    setSuccess("");
    const allErrors = {};

    // Validar perfil
    const profileErrors = validateProfileForm({
      nome: user.nome,
      email: user.email,
    });
    Object.assign(allErrors, profileErrors);

    // Validar senha se foi preenchida
    if (senhaAtual || user.novaSenha || user.confirmarSenha) {
      const passwordErrors = validatePasswordChangeForm({
        senhaAtual,
        novaSenha: user.novaSenha,
        confirmarSenha: user.confirmarSenha,
      });
      Object.assign(allErrors, passwordErrors);
    }

    // Se houver erros, exibir e parar
    if (hasErrors(allErrors)) {
      setErrors(allErrors);
      setServerError(getFirstError(allErrors));
      return;
    }

    const token = localStorage.getItem("token");

    try {
      // Atualizar nome e email
      const response = await axios.put(
        "http://localhost:3000/profile",
        {
          name: user.nome,
          email: user.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Perfil atualizado:", response.data);

      // Atualizar senha se preenchida
      if (senhaAtual && user.novaSenha) {
        await axios.put(
          "http://localhost:3000/profile/password",
          {
            senhaAtual,
            novaSenha: user.novaSenha,
            confirmarSenha: user.confirmarSenha,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ Senha atualizada");
      }

      // Atualizar localStorage com novos dados
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        name: response.data.user.name,
        email: response.data.user.email,
        photo: user.foto, // Manter foto atual
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("✅ localStorage atualizado após save:", updatedUser);

      // Disparar evento para atualizar TopBar
      window.dispatchEvent(new Event("profileUpdated"));

      setSuccess("Perfil atualizado com sucesso!");
      setEditMode(false);
      setSenhaAtual("");
      setErrors({});

      // Recarregar perfil
      setTimeout(() => {
        fetchProfile();
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      // Tratar erros do backend
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          const field = err.path || err.param;
          if (!backendErrors[field]) {
            backendErrors[field] = [];
          }
          backendErrors[field].push(err.msg);
        });
        setErrors(backendErrors);
        setServerError(getFirstError(backendErrors));
      } else if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("Erro ao atualizar perfil");
      }
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setServerError("A imagem deve ter no máximo 5MB");
      return;
    }

    // Validar tipo de arquivo
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      setServerError("Formato inválido. Use PNG, JPG, JPEG, GIF ou WEBP");
      return;
    }

    console.log("📸 Arquivo selecionado:", file.name, file.type, file.size);

    // Converter para base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      console.log("📸 Base64 gerado:", base64Image.substring(0, 50) + "...");

      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          "http://localhost:3000/profile/photo",
          { profileImage: base64Image },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Foto atualizada no servidor:", response.data);

        // Atualizar estado local
        setUser((prev) => ({ ...prev, foto: base64Image }));

        // Atualizar localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.photo = base64Image; // Usar 'photo' no localStorage
        localStorage.setItem("user", JSON.stringify(storedUser));

        console.log("✅ localStorage atualizado com nova foto");

        // Disparar evento para atualizar TopBar IMEDIATAMENTE
        window.dispatchEvent(new Event("profileUpdated"));

        setSuccess("Foto atualizada com sucesso!");
        setTimeout(() => setSuccess(""), 3000);

        // Recarregar perfil para garantir sincronização
        setTimeout(() => {
          fetchProfile();
        }, 500);
      } catch (error) {
        console.error("❌ Erro ao atualizar foto:", error);
        setServerError(
          error.response?.data?.error ||
            "Erro ao atualizar foto. Tente uma imagem menor."
        );
      }
    };

    reader.onerror = () => {
      console.error("❌ Erro ao ler arquivo");
      setServerError("Erro ao processar imagem");
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = async () => {
    const senha = prompt(
      "Digite sua senha para confirmar a exclusão da conta:"
    );
    if (!senha) return;

    if (!confirm("Tem certeza? Esta ação é irreversível!")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
        data: { senha },
      });

      alert("Conta deletada com sucesso");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      setServerError(error.response?.data?.error || "Erro ao deletar conta");
    }
  };

  if (loading) {
    return (
      <main className="view-container">
        <SideMenu />
        <div className="content">
          <TopBar />
          <p className="loading-text">Carregando perfil...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />

      <div className="content">
        <TopBar />
        <div className="profile-page">
          <div className="profile-header">
            <div className="titles">
              <h1 className="gradient-text">Perfil</h1>
            </div>
          </div>

          <div className="profile-card">
            {/* Alertas */}
            <FormErrorAlert error={serverError} />
            <FormSuccessAlert message={success} />

            <div className="card-header">
              <div className="profile-left">
                <div className="photo-wrapper">
                  {user.foto ? (
                    <img
                      src={user.foto}
                      alt="Foto do usuário"
                      className="profile-photo"
                    />
                  ) : (
                    <div className="profile-photo-placeholder">
                      <HugeiconsIcon
                        icon={UserIcon}
                        style={{ width: "6rem", height: "6rem" }}
                      />
                    </div>
                  )}
                  {editMode && (
                    <label className="edit-photo-btn">
                      <HugeiconsIcon icon={Pen01Icon} />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
                <div className="profile-info">
                  <h2 className="gradient-text small-text">{user.nome}</h2>
                  <p className="info-item">
                    <HugeiconsIcon icon={LocationCheck01Icon} /> Metas
                    concluídas: {user.metasConcluidas}
                  </p>
                  <p className="info-item">
                    <HugeiconsIcon icon={HourglassIcon} /> Tempo realizando as
                    metas: {user.tempoTotal}
                  </p>
                </div>
              </div>
              <div className="teste-btn">
                {!editMode ? (
                  <button
                    className="edit-button"
                    onClick={() => setEditMode(true)}
                  >
                    <HugeiconsIcon icon={Pen01Icon} />
                  </button>
                ) : (
                  <div className="div-none"></div>
                )}
              </div>
            </div>

            <div className="profile-form">
              {editMode && (
                <>
                  <label>Nome de usuário</label>
                  <input
                    type="text"
                    name="nome"
                    value={user.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nome de usuário"
                    className={errors.nome ? "input-error" : ""}
                  />
                  <ErrorMessage errors={errors} fieldName="nome" />

                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    className={errors.email ? "input-error" : ""}
                  />
                  <ErrorMessage errors={errors} fieldName="email" />

                  <label>Senha Atual</label>
                  <input
                    type="password"
                    value={senhaAtual}
                    onChange={handleSenhaAtualChange}
                    onBlur={(e) => {
                      e.target.name = "senhaAtual";
                      handleBlur(e);
                    }}
                    placeholder="Digite sua senha atual para alterar"
                    className={errors.senhaAtual ? "input-error" : ""}
                  />
                  <ErrorMessage errors={errors} fieldName="senhaAtual" />

                  <label>Nova Senha</label>
                  <input
                    type="password"
                    name="novaSenha"
                    value={user.novaSenha}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Deixe em branco para não alterar"
                    className={errors.novaSenha ? "input-error" : ""}
                  />
                  <ErrorMessage errors={errors} fieldName="novaSenha" />

                  <label>Confirmar Nova Senha</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={user.confirmarSenha}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirme a nova senha"
                    className={errors.confirmarSenha ? "input-error" : ""}
                  />
                  <ErrorMessage errors={errors} fieldName="confirmarSenha" />
                </>
              )}
            </div>

            {editMode && (
              <>
                <div className="centralize-delete">
                  <button
                    onClick={handleDeleteAccount}
                    className="delete-profile"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Excluir conta
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn close-modal-btn"
                    onClick={() => {
                      setEditMode(false);
                      setSenhaAtual("");
                      setErrors({});
                      setServerError("");
                      setSuccess("");
                      fetchProfile();
                    }}
                  >
                    Cancelar
                  </button>
                  <button className="btn delete-btn" onClick={handleSave}>
                    Salvar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
