import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GoalsHoursChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <section className="card chart-card chart-bar">
        <h3 className="card-title">Horas dedicadas nas Metas</h3>
        <div className="chart-wrapper">
          <p className="chart-text">Nenhuma meta com tempo registrado</p>
        </div>
      </section>
    );
  }

  // Transformar dados da API para o formato do gráfico
  const labels = data.map((meta) => meta.nome);
  const horasEmDecimal = data.map((meta) => meta.horas + meta.minutos / 60);

  const barData = {
    labels,
    datasets: [
      {
        label: "Horas dedicadas",
        data: horasEmDecimal,
        backgroundColor: "#649ffd",
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
        backgroundColor: "#0f172af2",
        padding: 12,
        titleColor: "#eee",
        bodyColor: "#eee",
        borderColor: "#6366f14d",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const meta = data[context.dataIndex];
            return `${meta.horas}h ${meta.minutos}min`;
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
          callback: function (value) {
            return value + "h";
          },
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
    <section className="card chart-card chart-bar">
      <h3 className="card-title">Horas dedicadas nas Metas</h3>
      <div className="chart-wrapper">
        <Bar data={barData} options={barOptions} />
      </div>
    </section>
  );
}

export default GoalsHoursChart;
