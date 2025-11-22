// import SideMenu from "../../components/SideMenu/SideMenu";
// import TopBar from "../../components/TopBar/TopBar";
// import AddTaskModal from "./AddTaskModal";
// import "./Goals.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { HugeiconsIcon } from "@hugeicons/react";
// import {
//   Task01Icon,
//   AlertCircleIcon,
//   LocationCheck01Icon,
//   HourglassIcon,
//   PlayIcon,
//   PauseIcon,
// } from "@hugeicons/core-free-icons";

// {
//   /* <HugeiconsIcon icon={PauseIcon} /> */
// }

// function Goals() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get("http://localhost:3000/calendario", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUser(res.data.user))
//       .catch((err) => console.error(err));

//     console.log(user);
//   }, []);

//   const [metas, setMetas] = useState([
//     {
//       id: 1,
//       titulo: "Estudar Lógica de programação",
//       fonte: "YouTube",
//       status: "Não Iniciado",
//       dataAdicionada: "16/11/2025",
//       dataConclusao: "17/11/2025",
//       prioridade: "Alta",
//       tempo: "02 hrs 50 min",
//     },
//     {
//       id: 2,
//       titulo: "Estudar React",
//       fonte: "YouTube",
//       status: "Em Progresso",
//       dataAdicionada: "25/07/2025",
//       dataConclusao: "25/08/2025",
//       prioridade: "Médio",
//       tempo: "03 hrs",
//     },
//     {
//       id: 3,
//       titulo: "Fazer alterações no Currículo",
//       fonte: "Canva",
//       status: "Finalizado",
//       dataAdicionada: "23/02/2025",
//       dataConclusao: "25/02/2025",
//       prioridade: "Baixo",
//       tempo: "1 hr 30 min",
//     },
//   ]);

//   return (
//     <>
//       <main className="view-container">
//         <div className="orb orb-1"></div>
//         <div className="orb orb-2"></div>
//         <SideMenu />
//         <div className="content">
//           <TopBar />

//           <h2 className="gradient-text page-title small-title">Metas</h2>

//           <div className="metas-container">
//             <div className="centralizar-btn">
//               <AddTaskModal />
//             </div>

//             {/* Cards de resumo */}
//             <div className="cards-container">
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={Task01Icon} className="icon-style" />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">3</h2>
//                   <p>Total de metas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon
//                     icon={AlertCircleIcon}
//                     className="icon-style"
//                   />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">1</h2>
//                   <p>Não iniciadas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon
//                     icon={LocationCheck01Icon}
//                     className="icon-style"
//                   />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">1</h2>
//                   <p>Metas finalizadas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={HourglassIcon} className="icon-style" />
//                 </div>
//                 <div className="desc hours">
//                   <div className="value-hours">
//                     <h2 className="number-task">7</h2>
//                     <span>hrs,</span>
//                     <h2 className="number-task">20</h2>
//                     <span>min</span>
//                   </div>
//                   <p>Horas acumuladas</p>
//                 </div>
//               </div>
//             </div>

//             {/* Tabela */}
//             <div className="tabela-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Suas metas</th>
//                     <th>Status</th>
//                     <th>Adicionada em</th>
//                     <th>Conclusão Estimada</th>
//                     <th>Prioridade</th>
//                     <th>Tempo</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {metas.map((meta) => (
//                     <tr key={meta.id}>
//                       <td>
//                         <div className="icons play">
//                           <HugeiconsIcon
//                             icon={PlayIcon}
//                             className="icon-style"
//                           />
//                         </div>
//                         <div className="descricao">
//                           <strong>{meta.titulo}</strong>
//                           <p className="fonte">{meta.fonte}</p>
//                         </div>
//                       </td>

//                       <td>
//                         <span
//                           className={`status ${
//                             meta.status === "Em Progresso"
//                               ? "progresso"
//                               : meta.status === "Finalizado"
//                               ? "finalizado"
//                               : "nao-iniciado"
//                           }`}
//                         >
//                           {meta.status}
//                         </span>
//                       </td>

//                       <td>{meta.dataAdicionada}</td>
//                       <td>{meta.dataConclusao}</td>

//                       <td>
//                         <span
//                           className={`prioridade ${
//                             meta.prioridade === "Alta"
//                               ? "alta"
//                               : meta.prioridade === "Médio"
//                               ? "media"
//                               : "baixa"
//                           }`}
//                         >
//                           {meta.prioridade}
//                         </span>
//                       </td>

//                       <td>{meta.tempo}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Paginação */}
//             <div className="centralizar-btn">
//               <div className="paginacao">
//                 <button>Anterior</button>
//                 <button className="ativo">1</button>
//                 <button>2</button>
//                 <button>3</button>
//                 <button>Próx</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Goals;

// ============
import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";
import AddTaskModal from "./AddTaskModal";
import "./Goals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Task01Icon,
  AlertCircleIcon,
  LocationCheck01Icon,
  HourglassIcon,
  PlayIcon,
  PauseIcon,
} from "@hugeicons/core-free-icons";

