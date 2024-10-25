import { useEffect, useState } from "react";
import Home from "./components/Home";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((e) => !e);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Home toggleTheme={toggleTheme} darkMode={darkMode}/>
    </>
  );
}
export default App;
