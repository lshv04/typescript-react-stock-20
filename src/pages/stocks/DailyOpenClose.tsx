import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { useInputContext } from '../../context/InputContext'; // Importa o InputContext
import './StocksShared.css'; // Importa o CSS compartilhado

interface StockData {
  ticker: string;
  adjusted: boolean;
  results: Array<{
    o: number; // Open
    c: number; // Close
    h: number; // High
    l: number; // Low
    n: number; // Número de transações
    t: number; // Timestamp
    v: number; // Volume
    vw: number; // Volume ponderado
  }>;
}

const DailyOpenClose: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema
  const { inputValue } = useInputContext(); // Obtém o valor do contexto de input
  const [stockData, setStockData] = useState<StockData | null>(null); // Estado para armazenar os dados
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchStockData = async () => {
      if (!inputValue) return; // Não faz a requisição se o valor do input estiver vazio

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<StockData>(
          `https://api.polygon.io/v2/aggs/ticker/${inputValue}/prev`, // Substitui AAPL por inputValue
          {
            params: {
              adjusted: true,
              apiKey: 'LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh',
            },
          }
        );

        console.log('Dados recebidos:', response.data); // Exibe os dados no console
        setStockData(response.data); // Define os dados recebidos no estado
      } catch (err) {
        console.error('Erro ao buscar os dados:', err); // Exibe o erro no console
        setError((err as Error).message); // Captura a mensagem de erro
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [inputValue]); // Refaz o fetch sempre que o valor do input mudar

  // Função para formatar o timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={`container g-0 bord ${isDark ? 'dark' : 'light'}`}>
      <h1 className="title text-center">Daily Open/Close</h1>
      <div className="content">
        <p className="text-center">Informações sobre abertura e fechamento diário das ações.</p>
        <p className="text-center">
          <strong>Valor compartilhado do Input:</strong> {inputValue}
        </p>
        {loading && <p className="text-center">Carregando dados...</p>}
        {error && <p className="text-danger text-center">Erro: {error}</p>}
        {stockData && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Exibe cada dado em um card */}
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Ticker</h5>
                  <p className="card-text">{stockData.ticker}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Abertura</h5>
                  <p className="card-text">{stockData.results[0]?.o}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Fechamento</h5>
                  <p className="card-text">{stockData.results[0]?.c}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Alta</h5>
                  <p className="card-text">{stockData.results[0]?.h}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Baixa</h5>
                  <p className="card-text">{stockData.results[0]?.l}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Volume Negociado</h5>
                  <p className="card-text">{stockData.results[0]?.v}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Preço Médio Ponderado</h5>
                  <p className="card-text">{stockData.results[0]?.vw}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Número de Transações</h5>
                  <p className="card-text">{stockData.results[0]?.n}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Data</h5>
                  <p className="card-text">{formatDate(stockData.results[0]?.t)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyOpenClose;
