import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function GoalsStatus({ data }) {
  if (!data) {
    return (
      <section className="card chart-card chart-doughnut">
        <h3 className="card-title">Progresso das metas</h3>
        <div className="doughnut-container">
          <p className="chart-text">Carregando...</p>
        </div>
      </section>
    );
  }

  const doughnutData = {
    labels: ["Concluídas", "Em andamento", "Não iniciadas"],
    datasets: [
      {
        data: [data.concluidas, data.emAndamento, data.naoIniciadas],
        backgroundColor: ["#22c55ecc", "#3b82f6cc", "#a855f7cc"],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172af2",
        padding: 12,
        titleColor: "#eee",
        bodyColor: "#eee",
        borderColor: "#6366f14d",
        borderWidth: 1,
      },
    },
  };

  return (
    <section className="card chart-card chart-doughnut">
      <h3 className="card-title">Progresso das metas</h3>
      <div className="doughnut-container">
        <div className="chart-wrapper-doughnut">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        <ul className="legend">
          <li>
            <span className="dot green"></span>Concluídas ({data.concluidas})
          </li>
          <li>
            <span className="dot blue"></span>Em andamento ({data.emAndamento})
          </li>
          <li>
            <span className="dot purple"></span>Não iniciadas (
            {data.naoIniciadas})
          </li>
        </ul>
      </div>
    </section>
  );
}

export default GoalsStatus;
