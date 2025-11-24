import { useState, useEffect, useRef } from "react";
import "./Pomodoro.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  PauseIcon,
  Settings03Icon,
} from "@hugeicons/core-free-icons";

function PomodoroTimer() {
  const [mode, setMode] = useState("timer");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [customTimer, setCustomTimer] = useState(25);
  const [tempCustomTimer, setTempCustomTimer] = useState(25);
  const [alarmOn, setAlarmOn] = useState(false);
  const [tempAlarmOn, setTempAlarmOn] = useState(false);

  const DEFAULT_TIMER = 25;
  const DEFAULT_ALARM = false;
  const INTERVAL_START = 5 * 60;

  // === ÁUDIO ===
  const alarmAudioRef = useRef(new Audio("/alarm.mp3"));
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

  // Função universal para parar o áudio
  function stopAlarmSound() {
    const audio = alarmAudioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsAlarmPlaying(false);

    // Impede que o useEffect toque o alarme de novo
    setHasStarted(false);
  }

  // === LÓGICA DO TIMER ===
  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    }

    // QUANDO CHEGA EM ZERO
    if (time === 0 && hasStarted && !isAlarmPlaying) {
      
      // Se o alarme estiver desligado, não toca
      if (!alarmOn) {
        setIsRunning(false);
        return;
      }

      setIsRunning(false);

      // Toca o alarme
      alarmAudioRef.current.play();
      setIsAlarmPlaying(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, alarmOn, hasStarted, isAlarmPlaying]);

  // Alternar modo Timer ↔ Intervalo
  function switchMode(newMode) {
    stopAlarmSound();
    setMode(newMode);
    setHasStarted(false);
    setIsRunning(false);

    setTime(newMode === "timer" ? customTimer * 60 : INTERVAL_START);
  }

  function fmt(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  useEffect(() => {
    setTime(0);
  }, []);

  function startOrRestart() {
    stopAlarmSound();

    if (!hasStarted) setHasStarted(true);

    if (time === 0) {
      setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
    }

    setIsRunning(true);
  }

  function pause() {
    stopAlarmSound();
    setIsRunning(false);
  }

  function reset() {
    stopAlarmSound();

    setIsRunning(false);
    setHasStarted(false);
    setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
  }

  // === CONFIGURAÇÕES ===
  function handleSaveSettings() {
    stopAlarmSound();

    setCustomTimer(tempCustomTimer);
    setAlarmOn(tempAlarmOn);
    setShowSettings(false);

    if (mode === "timer") {
      setTime(tempCustomTimer * 60);
    }
  }

  function handleResetSettings() {
    stopAlarmSound();

    setTempCustomTimer(DEFAULT_TIMER);
    setTempAlarmOn(DEFAULT_ALARM);
    setCustomTimer(DEFAULT_TIMER);
    setAlarmOn(DEFAULT_ALARM);
    setShowSettings(false);

    if (mode === "timer") {
      setTime(DEFAULT_TIMER * 60);
    }
  }

  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />

      <div className="content">
        <TopBar />

        <h2 className="gradient-text page-title">Pomodoro</h2>

        <div className="timer-container">
          <div className="outer">

            {/* Botão de Configurações */}
            <button
              className="settings-btn"
              onClick={() => {
                stopAlarmSound();
                setTempCustomTimer(customTimer);
                setTempAlarmOn(alarmOn);
                setShowSettings(!showSettings);
              }}
            >
              <HugeiconsIcon icon={Settings03Icon} className="icon" />
            </button>

            {/* Menu de Configurações */}
            {showSettings && (
              <div className="settings-menu">
                <label className="settings-label">
                  Use os botões para ajustar o tempo ou personalize.
                  <div className="timer-controls">
                    <button
                      className="adjust-btn"
                      onClick={() =>
                        setTempCustomTimer((prev) => Math.max(1, prev - 10))
                      }
                    >
                      -10
                    </button>

                    <input
                      type="number"
                      value={tempCustomTimer}
                      onChange={(e) =>
                        setTempCustomTimer(Number(e.target.value))
                      }
                      min={1}
                      className="settings-input timer-input"
                    />

                    <button
                      className="adjust-btn"
                      onClick={() => setTempCustomTimer((prev) => prev + 10)}
                    >
                      +10
                    </button>
                  </div>
                </label>

                <label className="settings-label alarm-label">
                  Alarme:
                  <input
                    type="checkbox"
                    checked={tempAlarmOn}
                    onChange={() => setTempAlarmOn(!tempAlarmOn)}
                    className="settings-checkbox"
                  />
                </label>

                <div className="settings-buttons">
                  <button
                    className="btn-settings reset-btn-2"
                    onClick={handleResetSettings}
                  >
                    Redefinir
                  </button>

                  <button
                    className="btn-settings save-btn"
                    onClick={handleSaveSettings}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}

            <div className="mode-bar">
              <button
                className={`mode-btn ${
                  mode === "timer" ? "selected-timer" : ""
                }`}
                onClick={() => switchMode("timer")}
              >
                Timer
              </button>

              <button
                className={`mode-btn ${
                  mode === "interval" ? "selected-interval" : ""
                }`}
                onClick={() => switchMode("interval")}
              >
                Intervalo
              </button>
            </div>

            <div className="clock-container">
              <svg width="350" height="350" viewBox="0 0 310 310">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#379cff" />
                    <stop offset="100%" stopColor="#183c7a" />
                  </linearGradient>
                </defs>
                <circle
                  cx="154"
                  cy="154"
                  r="148"
                  stroke="url(#grad)"
                  strokeWidth="7"
                  fill="none"
                />
              </svg>

              <div className="clock">
                <span className="time-text">{fmt(time)}</span>

                <button
                  className="play-btn"
                  onClick={isRunning ? pause : startOrRestart}
                >
                  {!isRunning ? (
                    <HugeiconsIcon icon={PlayIcon} className="icon" />
                  ) : (
                    <HugeiconsIcon icon={PauseIcon} className="icon" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão Parar Alarme */}
            {isAlarmPlaying && (
              <button onClick={stopAlarmSound} className="reset-btn">
                Parar Alarme
              </button>
            )}

            {/* Botão Reset */}
            {hasStarted && (
              <button onClick={reset} className="reset-btn screen">
                Resetar
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default PomodoroTimer;