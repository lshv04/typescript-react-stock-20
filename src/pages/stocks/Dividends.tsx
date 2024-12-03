import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useInputContext } from "../../context/InputContext";
import { Spinner } from "react-bootstrap";
import "./StocksShared.css"; // Importa o CSS compartilhado

interface DividendItem {
  cash_amount: number;
  currency: string;
  declaration_date: string;
  dividend_type: string;
  ex_dividend_date: string;
  frequency: number;
  record_date: string;
  ticker: string;
  id: string;
}

const Dividends: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema
  const { inputValue } = useInputContext(); // Obtém o valor do input do contexto
  const [dividends, setDividends] = useState<DividendItem[]>([]); // Estado para armazenar os dividendos
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchDividends = async () => {
      if (!inputValue) return; // Não faz a requisição se o inputValue estiver vazio

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/dividends?ticker=${inputValue}&limit=10&apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`
        );
        // console.log("Dividends Response:", response.data.results);
        setDividends(response.data.results || []); // Define os dividendos no estado
      } catch (err) {
        console.error("Error fetching dividends:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDividends();
  }, [inputValue]);

  return (
    <div className={`container ${isDark ? "dark" : "light"}`}>
      <h1 className="title">Dividends</h1>

      {/* Exibe o valor do input */}
      <div className="text-center mb-4">
        <p>
          <strong>Ticker:</strong> {inputValue || "No ticker provided"}
        </p>
      </div>

      {/* Estado de carregamento */}
      {loading && (
        <div className="d-flex justify-content-center m-5 pt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Mensagem de erro */}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* Lista de dividendos */}
      {dividends.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {dividends.map((item) => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Ticker: {item.ticker}</h5>
                  <p className="card-text">
                    <strong>Cash Amount:</strong> ${item.cash_amount.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Currency:</strong> {item.currency}
                  </p>
                  <p className="card-text">
                    <strong>Declaration Date:</strong>{" "}
                    {new Date(item.declaration_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Ex-Dividend Date:</strong>{" "}
                    {new Date(item.ex_dividend_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Record Date:</strong>{" "}
                    {new Date(item.record_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Dividend Type:</strong> {item.dividend_type}
                  </p>
                  <p className="card-text">
                    <strong>Frequency:</strong> {item.frequency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center">No dividends available for this ticker.</p>
        )
      )}
    </div>
  );
};

export default Dividends;
