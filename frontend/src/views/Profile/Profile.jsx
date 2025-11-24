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

// function Profile() {
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);
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
//       alert("Erro ao carregar perfil");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
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
//         if (user.novaSenha !== user.confirmarSenha) {
//           alert("As senhas não coincidem!");
//           return;
//         }

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

//       alert("Perfil atualizado com sucesso!");
//       setEditMode(false);
//       setSenhaAtual("");
//       fetchProfile();
//     } catch (error) {
//       console.error("Erro ao atualizar perfil:", error);
//       alert(error.response?.data?.error || "Erro ao atualizar perfil");
//     }
//   };

//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

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
//         alert("Foto atualizada com sucesso!");
//       } catch (error) {
//         console.error("Erro ao atualizar foto:", error);
//         alert("Erro ao atualizar foto");
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDeleteAccount = async () => {
//     const senha = prompt("Digite sua senha para confirmar a exclusão da conta:");
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
//       alert(error.response?.data?.error || "Erro ao deletar conta");
//     }
//   };

//   if (loading) {
//     return (
//       <main className="view-container">
//         <SideMenu />
//         <div className="content">
//           <TopBar />
//           <p>Carregando perfil...</p>
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
//                     placeholder="Nome de usuário"
//                   />
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                   />

//                   <label>Senha Atual</label>
//                   <input
//                     type="password"
//                     value={senhaAtual}
//                     onChange={(e) => setSenhaAtual(e.target.value)}
//                     placeholder="Digite sua senha atual para alterar"
//                   />
//                   <label>Nova Senha</label>
//                   <input
//                     type="password"
//                     name="novaSenha"
//                     value={user.novaSenha}
//                     onChange={handleChange}
//                     placeholder="Deixe em branco para não alterar"
//                   />
//                   <label>Confirmar Nova Senha</label>
//                   <input
//                     type="password"
//                     name="confirmarSenha"
//                     value={user.confirmarSenha}
//                     onChange={handleChange}
//                     placeholder="Confirme a nova senha"
//                   />
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

// ========
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

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
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

      setUser({
        nome: response.data.nome,
        email: response.data.email,
        novaSenha: "",
        confirmarSenha: "",
        metasConcluidas: response.data.metasConcluidas,
        tempoTotal: response.data.tempoTotal.texto,
        foto: response.data.foto,
      });
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      alert("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
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

      // Atualizar senha se preenchida
      if (senhaAtual && user.novaSenha) {
        if (user.novaSenha !== user.confirmarSenha) {
          alert("As senhas não coincidem!");
          return;
        }

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
      }

      // Atualizar localStorage com novos dados
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        name: response.data.user.name,
        email: response.data.user.email,
        photo: user.foto,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Disparar evento para atualizar TopBar
      window.dispatchEvent(new Event("profileUpdated"));

      alert("Perfil atualizado com sucesso!");
      setEditMode(false);
      setSenhaAtual("");
      fetchProfile();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert(error.response?.data?.error || "Erro ao atualizar perfil");
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    // Converter para base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const token = localStorage.getItem("token");
      try {
        await axios.put(
          "http://localhost:3000/profile/photo",
          { profileImage: base64Image },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser((prev) => ({ ...prev, foto: base64Image }));

        // Atualizar localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.photo = base64Image;
        localStorage.setItem("user", JSON.stringify(storedUser));

        // Disparar evento para atualizar TopBar
        window.dispatchEvent(new Event("profileUpdated"));

        alert("Foto atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar foto:", error);
        alert(error.response?.data?.error || "Erro ao atualizar foto. Tente uma imagem menor.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = async () => {
    const senha = prompt("Digite sua senha para confirmar a exclusão da conta:");
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
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert(error.response?.data?.error || "Erro ao deletar conta");
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
                        accept="image/*"
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
                    placeholder="Nome de usuário"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />

                  <label>Senha Atual</label>
                  <input
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    placeholder="Digite sua senha atual para alterar"
                  />
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    name="novaSenha"
                    value={user.novaSenha}
                    onChange={handleChange}
                    placeholder="Deixe em branco para não alterar"
                  />
                  <label>Confirmar Nova Senha</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={user.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme a nova senha"
                  />
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