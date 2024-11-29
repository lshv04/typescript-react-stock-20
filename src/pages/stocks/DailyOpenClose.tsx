import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useInputContext } from "../../context/InputContext"; // Importa o InputContext
import "./StocksShared.css"; // Importa o CSS compartilhado

interface TickerBranding {
  logo_url?: string; // URL do logo
  icon_url?: string; // URL do ícone
}

interface TickerData {
  name?: string; // Nome da empresa
  branding?: TickerBranding; // Branding
}

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
  const [tickerData, setTickerData] = useState<TickerData | null>(null); // Estado para armazenar os dados do ticker
  const [stockData, setStockData] = useState<StockData | null>(null); // Estado para armazenar os dados de ações
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch da API Ticker Details
        const tickerResponse = await axios.get(
          `https://api.polygon.io/v3/reference/tickers/${inputValue}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`
        );
        console.log("Ticker Data Response:", tickerResponse.data); // Log para verificar os dados do ticker
        setTickerData(tickerResponse.data.results); // Define os dados recebidos

        // Fetch da API de ações
        const stockResponse = await axios.get<StockData>(
          `https://api.polygon.io/v2/aggs/ticker/${inputValue}/prev`,
          {
            params: {
              adjusted: true,
              apiKey: "LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh",
            },
          }
        );
        console.log("Stock Data Response:", stockResponse.data); // Log para verificar os dados de ações
        setStockData(stockResponse.data);
      } catch (err) {
        console.error("Erro ao buscar os dados:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  // Função para formatar o timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={`container g-0 bord ${isDark ? "dark" : "light"}`}>
      <h1 className="title text-center">Daily Open/Close</h1>
      <div className="content">
        <p className="text-center">Informações sobre o ticker e as ações.</p>

        {/* Exibe os dados do ticker */}
        {tickerData && (
          <div className="mb-4 text-center">
            <h2>{tickerData.name || "Nome não disponível"}</h2>
            <div className="branding">
              {tickerData.branding?.logo_url ? (
                <img
                  src={`${tickerData.branding.logo_url}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`}
                  alt="Company Logo"
                  width="100"
                  className="me-3"
               
                />
              ) : (
                <p>Logo não disponível</p>
              )}

              {tickerData.branding?.icon_url ? (
                <img
                  src={`${tickerData.branding.icon_url}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`}
                  alt="Company Icon"
                  width="50"
                  
                />
              ) : (
                <p>Ícone não disponível</p>
              )}
            </div>
          </div>
        )}

        {/* Exibe o valor do contexto */}
        <p className="text-center">
          <strong>Valor compartilhado do Input:</strong> {inputValue}
        </p>

        {/* Estado de carregamento */}
        {loading && <p className="text-center">Carregando dados...</p>}
        {error && <p className="text-danger text-center">Erro: {error}</p>}

        {/* Dados recebidos da API de Ações */}
        {stockData && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
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
                  <p className="card-text">
                    {formatDate(stockData.results[0]?.t)}
                  </p>
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
