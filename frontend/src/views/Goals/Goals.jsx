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
//   BookmarkCheck01Icon,
//   HourglassIcon,
//   PlayIcon,
// } from "@hugeicons/core-free-icons";

// function Goals() {
//   const [user, setUser] = useState(null);
//   const [metas, setMetas] = useState([]);

//   // 1) pega dados do usuário (como você já tinha)
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get("http://localhost:3000/calendario", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUser(res.data.user);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // 2) quando tivermos o user, busca as metas desse user no backend
//   useEffect(() => {
//     if (!user) return;

//     const token = localStorage.getItem("token");
//     // Assumimos que sua rota aceita query param ?userId=...
//     axios
//       .get(`http://localhost:3000/goals?userId=${user.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         // se o backend retorna o array, ajustamos para o formato esperado
//         setMetas(
//           res.data.map((g) => ({
//             id: g.id,
//             titulo: g.name,
//             fonte: g.category || "",
//             status: g.status || "Não Iniciado", // ajuste conforme seu schema de backend
//             dataAdicionada: new Date(g.createdAt).toLocaleDateString("pt-BR"),
//             dataConclusao: new Date(g.finishBy).toLocaleDateString("pt-BR"),
//             prioridade: g.priority,
//             tempo: g.estimatedTime || 0, //alterei agr
//           }))
//         );
//       })
//       .catch((err) => console.error("Erro ao buscar metas:", err));
//   }, [user]);

//   // 3) callback que será passado para o modal:
//   // quando o backend retornar a nova meta, adicionamos ao estado
//   const handleGoalAdded = (novaMeta) => {
//     // converte o objeto retornado para o formato usado na UI
//     const metaFormatada = {
//       id: novaMeta.id,
//       titulo: novaMeta.name,
//       fonte: novaMeta.category || "",
//       status: novaMeta.status || "Não Iniciado",
//       dataAdicionada: new Date(novaMeta.createdAt).toLocaleDateString("pt-BR"),
//       dataConclusao: new Date(novaMeta.finishBy).toLocaleDateString("pt-BR"),
//       prioridade: novaMeta.priority,
//       tempo: novaMeta.estimatedTime || 0, 
//     };

//     setMetas((prev) => [metaFormatada, ...prev]);
//   };

//   const totalMinutos = metas.reduce((acc, meta) => acc + (meta.tempo || 0), 0);
//   const horas = Math.floor(totalMinutos / 60);
//   const minutos = totalMinutos % 60;


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
//               {/* 4) passamos user?.id e a callback */}
//               <AddTaskModal userId={user?.id} onGoalAdded={handleGoalAdded} />
//             </div>

//             {/* Cards de resumo (você pode recalcular com metas.length etc) */}
//             <div className="cards-container">
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={Task01Icon} className="icon-style" />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">{metas.length}</h2>
//                   <p>Total de metas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={AlertCircleIcon} className="icon-style" />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">
//                     {metas.filter((m) => m.status === "Não Iniciado").length}
//                   </h2>
//                   <p>Não iniciadas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={BookmarkCheck01Icon} className="icon-style" />
//                 </div>
//                 <div className="desc">
//                   <h2 className="number-task">
//                     {metas.filter((m) => m.status === "Finalizado").length}
//                   </h2>
//                   <p>Metas finalizadas</p>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="icons">
//                   <HugeiconsIcon icon={HourglassIcon} className="icon-style" />
//                 </div>
//                 <div className="desc hours">
//                   <div className="value-hours">
//                     <h2 className="number-task">{horas}</h2>
//                     <span>hrs,</span>
//                     <h2 className="number-task">{minutos}</h2>
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
//                           <HugeiconsIcon icon={PlayIcon} className="icon-style" />
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

//                       <td>{meta.tempo}

//                       </td>
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




import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";
import AddTaskModal from "./AddTaskModal";
import "./Goals.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Task01Icon,
  AlertCircleIcon,
  BookmarkCheck01Icon,
  HourglassIcon,
  PlayIcon,
  PauseIcon,
} from "@hugeicons/core-free-icons";

