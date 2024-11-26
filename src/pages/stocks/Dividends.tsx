import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './StocksShared.css'; // Importa o CSS compartilhado

const Dividends: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Dividends</h1>
     <p>Dividendos AAPL</p>
    </div>
  );
};

export default Dividends;
