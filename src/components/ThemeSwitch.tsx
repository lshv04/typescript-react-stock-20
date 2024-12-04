import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitch.css'; 

const ThemeSwitch: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className={`themeSwitch ${isDark ? 'on' : 'off'}`}
      onClick={toggleTheme} // Alterna o tema ao clicar
    >
      {isDark ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-brightness-high"></i>} {/* Texto do botão */}
    </button>
  );
};

export default ThemeSwitch;
