import { useEffect, useState } from "react";
import ToggleThemeButton from "./components/ToggleThemeButton";
import Button from "./components/Button";
import { easeIn, easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <div className="bg-radial-light text-primary-light dark:text-primary-dark dark:bg-radial-dark absolute inset-0 -z-10 h-full w-full flex justify-center items-center">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: easeIn }}
        className="absolute right-3 top-4"
      >
        <ToggleThemeButton toggleTheme={toggleTheme} darkMode={darkMode} />
      </motion.header>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIn }}
          className="text-[35px] md:text-[75px] font-poppins font-bold italic py-0"
        >
          Welcome to <span className="text-[#7021BE]">Q</span>UIKZ
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: easeInOut }}
          className="text-[28px] md:text-[55px] tracking-wide bottom-3 md:bottom-8 font-poppins font-medium italic relative"
        >
          a user friendly quiz app
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: easeInOut }}
          className="flex justify-center items-center gap-20"
        >
          <Link to="/join">
            <Button Text={"Join a quiz"} />
          </Link>
          <Link to="/create">
            <Button Text={"Create quiz"} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
export default App;
