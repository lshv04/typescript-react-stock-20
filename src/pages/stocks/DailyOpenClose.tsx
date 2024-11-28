import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useInputContext } from '../../context/InputContext'; // Importa o InputContext
import './StocksShared.css'; // Importa o CSS compartilhado

const DailyOpenClose: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema
  const { inputValue } = useInputContext(); // Obtém o valor do contexto de input

  return (
    <div className={`container bord ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Daily Open/Close</h1>
      <div className="content">
        <p>Informações sobre abertura e fechamento diário das ações.</p>
        {/* Exibe o valor do contexto */}
        <p>
          <strong>Valor compartilhado do Input:</strong> {inputValue}
        </p>
      </div>
    </div>
  );
};

export default DailyOpenClose;
