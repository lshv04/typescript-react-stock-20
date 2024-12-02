import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useInputContext } from '../../context/InputContext';
import './StocksShared.css'; // CSS compartilhado para estilo

const FinancialExtra: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o tema atual
  const { inputValue } = useInputContext(); // Obtém o valor do contexto

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title">Financial Extra</h1>
      <div className="text-center mb-4">
        <p>
          <strong>Ticker:</strong> {inputValue || 'No ticker provided'}
        </p>
      </div>
      <p className="text-center">
        This is the Financial Extra page. Use this page to add additional financial details or insights.
      </p>
    </div>
  );
};

export default FinancialExtra;
