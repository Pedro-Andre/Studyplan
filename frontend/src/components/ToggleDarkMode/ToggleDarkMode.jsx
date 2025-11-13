import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import "./ToggleDarkMode.css";

const ToggleDarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") setDarkMode();

  const toggleTheme = (e) => {
    if (e.target.checked) setLightMode();
    else setDarkMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <HugeiconsIcon icon={Sun01Icon} className="link-icon sun" />
        <HugeiconsIcon icon={Moon02Icon} className="link-icon moon" />
      </label>
    </div>
  );
};

export default ToggleDarkMode;
