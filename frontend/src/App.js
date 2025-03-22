import React, { useState } from "react";
import Todo from "./Todo";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <Todo />
    </div>
  );
}

export default App;