function Goals() {
  const [user, setUser] = useState(null);
  const [metas, setMetas] = useState([]);
  const timers = useRef({}); // guarda os intervalos ativos

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

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/goals?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMetas(
          res.data.map((g) => ({
            id: g.id,
            titulo: g.name,
            fonte: g.category || "",
            status: g.status || "Não Iniciado",
            dataAdicionada: new Date(g.createdAt).toLocaleDateString("pt-BR"),
            dataConclusao: new Date(g.finishBy).toLocaleDateString("pt-BR"),
            prioridade: g.priority,
            tempo: g.remainingTime || g.estimatedTime || 0,
            isRunning: false,
          }))
        );
      })
      .catch((err) => console.error("Erro ao buscar metas:", err));
  }, [user]);

  const handleGoalAdded = (novaMeta) => {
    const metaFormatada = {
      id: novaMeta.id,
      titulo: novaMeta.name,
      fonte: novaMeta.category || "",
      status: novaMeta.status || "Não Iniciado",
      dataAdicionada: new Date(novaMeta.createdAt).toLocaleDateString("pt-BR"),
      dataConclusao: new Date(novaMeta.finishBy).toLocaleDateString("pt-BR"),
      prioridade: novaMeta.priority,
      tempo: novaMeta.remainingTime || novaMeta.estimatedTime || 0,
      isRunning: false,
    };
    setMetas((prev) => [metaFormatada, ...prev]);
  };

  // Função para iniciar o cronômetro
  const startTimer = (metaId) => {
    setMetas((prev) =>
      prev.map((m) =>
        m.id === metaId
          ? { ...m, status: "Em Progresso", isRunning: true }
          : m
      )
    );

    timers.current[metaId] = setInterval(() => {
      setMetas((prev) =>
        prev.map((m) => {
          if (m.id === metaId) {
            const novoTempo = m.tempo - 1;

            // Atualiza backend com tempo restante
            axios.patch(`http://localhost:3000/goals/${metaId}`, {
              remainingTime: novoTempo,
              status: novoTempo <= 0 ? "Finalizado" : "Em Progresso",
            });

            if (novoTempo <= 0) {
              clearInterval(timers.current[metaId]);
              delete timers.current[metaId];
              return { ...m, tempo: 0, status: "Finalizado", isRunning: false };
            }
            return { ...m, tempo: novoTempo };
          }
          return m;
        })
      );
    }, 60000); // diminui a cada minuto (60.000 ms)
  };

  // Função para pausar o cronômetro
  const pauseTimer = (metaId) => {
    clearInterval(timers.current[metaId]);
    delete timers.current[metaId];
    setMetas((prev) =>
      prev.map((m) =>
        m.id === metaId ? { ...m, isRunning: false, status: "Pausado" } : m
      )
    );

    // Atualiza status no backend
    axios.patch(`http://localhost:3000/goals/${metaId}`, {
      status: "Pausado",
    });
  };

  const handlePlayPause = (metaId, isRunning) => {
    if (isRunning) {
      pauseTimer(metaId);
    } else {
      startTimer(metaId);
    }
  };

  const totalMinutos = metas.reduce((acc, meta) => acc + (meta.tempo || 0), 0);
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />
      <div className="content">
        <TopBar />

        <h2 className="gradient-text page-title small-title">Metas</h2>

        <div className="metas-container">
          <div className="centralizar-btn">
            <AddTaskModal userId={user?.id} onGoalAdded={handleGoalAdded} />
          </div>

          <div className="cards-container">
            <div className="card">
              <div className="icons">
                <HugeiconsIcon icon={Task01Icon} className="icon-style" />
              </div>
              <div className="desc">
                <h2 className="number-task">{metas.length}</h2>
                <p>Total de metas</p>
              </div>
            </div>

            <div className="card">
              <div className="icons">
                <HugeiconsIcon icon={AlertCircleIcon} className="icon-style" />
              </div>
              <div className="desc">
                <h2 className="number-task">
                  {metas.filter((m) => m.status === "Não Iniciado").length}
                </h2>
                <p>Não iniciadas</p>
              </div>
            </div>

            <div className="card">
              <div className="icons">
                <HugeiconsIcon icon={BookmarkCheck01Icon} className="icon-style" />
              </div>
              <div className="desc">
                <h2 className="number-task">
                  {metas.filter((m) => m.status === "Finalizado").length}
                </h2>
                <p>Metas finalizadas</p>
              </div>
            </div>

            <div className="card">
              <div className="icons">
                <HugeiconsIcon icon={HourglassIcon} className="icon-style" />
              </div>
              <div className="desc hours">
                <div className="value-hours">
                  <h2 className="number-task">{horas}</h2>
                  <span>hrs,</span>
                  <h2 className="number-task">{minutos}</h2>
                  <span>min</span>
                </div>
                <p>Horas acumuladas</p>
              </div>
            </div>
          </div>

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
                      <div
                        className="icons play"
                        onClick={() =>
                          handlePlayPause(meta.id, meta.isRunning)
                        }
                      >
                        <HugeiconsIcon
                          icon={meta.isRunning ? PauseIcon : PlayIcon}
                          className="icon-style"
                        />
                      </div>
                      <div className="descricao">
                        <strong>{meta.titulo}</strong>
                        <p className="fonte">{meta.fonte}</p>
                      </div>
                    </td>

                    <td>
                      {meta.status === "Finalizado" ? (
                        <CheckIcon className="icon-style done" />
                      ) : (
                        <span>{meta.status}</span>
                      )}
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

                    <td>
                      {meta.tempo > 0
                        ? `${Math.floor(meta.tempo / 60)}h ${meta.tempo % 60}m`
                        : "0h 0m"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Goals;