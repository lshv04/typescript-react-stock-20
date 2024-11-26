import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './StocksShared.css'; // Importa o CSS compartilhado

const TickerNews: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Ticker News</h1>
      <div className="newsItem">
        <p>Notícia 1 sobre o mercado.</p>
      </div>
      <div className="newsItem">
        <p>Notícia 2 sobre o mercado.</p>
      </div>
    </div>
  );
};

export default TickerNews;
