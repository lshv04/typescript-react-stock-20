import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitch.css'; // Importa o CSS normal

const ThemeSwitch: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className={`themeSwitch ${isDark ? 'on' : 'off'}`}
      onClick={toggleTheme} // Alterna o tema ao clicar
    >
      {isDark ? 'Dark Mode' : 'Light Mode'} {/* Texto do botão */}
    </button>
  );
};

export default ThemeSwitch;
