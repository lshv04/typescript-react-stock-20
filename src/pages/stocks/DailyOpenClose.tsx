import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './StocksShared.css'; // Importa o CSS compartilhado

const DailyOpenClose: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Daily Open/Close</h1>
      <div className="content">
        <p>Informações sobre abertura e fechamento diário das ações.</p>
      </div>
    </div>
  );
};

export default DailyOpenClose;
