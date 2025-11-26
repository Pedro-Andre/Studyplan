import { NavLink } from "react-router-dom";

function GoalsProgressChart({ data }) {
  if (!data || !data.metas || data.metas.length === 0) {
    return (
      <section className="card goals-card">
        <div className="goals-header">
          <h3 className="card-title">Metas do mês</h3>
          {/* <select className="month-select">
            <option>Atual</option>
          </select> */}
        </div>
        <div className="goals-list">
          <p className="chart-text">Nenhuma meta para este mês</p>
        </div>
      </section>
    );
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  const gerarTextoProgresso = (meta) => {
    if (meta.status === "Finalizado") {
      return `100% - Concluída`;
    } else if (meta.progresso >= 100) {
      return `100% - Prazo vencido`;
    } else if (meta.progresso > 0) {
      return `${meta.progresso}% - Prazo: ${formatarData(meta.prazo)}`;
    } else {
      return `0% - Prazo: ${formatarData(meta.prazo)}`;
    }
  };

  // Função que controla a cor do prazo
  const getProgressColor = (meta) => {
    if (meta.status === "Finalizado") return "#10b981";
    if (meta.progresso >= 100) return "#ef4444";
    if (meta.progresso >= 70) return "#f59e0b";
    if (meta.progresso > 0) return "#3b82f6";
    return "#6b7280";
  };

  return (
    <section className="card goals-card">
      <div className="goals-header">
        <h3 className="card-title">Metas do mês - Prazos</h3>
        {/* <select className="month-select">
          <option>Atual</option>
        </select> */}
      </div>
      <div className="goals-list">
        {data.metas.map((meta) => (
          <NavLink to="/metas" key={meta.id}>
            <div className="goal-item">
              <span className="goal-label">{meta.nome}</span>

              {/* Barra de progresso permanece igual */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(meta.progresso, 100)}%` }}
                ></div>
              </div>

              {/* Texto colorido conforme a lógica */}
              <span
                className="goal-percentage"
                style={{ color: getProgressColor(meta) }}
              >
                {gerarTextoProgresso(meta)}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default GoalsProgressChart;
