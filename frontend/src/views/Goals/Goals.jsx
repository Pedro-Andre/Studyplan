import SideMenu from "../../components/SideMenu/SideMenu";
import "./Goals.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Goals() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/calendario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error(err));

    console.log(user);
  }, []);

  const [metas, setMetas] = useState([
    {
      id: 1,
      titulo: "Estudar Lógica de programação",
      fonte: "YouTube",
      status: "Não Iniciado",
      dataAdicionada: "16/11/2025",
      dataConclusao: "17/11/2025",
      prioridade: "Alta",
      tempo: "02 hrs 50 min",
    },
    {
      id: 2,
      titulo: "Estudar React",
      fonte: "YouTube",
      status: "Em Progresso",
      dataAdicionada: "25/07/2025",
      dataConclusao: "25/08/2025",
      prioridade: "Médio",
      tempo: "03 hrs",
    },
    {
      id: 3,
      titulo: "Fazer alterações no Currículo",
      fonte: "Canva",
      status: "Finalizado",
      dataAdicionada: "23/02/2025",
      dataConclusao: "25/02/2025",
      prioridade: "Baixo",
      tempo: "1 hr 30 min",
    },

  ]);

  return (
    <>
      <main className="view-container">
        <SideMenu></SideMenu>
        <div className="metas-container">
          <div className="container-header">

            <div className="titles">
              <h1 className="gradient-text">Metas</h1>
              <p className="subtitulo">Concentre-se e defina suas prioridades ;)</p>
            </div>
            
          </div>

          <div className="centralizar-botao">
            <button className="add-tarefa">+ Adicionar tarefa</button>
          </div>
          
          {/* Cards de resumo */}
          <div className="cards-container">
            <div className="card">
              <h2>3</h2>
              <p>Total de metas</p>
            </div>
            <div className="card">
              <h2>1</h2>
              <p>Não iniciadas</p>
            </div>
            <div className="card">
              <h2>1</h2>
              <p>Metas finalizadas</p>
            </div>
            <div className="card">
              <h2>7 hrs, 20 min</h2>
              <p>Horas acumuladas</p>
            </div>
          </div>

          {/* Tabela */}
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Suas metas</th>
                  <th>Status</th>
                  <th>Adicionada em</th>
                  <th>Conclusão Estimada</th>
                  <th>Prioridade</th>
                  <th>Tempo</th>
                </tr>
              </thead>
              <tbody>
                {metas.map((meta) => (
                  <tr key={meta.id}>
                    <td>
                      <strong>{meta.titulo}</strong>
                      <p className="fonte">{meta.fonte}</p>
                    </td>
                    <td>
                      <span
                        className={`status ${
                          meta.status === "Em Progresso"
                            ? "progresso"
                            : meta.status === "Finalizado"
                            ? "finalizado"
                            : "nao-iniciado"
                        }`}
                      >
                        {meta.status}
                      </span>
                    </td>
                    <td>{meta.dataAdicionada}</td>
                    <td>{meta.dataConclusao}</td>
                    <td>
                      <span
                        className={`prioridade ${
                          meta.prioridade === "Alta"
                            ? "alta"
                            : meta.prioridade === "Médio"
                            ? "media"
                            : "baixa"
                        }`}
                      >
                        {meta.prioridade}
                      </span>
                    </td>
                    <td>{meta.tempo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="centralizar-botao">
            <div className="paginacao">
              <button>Anterior</button>
              <button className="ativo">1</button>
              <button>2</button>
              <button>3</button>
              <button>Próx</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Goals;
