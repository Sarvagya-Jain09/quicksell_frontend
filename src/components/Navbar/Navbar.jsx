import React from "react";
import "./Navbar.css";
import DisplayOptions from "../DisplayOptions/DisplayOptions";


export default function Navbar({ grouping, ordering, setGrouping, setOrdering, theme, switchTheme }) {
  return (
    <div className="navbar">
      <DisplayOptions grouping={grouping} ordering={ordering} setGrouping={setGrouping} setOrdering={setOrdering} />
      <div className="logo">
        {theme === "dark" ? <img src="favicon.png" alt="Logo" /> : <img src="logoDark.png" alt="Logo" />}
        <h2>Plan It ~</h2>
      </div>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{ transition: "all 200ms" }}
          onChange={switchTheme}
        />
        <label htmlFor="checkbox" className="label">
          <i className="fas fa-sun fa-sm"></i>
          <i className="fas fa-moon fa-sm"></i>
          <div className="ball" />
        </label>
      </div>
    </div>
  );
}
