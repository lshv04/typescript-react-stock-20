import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './StocksShared.css'; // Importa o CSS compartilhado

const StockFinancial: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Stock Financial</h1>
      <div className="info">
        <p>Informação financeira 1</p>
      </div>
      <div className="info">
        <p>Informação financeira 2</p>
      </div>
    </div>
  );
};

export default StockFinancial;
