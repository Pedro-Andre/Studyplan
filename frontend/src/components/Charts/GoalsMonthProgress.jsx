import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function GoalsMonthProgress({ data }) {
  if (!data || data.length === 0) {
    return (
      <section className="card chart-card chart-area">
        <h3 className="card-title">Progresso ao longo do tempo</h3>
        <div className="chart-wrapper">
          <p className="chart-text">Nenhuma meta concluída ainda</p>
        </div>
      </section>
    );
  }

  // Transformar dados da API para o formato do gráfico
  const labels = data.map((item) => item.mes);
  const quantidades = data.map((item) => item.quantidade);

  const areaData = {
    labels,
    datasets: [
      {
        label: "Metas Concluídas",
        data: quantidades,
        fill: true,
        backgroundColor: "#649ffd40",
        borderColor: "#649ffd",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#234986",
        pointBorderColor: "#bbb",
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
        titleColor: "#eee",
        bodyColor: "#eee",
        borderColor: "#6366f14d",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} meta${
              context.parsed.y !== 1 ? "s" : ""
            } concluída${context.parsed.y !== 1 ? "s" : ""}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: { size: 12, weight: 600 },
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
          color: "#6b7280",
          font: { size: 12, weight: 600 },
          stepSize: 1,
        },
        grid: {
          color: "#6b728050",
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="card chart-card chart-area">
      <h3 className="card-title">Progresso ao longo do tempo</h3>
      <div className="chart-wrapper">
        <Line data={areaData} options={areaOptions} />
      </div>
    </section>
  );
}

export default GoalsMonthProgress;
