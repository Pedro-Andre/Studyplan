import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";
import GoalsHoursChart from "../../components/Charts/GoalsHoursChart";
import GoalsStatus from "../../components/Charts/GoalsStatusChart";
import GoalsProgress from "../../components/Charts/GoalsProgressChart";
import GoalsMonthProgress from "../../components/Charts/GoalsMonthProgress";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CheckmarkSquare03Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { NavLink } from "react-router-dom";

function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />

      <div className="content">
        <TopBar />

        <div className="home-container">
          {/* Ações rápidas */}
          <section className="card quick-actions">
            <h3 className="card-title">O que deseja fazer?</h3>
            <div className="actions-grid">
              <NavLink to="/calendario" className="action-btn">
                <HugeiconsIcon icon={Calendar03Icon} className="link-icon" />
                <span>Organizar Calendário</span>
              </NavLink>
              <NavLink to="/metas" className="action-btn">
                <HugeiconsIcon
                  icon={CheckmarkSquare03Icon}
                  className="link-icon"
                />
                <span>Organizar Metas</span>
              </NavLink>
              <NavLink to="/pomodoro" className="action-btn">
                <HugeiconsIcon icon={Clock01Icon} className="link-icon" />
                <span>Iniciar Timer</span>
              </NavLink>
            </div>
          </section>

          {/* Gráficos */}
          {loading ? (
            <section className="card">
              <p className="loading-text">Carregando dados...</p>
            </section>
          ) : (
            <>
              {/* Gráfico 1: Horas dedicadas nas metas */}
              <GoalsHoursChart data={dashboardData?.horasPorMeta} />

              {/* Gráfico 2: Status das metas (Rosca) */}
              <GoalsStatus data={dashboardData?.statusMetas} />

              {/* Gráfico 3: Metas do mês (Progresso) */}
              <GoalsProgress data={dashboardData?.metasDoMes} />

              {/* Gráfico 4: Progresso ao longo do tempo */}
              <GoalsMonthProgress
                data={dashboardData?.progressoAoLongoDoTempo}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
