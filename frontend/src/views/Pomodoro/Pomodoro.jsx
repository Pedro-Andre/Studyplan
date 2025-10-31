import { useState, useEffect } from "react";
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
  const [customTimer, setCustomTimer] = useState(25); // minutos
  const [tempCustomTimer, setTempCustomTimer] = useState(25);
  const [alarmOn, setAlarmOn] = useState(false);
  const [tempAlarmOn, setTempAlarmOn] = useState(false);

  const DEFAULT_TIMER = 25;
  const DEFAULT_ALARM = false;
  const INTERVAL_START = 5 * 60;

  // alarme
  const alarmAudio = new Audio("/alarm.mp3");
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    }
    if (time === 0 && hasStarted && !isAlarmPlaying) {
      setIsRunning(false);
      if (alarmOn) {
        alarmAudio.play();
        setIsAlarmPlaying(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time, alarmOn, hasStarted, isAlarmPlaying]);

  function switchMode(newMode) {
    setMode(newMode);
    setIsRunning(false);
    setHasStarted(false);
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
    if (!hasStarted) setHasStarted(true);
    if (time === 0) {
      setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
      setIsRunning(true);
    } else {
      setIsRunning(true);
    }
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
    setIsRunning(false);
    setHasStarted(false);
  }

  function handleSaveSettings() {
    setCustomTimer(tempCustomTimer);
    setAlarmOn(tempAlarmOn);
    setShowSettings(false);
    if (mode === "timer") setTime(tempCustomTimer * 60);
  }

  function handleResetSettings() {
    setTempCustomTimer(DEFAULT_TIMER);
    setTempAlarmOn(DEFAULT_ALARM);
    setCustomTimer(DEFAULT_TIMER);
    setAlarmOn(DEFAULT_ALARM);
    setShowSettings(false);
    if (mode === "timer") setTime(DEFAULT_TIMER * 60);
  }

  function stopAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    setIsAlarmPlaying(false);
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
            {/* botão de configuração */}
            <button
              className="settings-btn"
              onClick={() => {
                setTempCustomTimer(customTimer);
                setTempAlarmOn(alarmOn);
                setShowSettings(!showSettings);
              }}
            >
              <HugeiconsIcon icon={Settings03Icon} className="icon" />
            </button>

            {/* menu de configurações */}
            {showSettings && (
              <div className="settings-menu">
                <label className="settings-label">
                  Use os botões para aumentar/diminuir o tempo ou personalize.
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

              {/* Clock */}
              <div className="clock">
                <span className="time-text">{fmt(time)}</span>
                <button
                  className="play-btn"
                  onClick={isRunning ? pause : startOrRestart}
                >
                  {!isRunning ? (
                    <HugeiconsIcon icon={PlayIcon} className="icon" />
                  ) : (
                    // <span className="play-icon">▶</span>
                    <HugeiconsIcon icon={PauseIcon} className="icon" />
                    // <span className="pause-icon">❚❚</span>
                  )}
                </button>
              </div>
            </div>

            {/* botão de parar o alarme */}
            {isAlarmPlaying && (
              <button onClick={stopAlarm} className="reset-btn">
                Parar Alarme
              </button>
            )}

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

// ORIGINAL = Styles in file e inline, sem arquivo externo
// import React, { useState, useEffect } from "react";

// function PomodoroTimer() {
//   const [mode, setMode] = useState("timer");
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [hasStarted, setHasStarted] = useState(false);

//   const [showSettings, setShowSettings] = useState(false);
//   const [customTimer, setCustomTimer] = useState(25); // minutos
//   const [tempCustomTimer, setTempCustomTimer] = useState(25);
//   const [alarmOn, setAlarmOn] = useState(false);
//   const [tempAlarmOn, setTempAlarmOn] = useState(false);

//   const DEFAULT_TIMER = 25;
//   const DEFAULT_ALARM = false;
//   const INTERVAL_START = 5 * 60;

//   // alarme
//   const alarmAudio = new Audio("/alarm.mp3");
//   const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

//   useEffect(() => {
//     let interval = null;
//     if (isRunning && time > 0) {
//       interval = setInterval(() => setTime((t) => t - 1), 1000);
//     }
//     if (time === 0 && hasStarted && !isAlarmPlaying) {
//       setIsRunning(false);
//       if (alarmOn) {
//         alarmAudio.play();
//         setIsAlarmPlaying(true);
//       }
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, time, alarmOn, hasStarted, isAlarmPlaying]);

//   function switchMode(newMode) {
//     setMode(newMode);
//     setIsRunning(false);
//     setHasStarted(false);
//     setTime(newMode === "timer" ? customTimer * 60 : INTERVAL_START);
//   }

//   function fmt(sec) {
//     const m = String(Math.floor(sec / 60)).padStart(2, "0");
//     const s = String(sec % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   }

//   useEffect(() => {
//     setTime(0);
//   }, []);

//   function startOrRestart() {
//     if (!hasStarted) setHasStarted(true);
//     if (time === 0) {
//       setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
//       setIsRunning(true);
//     } else {
//       setIsRunning(true);
//     }
//   }

//   function pause() {
//     setIsRunning(false);
//   }

//   function reset() {
//     setTime(mode === "timer" ? customTimer * 60 : INTERVAL_START);
//     setIsRunning(false);
//     setHasStarted(false);
//   }

//   function handleSaveSettings() {
//     setCustomTimer(tempCustomTimer);
//     setAlarmOn(tempAlarmOn);
//     setShowSettings(false);
//     if (mode === "timer") setTime(tempCustomTimer * 60);
//   }

//   function handleResetSettings() {
//     setTempCustomTimer(DEFAULT_TIMER);
//     setTempAlarmOn(DEFAULT_ALARM);
//     setCustomTimer(DEFAULT_TIMER);
//     setAlarmOn(DEFAULT_ALARM);
//     setShowSettings(false);
//     if (mode === "timer") setTime(DEFAULT_TIMER * 60);
//   }

//   function stopAlarm() {
//     alarmAudio.pause();
//     alarmAudio.currentTime = 0;
//     setIsAlarmPlaying(false);
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div style={S.header}>
//         <h1 style={S.title}>Timer Pomodoro</h1>
//         <p style={S.subtitle}>
//           É hora de focar e fazer o que precisa ser feito!
//         </p>
//       </div>

//       <div style={S.outer}>
//         {/* botão de configuração */}
//         <button
//           style={S.settingsBtn}
//           onClick={() => {
//             setTempCustomTimer(customTimer);
//             setTempAlarmOn(alarmOn);
//             setShowSettings(!showSettings);
//           }}
//         >
//           ⚙️
//         </button>

//         {/* menu de configurações */}
//         {showSettings && (
//           <div style={S.settingsMenu}>
//             <label style={S.settingsLabel}>
//               Use os botões para aumentar/diminuir o tempo ou personalize.
//               <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//                 <button
//                   style={S.adjustBtn}
//                   onClick={() =>
//                     setTempCustomTimer((prev) => Math.max(1, prev - 10))
//                   }
//                 >
//                   -10
//                 </button>
//                 <input
//                   type="number"
//                   value={tempCustomTimer}
//                   onChange={(e) => setTempCustomTimer(Number(e.target.value))}
//                   min={1}
//                   style={{ ...S.settingsInput, width: 70, textAlign: "center" }}
//                 />
//                 <button
//                   style={S.adjustBtn}
//                   onClick={() => setTempCustomTimer((prev) => prev + 10)}
//                 >
//                   +10
//                 </button>
//               </div>
//             </label>
//             <label
//               style={{
//                 ...S.settingsLabel,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               Alarme:
//               <input
//                 type="checkbox"
//                 checked={tempAlarmOn}
//                 onChange={() => setTempAlarmOn(!tempAlarmOn)}
//                 style={S.settingsCheckbox}
//               />
//             </label>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: 10,
//               }}
//             >
//               <button style={S.resetBtnSettings} onClick={handleResetSettings}>
//                 Redefinir
//               </button>
//               <button style={S.saveBtnSettings} onClick={handleSaveSettings}>
//                 Salvar
//               </button>
//             </div>
//           </div>
//         )}

//         <div style={S.modeBar}>
//           <button
//             style={
//               mode === "timer" ? { ...S.modeBtn, ...S.selectedBtn } : S.modeBtn
//             }
//             onClick={() => switchMode("timer")}
//           >
//             Timer
//           </button>
//           <button
//             style={
//               mode === "interval"
//                 ? { ...S.modeBtn, ...S.selectedBtn2 }
//                 : S.modeBtn
//             }
//             onClick={() => switchMode("interval")}
//           >
//             Intervalo
//           </button>
//         </div>

//         <div style={S.circleContainer}>
//           <svg width="308" height="308" viewBox="0 0 308 308">
//             <defs>
//               <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#379cff" />
//                 <stop offset="100%" stopColor="#183c7a" />
//               </linearGradient>
//             </defs>
//             <circle
//               cx="154"
//               cy="154"
//               r="148"
//               stroke="url(#grad)"
//               strokeWidth="7"
//               fill="none"
//             />
//           </svg>
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <span style={S.timeText}>{fmt(time)}</span>
//             <button
//               style={S.playBtn}
//               onClick={isRunning ? pause : startOrRestart}
//             >
//               {!isRunning ? (
//                 <span style={S.playIcon}>▶</span>
//               ) : (
//                 <span style={S.pauseIcon}>❚❚</span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* botão de parar o alarme */}
//         {isAlarmPlaying && (
//           <button onClick={stopAlarm} style={S.resetBtn}>
//             Parar Alarme
//           </button>
//         )}

//         {hasStarted && (
//           <button onClick={reset} style={S.resetBtn}>
//             Resetar
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// const S = {
//   header: {
//     alignSelf: "flex-start",
//     marginBottom: 20,
//     marginLeft: 30,
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 640,
//     color: "#21264f",
//     margin: 0,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#1f2029",
//     margin: "4px 0 0 0",
//   },
//   outer: {
//     width: "100%",
//     maxWidth: 800,
//     margin: "45px auto 40px auto",
//     background: "#fff",
//     padding: "45px 30px 48px 30px",
//     borderRadius: 17,
//     boxShadow: "0 1px 14px #245ab813",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     position: "relative",
//   },
//   settingsBtn: {
//     position: "absolute",
//     top: 15,
//     right: 15,
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: 24,
//   },
//   settingsMenu: {
//     position: "absolute",
//     top: 55,
//     right: 15,
//     background: "#ffffff",
//     border: "1px solid #e0e0e0",
//     borderRadius: 12,
//     padding: "20px 16px",
//     boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
//     zIndex: 10,
//     display: "flex",
//     flexDirection: "column",
//     gap: 15,
//     minWidth: 220,
//     fontFamily: "'Poppins','Arial',sans-serif",
//   },
//   settingsLabel: {
//     display: "flex",
//     flexDirection: "column",
//     fontSize: 14,
//     fontWeight: 500,
//     color: "#2c3e50",
//     gap: 6,
//   },
//   settingsInput: {
//     padding: "8px 10px",
//     border: "1px solid #cbd5e1",
//     borderRadius: 8,
//     fontSize: 14,
//     outline: "none",
//     transition: "border-color 0.2s",
//     MozAppearance: "textfield",
//     WebkitAppearance: "none",
//     appearance: "none",
//   },
//   settingsCheckbox: {
//     width: 18,
//     height: 18,
//     accentColor: "#234986",
//     cursor: "pointer",
//   },
//   adjustBtn: {
//     padding: "6px 10px",
//     background: "#f1f5f9",
//     border: "1px solid #cbd5e1",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontWeight: 600,
//   },
//   resetBtnSettings: {
//     background: "#5060a3",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontWeight: 600,
//   },
//   saveBtnSettings: {
//     background: "#2329cc",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: 6,
//     cursor: "pointer",
//     fontWeight: 600,
//   },
//   modeBar: {
//     display: "flex",
//     gap: 9,
//     marginBottom: 34,
//     width: "100%",
//     justifyContent: "center",
//   },
//   modeBtn: {
//     padding: "8px 42px",
//     border: "1.7px solid #b9dafc",
//     borderRadius: 10,
//     background: "#fff",
//     color: "#223857",
//     fontWeight: 500,
//     fontSize: 21,
//     cursor: "pointer",
//     transition: "all .18s",
//     outline: "none",
//   },
//   selectedBtn: {
//     background: "linear-gradient(90deg,#59b3fa 35%,#234986 100%)",
//     color: "#fff",
//     border: "none",
//     fontWeight: 600,
//     boxShadow: "0 2px 19px #0858a814",
//   },
//   selectedBtn2: {
//     background: "#fff",
//     color: "#234986",
//     border: "2px solid #234986",
//     fontWeight: 600,
//     boxShadow: "0 2px 19px #0858a809",
//   },
//   timeText: {
//     fontSize: 77,
//     fontWeight: 700,
//     color: "#234986",
//     marginTop: 10,
//     marginBottom: 60,
//     letterSpacing: ".7px",
//     fontFamily: "'Poppins', 'Arial', sans-serif",
//   },
//   playBtn: {
//     background: "none",
//     border: "none",
//     outline: "none",
//     cursor: "pointer",
//     fontSize: 46,
//     fontWeight: 700,
//     color: "#234986",
//     position: "absolute",
//     bottom: 60,
//     left: "50%",
//     transform: "translateX(-50%)",
//   },
//   playIcon: {
//     fontSize: 46,
//     fontWeight: 700,
//   },
//   pauseIcon: {
//     fontSize: 46,
//     color: "#234986",
//     fontWeight: 700,
//   },
//   resetBtn: {
//     marginTop: 25,
//     background: "#6B7280",
//     color: "#fff",
//     border: "none",
//     padding: "12px 32px",
//     borderRadius: 8,
//     fontSize: 17,
//     cursor: "pointer",
//     fontWeight: 600,
//     transition: "background-color 0.3s ease",
//   },
//   circleContainer: {
//     position: "relative",
//     width: 308,
//     height: 308,
//     borderRadius: "50%",
//     boxShadow: "4px 4px 12px rgba(0,0,0,0.12)",
//   },
// };

export default PomodoroTimer;
