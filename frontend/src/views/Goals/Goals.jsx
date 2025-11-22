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
  LocationCheck01Icon,
  HourglassIcon,
  PlayIcon,
  PauseIcon,
  ArrowDown01Icon,
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
  const [elapsedTimes, setElapsedTimes] = useState({});
  
  // Estados para dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

      const sessions = {};
      const elapsed = {};
      
      for (const goal of response.data.goals) {
        const activeSession = goal.timeSessions.find((s) => !s.endTime);
        if (activeSession) {
          sessions[goal.id] = activeSession;
          const startTime = new Date(activeSession.startTime);
          const now = new Date();
          const elapsedSeconds = Math.floor((now - startTime) / 1000);
          elapsed[goal.id] = elapsedSeconds;
        }
      }
      
      setActiveSessions(sessions);
      setElapsedTimes(elapsed);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimes((prev) => {
        const updated = { ...prev };
        Object.keys(activeSessions).forEach((goalId) => {
          if (updated[goalId] !== undefined) {
            updated[goalId] += 1;
          }
        });
        return updated;
      });

      setStats((prevStats) => {
        const totalElapsed = Object.values(elapsedTimes).reduce((sum, time) => sum + time, 0);
        const metasBase = metas.reduce((sum, meta) => sum + meta.totalTime, 0);
        const totalSeconds = metasBase + totalElapsed;
        
        return {
          ...prevStats,
          totalHours: Math.floor(totalSeconds / 3600),
          totalMinutes: Math.floor((totalSeconds % 3600) / 60),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSessions, elapsedTimes, metas]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

      setElapsedTimes((prev) => ({
        ...prev,
        [goalId]: 0,
      }));

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

      setElapsedTimes((prev) => {
        const newElapsed = { ...prev };
        delete newElapsed[goalId];
        return newElapsed;
      });

      fetchGoals();
    } catch (error) {
      console.error("Erro ao pausar:", error);
      alert(error.response?.data?.error || "Erro ao pausar cronômetro");
    }
  };

  // Atualizar status
  const handleStatusChange = async (goalId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:3000/goals/${goalId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOpenDropdown(null);
      fetchGoals();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert(error.response?.data?.error || "Erro ao atualizar status");
    }
  };

  // Atualizar prioridade
  const handlePriorityChange = async (goalId, newPriority) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/goals/${goalId}`,
        { priority: newPriority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOpenDropdown(null);
      fetchGoals();
    } catch (error) {
      console.error("Erro ao atualizar prioridade:", error);
      alert(error.response?.data?.error || "Erro ao atualizar prioridade");
    }
  };

  // Formatar tempo
  const formatTime = (totalSeconds, goalId) => {
    const sessionTime = activeSessions[goalId] ? (elapsedTimes[goalId] || 0) : 0;
    const seconds = totalSeconds + sessionTime;
    
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

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMetas = metas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(metas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }
    
    return buttons;
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
                  {currentMetas.length === 0 ? (
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
                    currentMetas.map((meta) => (
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
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <span
                              className={`status ${
                                meta.status === "Em Progresso"
                                  ? "progresso"
                                  : meta.status === "Finalizado"
                                  ? "finalizado"
                                  : "nao-iniciado"
                              }`}
                              onClick={() => setOpenDropdown(openDropdown === `status-${meta.id}` ? null : `status-${meta.id}`)}
                              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
                            >
                              {meta.status}
                              <HugeiconsIcon icon={ArrowDown01Icon} style={{ width: "1.2rem", height: "1.2rem" }} />
                            </span>

                            {openDropdown === `status-${meta.id}` && (
                              <div ref={dropdownRef} className="dropdown-menu">
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handleStatusChange(meta.id, "Não Iniciado")}
                                >
                                  Não Iniciado
                                </div>
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handleStatusChange(meta.id, "Em Progresso")}
                                >
                                  Em Progresso
                                </div>
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handleStatusChange(meta.id, "Finalizado")}
                                >
                                  Finalizado
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        <td>{formatDate(meta.createdAt)}</td>
                        <td>{formatDate(meta.finishBy)}</td>

                        <td>
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <span
                              className={`prioridade ${
                                meta.priority === "Alta"
                                  ? "alta"
                                  : meta.priority === "Médio"
                                  ? "media"
                                  : "baixa"
                              }`}
                              onClick={() => setOpenDropdown(openDropdown === `priority-${meta.id}` ? null : `priority-${meta.id}`)}
                              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                            >
                              {meta.priority}
                              <HugeiconsIcon icon={ArrowDown01Icon} style={{ width: "1.2rem", height: "1.2rem" }} />
                            </span>

                            {openDropdown === `priority-${meta.id}` && (
                              <div ref={dropdownRef} className="dropdown-menu">
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handlePriorityChange(meta.id, "Baixo")}
                                >
                                  Baixo
                                </div>
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handlePriorityChange(meta.id, "Médio")}
                                >
                                  Médio
                                </div>
                                <div 
                                  className="dropdown-item"
                                  onClick={() => handlePriorityChange(meta.id, "Alta")}
                                >
                                  Alta
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        <td>
                          {formatTime(meta.totalTime, meta.id)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            {metas.length > 0 && (
              <div className="centralizar-btn">
                <div className="paginacao">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                  >
                    Anterior
                  </button>
                  
                  {getPaginationButtons().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? "ativo" : ""}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                  >
                    Próx
                  </button>
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