function Goals() {
  const [user, setUser] = useState(null);
  const [metas, setMetas] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    notStarted: 0,
    completed: 0,
    totalHours: 0,
    totalMinutes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState({});

  // Buscar usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/calendario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error(err));
  }, []);

  // Buscar metas
  const fetchGoals = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMetas(response.data.goals);
      setStats(response.data.stats);

      // Verificar sessões ativas
      const sessions = {};
      for (const goal of response.data.goals) {
        const activeSession = goal.timeSessions.find((s) => !s.endTime);
        if (activeSession) {
          sessions[goal.id] = activeSession;
        }
      }
      setActiveSessions(sessions);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Iniciar cronômetro
  const handleStart = async (goalId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:3000/goals/${goalId}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setActiveSessions((prev) => ({
        ...prev,
        [goalId]: response.data,
      }));

      // Atualizar lista de metas
      fetchGoals();
    } catch (error) {
      console.error("Erro ao iniciar:", error);
      alert(error.response?.data?.error || "Erro ao iniciar cronômetro");
    }
  };

  // Pausar cronômetro
  const handlePause = async (goalId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:3000/goals/${goalId}/pause`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setActiveSessions((prev) => {
        const newSessions = { ...prev };
        delete newSessions[goalId];
        return newSessions;
      });

      // Atualizar lista de metas
      fetchGoals();
    } catch (error) {
      console.error("Erro ao pausar:", error);
      alert(error.response?.data?.error || "Erro ao pausar cronômetro");
    }
  };

  // Formatar tempo
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")} hrs ${minutes
        .toString()
        .padStart(2, "0")} min`;
    }
    return `${minutes} min`;
  };

  // Formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <main className="view-container">
        <SideMenu />
        <div className="content">
          <TopBar />
          <h2 className="gradient-text page-title small-title">Metas</h2>
          <p>Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="view-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <SideMenu />
        <div className="content">
          <TopBar />

          <h2 className="gradient-text page-title small-title">Metas</h2>

          <div className="metas-container">
            <div className="centralizar-btn">
              <AddTaskModal onGoalAdded={fetchGoals} />
            </div>

            {/* Cards de resumo */}
            <div className="cards-container">
              <div className="card">
                <div className="icons">
                  <HugeiconsIcon icon={Task01Icon} className="icon-style" />
                </div>
                <div className="desc">
                  <h2 className="number-task">{stats.total}</h2>
                  <p>Total de metas</p>
                </div>
              </div>
              <div className="card">
                <div className="icons">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    className="icon-style"
                  />
                </div>
                <div className="desc">
                  <h2 className="number-task">{stats.notStarted}</h2>
                  <p>Não iniciadas</p>
                </div>
              </div>
              <div className="card">
                <div className="icons">
                  <HugeiconsIcon
                    icon={LocationCheck01Icon}
                    className="icon-style"
                  />
                </div>
                <div className="desc">
                  <h2 className="number-task">{stats.completed}</h2>
                  <p>Metas finalizadas</p>
                </div>
              </div>
              <div className="card">
                <div className="icons">
                  <HugeiconsIcon icon={HourglassIcon} className="icon-style" />
                </div>
                <div className="desc hours">
                  <div className="value-hours">
                    <h2 className="number-task">{stats.totalHours}</h2>
                    <span>hrs,</span>
                    <h2 className="number-task">{stats.totalMinutes}</h2>
                    <span>min</span>
                  </div>
                  <p>Horas acumuladas</p>
                </div>
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
                  {metas.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        Nenhuma meta cadastrada. Clique em "Adicionar Tarefa"
                        para começar!
                      </td>
                    </tr>
                  ) : (
                    metas.map((meta) => (
                      <tr key={meta.id}>
                        <td>
                          <div
                            className="icons play"
                            onClick={() =>
                              activeSessions[meta.id]
                                ? handlePause(meta.id)
                                : handleStart(meta.id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <HugeiconsIcon
                              icon={
                                activeSessions[meta.id] ? PauseIcon : PlayIcon
                              }
                              className="icon-style"
                            />
                          </div>
                          <div className="descricao">
                            <strong>{meta.name}</strong>
                            <p className="fonte">{meta.category || "-"}</p>
                          </div>
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

                        <td>{formatDate(meta.createdAt)}</td>
                        <td>{formatDate(meta.finishBy)}</td>

                        <td>
                          <span
                            className={`prioridade ${
                              meta.priority === "Alta"
                                ? "alta"
                                : meta.priority === "Médio"
                                ? "media"
                                : "baixa"
                            }`}
                          >
                            {meta.priority}
                          </span>
                        </td>

                        <td>{formatTime(meta.totalTime)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação - pode ser implementada depois */}
            {metas.length > 0 && (
              <div className="centralizar-btn">
                <div className="paginacao">
                  <button>Anterior</button>
                  <button className="ativo">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>Próx</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Goals;
