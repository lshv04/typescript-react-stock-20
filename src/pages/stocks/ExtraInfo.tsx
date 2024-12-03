import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInputContext } from "../../context/InputContext";
import { Spinner } from "react-bootstrap";

interface TickerInfo {
  cik?: string;
  composite_figi?: string;
  currency_name?: string;
  description?: string;
  homepage_url?: string;
  list_date?: string;
  market?: string;
  market_cap?: number;
  name?: string;
  primary_exchange?: string;
  round_lot?: number;
  share_class_figi?: string;
  share_class_shares_outstanding?: number;
  ticker?: string;
  ticker_root?: string;
  total_employees?: number;
  type?: string;
  weighted_shares_outstanding?: number;
}

const ExtraInfo: React.FC = () => {
  const { inputValue } = useInputContext(); // Obtém o valor do input do contexto
  const [tickerData, setTickerData] = useState<TickerInfo | null>(null); // Estado para armazenar os dados do ticker
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchTickerInfo = async () => {
      if (!inputValue) return; // Não faz a requisição se o inputValue estiver vazio

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/tickers/${inputValue}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`
        );
        // console.log("Ticker Info Response:", response.data);
        setTickerData(response.data.results); // Define os dados recebidos no estado
      } catch (err) {
        console.error("Error fetching ticker info:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickerInfo();
  }, [inputValue]);

  return (
    <div className="container ">
      <h1 className="text-center mb-4">Extra Information</h1>

      {/* Estado de carregamento */}
      {loading &&      <div className="d-flex justify-content-center m-5 pt-3">
        <div className="d-flex justify-content-center m-5 pt-3">
        <Spinner animation="border" variant="primary" />
      </div>

      </div>
}

      {/* Mensagem de erro */}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* Dados do ticker */}
      {tickerData && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h2 className="card-title">{tickerData.name || "Name not available"}</h2>
                <p className="card-text">{tickerData.description || "No description available."}</p>
                {tickerData.homepage_url && (
                  <a
                    href={tickerData.homepage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit Homepage
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Dados Gerais */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">General Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>CIK:</strong> {tickerData.cik || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Composite FIGI:</strong> {tickerData.composite_figi || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Currency:</strong> {tickerData.currency_name || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Market:</strong> {tickerData.market || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>List Date:</strong> {tickerData.list_date || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dados Financeiros */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Financial Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Market Cap:</strong>{" "}
                    {tickerData.market_cap?.toLocaleString() || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Shares Outstanding:</strong>{" "}
                    {tickerData.share_class_shares_outstanding?.toLocaleString() || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Weighted Shares:</strong>{" "}
                    {tickerData.weighted_shares_outstanding?.toLocaleString() || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Type:</strong> {tickerData.type || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Additional Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Primary Exchange:</strong>{" "}
                    {tickerData.primary_exchange || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Round Lot:</strong> {tickerData.round_lot || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Total Employees:</strong>{" "}
                    {tickerData.total_employees?.toLocaleString() || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Ticker Root:</strong> {tickerData.ticker_root || "N/A"}
                  </li>
                  <li className="list-group-item">
                    <strong>Ticker:</strong> {tickerData.ticker || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtraInfo;
