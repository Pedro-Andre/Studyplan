import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [firstCycleFinished, setFirstCycleFinished] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [hasStarted, setHasStarted] = useState(false); 

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            setIsRunning(false);
            if (!firstCycleFinished) {
              setFirstCycleFinished(true);
            } else {
              setCycles((c) => c + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, firstCycleFinished]);

  const handleStart = () => {
    if (!hasStarted) setHasStarted(true); 
    if (time === 0) {
      setTime(25 * 60);
      setFirstCycleFinished(false);
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setFirstCycleFinished(false);
    setCycles(0);
    setHasStarted(false); 
  };

  const formatTime = () => {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pomodoro Timer</h1>

      <h2 style={styles.subtitle}>
        {firstCycleFinished
          ? "Ótimo trabalho! Descanse um pouco e clique em começar quando estiver pronto."
          : "Hora de focar!"}
      </h2>

      <div style={styles.timer}>{formatTime()}</div>

      <div style={styles.buttons}>
        <button
          style={isRunning ? styles.buttonPause : styles.buttonStart}
          onClick={() => {
            if (isRunning) {
              setIsRunning(false);
            } else if (!isRunning && time === 25 * 60) {
              handleStart();
            } else {
              setIsRunning(true);
            }
          }}
        >
          {isRunning
            ? "Pausa"
            : time === 25 * 60
            ? "Começar"
            : "Continuar"}
        </button>
        
        {hasStarted && (
          <button style={styles.buttonReset} onClick={handleReset}>
            Resetar
          </button>
        )}
      </div>

      <p style={styles.cycles}>Pomodoros Completos: {cycles}</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "#f5f5f5",
    padding: "40px",
    borderRadius: "10px",
    width: "320px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
  subtitle: {
    marginTop: "0",
    color: "#666",
    fontWeight: "normal",
    fontSize: "18px",
    minHeight: "24px",
  },
  timer: {
    fontSize: "72px",
    fontWeight: "bold",
    margin: "30px 0",
    color: "#1E3A8A",
    fontVariantNumeric: "tabular-nums",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  buttonStart: {
    padding: "12px 28px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2563EB",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  buttonPause: {
    padding: "12px 28px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#EF4444",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  buttonReset: {
    padding: "12px 28px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#6B7280",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  cycles: {
    marginTop: "25px",
    color: "#333",
    fontWeight: "bold",
  },
};

export default Pomodoro;
