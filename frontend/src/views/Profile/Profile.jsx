import { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import "../Profile/Profile.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Pen01Icon,
  HourglassIcon,
  LocationCheck01Icon,
} from "@hugeicons/core-free-icons";
import TopBar from "../../components/TopBar/TopBar";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    nome: "Nome usuário",
    email: "usuario@email.com",
    senha: "123456",
    confirmSenha: "123456",
    metasConcluidas: 40,
    tempoTotal: "5h e 30min",
    foto: "https://i.pravatar.cc/150?img=12",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica de atualização da API
    alert("Perfil atualizado com sucesso!");
    setEditMode(false);
  };

  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />
      <div className="profile-page">
        <div className="profile-header">
          <div className="titles">
            <h1 className="gradient-text">Perfil</h1>
            <p className="subtitulo">Bem-vindo ao seu perfil</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <div className="profile-left">
              <div className="photo-wrapper">
                <img
                  src={user.foto}
                  alt="Foto do usuário"
                  className="profile-photo"
                />
                {editMode && (
                  <button className="edit-photo-btn">
                    <HugeiconsIcon icon={Pen01Icon} />
                  </button>
                )}
              </div>
              <div className="profile-info">
                <h2>{user.nome}</h2>
                <p className="info-item">
                  <HugeiconsIcon icon={LocationCheck01Icon} /> Metas concluídas:{" "}
                  {user.metasConcluidas}
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
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <label>Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={user.senha}
                  onChange={handleChange}
                  placeholder="Senha"
                />
                <label>Confirmar senha</label>
                <input
                  type="password"
                  name="confirmSenha"
                  value={user.confirmSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                />
              </>
            )}
          </div>
          {editMode && (
            <>
              <div className="centralize-delete">
                <a href="" className="delete-profile">
                  Excluir conta
                </a>
              </div>
              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Salvar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
