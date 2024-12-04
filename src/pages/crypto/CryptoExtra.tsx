import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  infinite_supply: boolean;
  last_updated: string;
  max_supply: number;
  num_market_pairs: number;
  quote: {
    USD: {
      fully_diluted_market_cap: number;
      last_updated: string;
      market_cap: number;
      market_cap_dominance: number;
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      percent_change_24h: number;
      tvl: number | null;
      volume_24h: number;
    };
  };
}

const CryptoExtra: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Obtém o símbolo passado pela rota
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      if (!symbol) return; // Se o símbolo não estiver disponível, não faz a requisição

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching data for symbol: ${symbol}`);
        const response = await axios.get("/v1/cryptocurrency/listings/latest", {
          headers: {
            "X-CMC_PRO_API_KEY": "17367773-4f63-4eda-a5fa-69f13ca1611d",
            Accept: "application/json",
          },
        });

        // Filtra os dados para encontrar apenas o símbolo passado
        const cryptoData = response.data.data.find(
          (crypto: CryptoData) => crypto.symbol.toUpperCase() === symbol.toUpperCase()
        );

        if (!cryptoData) {
          throw new Error(`No data found for symbol: ${symbol}`);
        }

        console.log("Filtered Crypto Data:", cryptoData); // Log dos dados filtrados
        setData(cryptoData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
        console.error("Error fetching crypto data:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [symbol]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crypto Details</h1>
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <p className="text-center text-danger mt-3">Error: {error}</p>
      )}
      {!loading && data && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-center">{data.name} ({data.symbol})</h5>
            <p className="card-text text-center">
              <strong>Circulating Supply:</strong> {data.circulating_supply.toLocaleString()}
            </p>
            <p className="card-text text-center">
              <strong>CMC Rank:</strong> {data.cmc_rank}
            </p>
            <p className="card-text text-center">
              <strong>Date Added:</strong> {new Date(data.date_added).toLocaleDateString()}
            </p>
            <p className="card-text text-center">
              <strong>Infinite Supply:</strong> {data.infinite_supply ? "Yes" : "No"}
            </p>
            <p className="card-text text-center">
              <strong>Last Updated:</strong> {new Date(data.last_updated).toLocaleString()}
            </p>
            <p className="card-text text-center">
              <strong>Max Supply:</strong> {data.max_supply?.toLocaleString() || "N/A"}
            </p>
            <p className="card-text text-center">
              <strong>Number of Market Pairs:</strong> {data.num_market_pairs}
            </p>
            <p className="card-text text-center">
              <strong>Fully Diluted Market Cap:</strong> {data.quote.USD.fully_diluted_market_cap.toLocaleString()}
            </p>
            <p className="card-text text-center">
              <strong>Market Cap:</strong> {data.quote.USD.market_cap.toLocaleString()}
            </p>
            <p className="card-text text-center">
              <strong>Market Cap Dominance:</strong> {data.quote.USD.market_cap_dominance.toFixed(2)}%
            </p>
            <p className="card-text text-center">
              <strong>Volume (24h):</strong> {data.quote.USD.volume_24h.toLocaleString()}
            </p>
            <p className="card-text text-center">
              <strong>Percent Change (1h):</strong> {data.quote.USD.percent_change_1h.toFixed(2)}%
            </p>
            <p className="card-text text-center">
              <strong>Percent Change (7d):</strong> {data.quote.USD.percent_change_7d.toFixed(2)}%
            </p>
            <p className="card-text text-center">
              <strong>Percent Change (30d):</strong> {data.quote.USD.percent_change_30d.toFixed(2)}%
            </p>
            <p className="card-text text-center">
              <strong>Percent Change (60d):</strong> {data.quote.USD.percent_change_60d.toFixed(2)}%
            </p>
            <p className="card-text text-center">
              <strong>Percent Change (90d):</strong> {data.quote.USD.percent_change_90d.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
      {!loading && !data && !error && (
        <p className="text-center mt-3">
          No details available for the symbol "{symbol}".
        </p>
      )}
    </div>
  );
};

export default CryptoExtra;
