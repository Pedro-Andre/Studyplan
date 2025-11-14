import "./Home.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CheckmarkSquare03Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

// Registrar módulos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

function Home() {
  // Dados do gráfico de barras
  const barData = {
    labels: ["Faculdade", "Youtube", "Cursos", "Projeto 1", "Projeto 2"],
    datasets: [
      {
        label: "Horas dedicadas",
        data: [50, 30, 60, 80, 25],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        padding: 12,
        titleColor: "#cbd5e1",
        bodyColor: "#e2e8f0",
        borderColor: "rgba(99, 102, 241, 0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
        border: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: {
          color: "#ffffff0d",
        },
        border: {
          display: false,
        },
      },
    },
  };

  // Dados do gráfico de rosca (Doughnut)
  const doughnutData = {
    labels: ["Concluídas", "Em andamento", "Para fazer"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#22c55ecc", "#3b82f6cc", "#a855f7cc"],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172af2",
        padding: 12,
        titleColor: "#cbd5e1",
        bodyColor: "#e2e8f0",
        borderColor: "#6366f14d",
        borderWidth: 1,
      },
    },
  };

  // Dados do gráfico de área (Progresso ao longo do tempo)
  const areaData = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Metas Concluídas",
        data: [5, 8, 12, 15, 18, 22, 28, 32, 38, 42, 48, 55],
        fill: true,
        backgroundColor: "#6366f133",
        borderColor: "#6366f1cc",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#6366f1ff",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const areaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172af2",
        padding: 12,
        titleColor: "#cbd5e1",
        bodyColor: "#e2e8f0",
        borderColor: "#6366f14d",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
        border: {
          color: "#ffffff1a",
        },
      },
      y: {
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
        },
        grid: {
          color: "#ffffff0d",
        },
        border: {
          display: false,
        },
      },
    },
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
              <button className="action-btn">
                <HugeiconsIcon icon={Calendar03Icon} className="link-icon" />
                Organizar Calendário
              </button>
              <button className="action-btn">
                <HugeiconsIcon
                  icon={CheckmarkSquare03Icon}
                  className="link-icon"
                />
                Organizar Metas
              </button>
              <button className="action-btn">
                <HugeiconsIcon icon={Clock01Icon} className="link-icon" />
                Iniciar Timer
              </button>
            </div>
          </section>

          {/* Gráfico de barras */}
          <section className="card chart-card chart-bar">
            <h3 className="card-title">Atividades Recentes</h3>
            <div className="chart-wrapper">
              <Bar data={barData} options={barOptions} />
            </div>
          </section>

          {/* Progresso das metas (Doughnut) */}
          <section className="card chart-card chart-doughnut">
            <h3 className="card-title">Progresso das metas</h3>
            <div className="doughnut-container">
              <div className="chart-wrapper-doughnut">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <ul className="legend">
                <li>
                  <span className="dot green"></span>Concluídas
                </li>
                <li>
                  <span className="dot purple"></span>Para fazer
                </li>
                <li>
                  <span className="dot blue"></span>Em andamento
                </li>
              </ul>
            </div>
          </section>

          {/* Metas do dia */}
          <section className="card goals-card">
            <div className="goals-header">
              <h3 className="card-title">Metas do mês</h3>
              <select className="month-select">
                <option>Atual</option>
                <option>Janeiro</option>
                <option>Fevereiro</option>
                <option>Março</option>
              </select>
            </div>
            <div className="goals-list">
              <div className="goal-item">
                <span className="goal-label">Meta 1</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "70%" }}></div>
                </div>
                <span className="goal-percentage">70%</span>
              </div>
              <div className="goal-item">
                <span className="goal-label">Meta 2</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "50%" }}></div>
                </div>
                <span className="goal-percentage">50%</span>
              </div>
              <div className="goal-item">
                <span className="goal-label">Meta 3</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "30%" }}></div>
                </div>
                <span className="goal-percentage">30%</span>
              </div>
              <div className="goal-item">
                <span className="goal-label">Meta 4</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "55%" }}></div>
                </div>
                <span className="goal-percentage">55%</span>
              </div>
            </div>
          </section>

          {/* Gráfico de Área - Progresso ao longo do tempo */}
          <section className="card chart-card chart-area">
            <h3 className="card-title">Progresso ao longo do tempo</h3>
            <div className="chart-wrapper">
              <Line data={areaData} options={areaOptions} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
