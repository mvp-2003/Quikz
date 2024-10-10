import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import PropTypes from "prop-types";

const ToggleThemeButton = ({ toggleTheme, darkMode }) => {
  return (
    <button onClick={toggleTheme} className="flex justify-center items-center">
      <img src={darkMode ? sun : moon} alt="logo" />
    </button>
  );
};

ToggleThemeButton.propTypes = {
  toggleTheme: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ToggleThemeButton;
