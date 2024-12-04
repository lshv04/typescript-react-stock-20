import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  max_supply: number | null;
  date_added: string;
  last_updated: string;
  quote: {
    USD: {
      market_cap: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      fully_diluted_market_cap: number;
      market_cap_dominance: number;
      price: number;
    };
  };
}

const CryptoExtra: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/v1/cryptocurrency/listings/latest', {
          headers: {
            'X-CMC_PRO_API_KEY': '17367773-4f63-4eda-a5fa-69f13ca1611d',
            Accept: 'application/json',
          },
        });

        const crypto = response.data.data.find(
          (item: CryptoData) => item.symbol === symbol?.toUpperCase()
        );

        if (crypto) {
          console.log('Filtered Crypto Data:', crypto); // Verificando os dados no console
          setData(crypto);
        } else {
          console.error('Crypto not found.');
          setError('Crypto not found.');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unexpected error occurred.';
        console.error('Error fetching crypto data:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    data && (
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card shadow-lg rounded-3" style={{ width: '100%', maxWidth: '700px' }}>
          <div className="card-body">
            <h4 className="text-primary text-center mb-4">
              {data.name} ({data.symbol})
            </h4>
            <hr />
            <h5 className="text-secondary">General Information</h5>
            <p>
              <strong>Circulating Supply:</strong> {data.circulating_supply.toLocaleString()}
            </p>
            <p>
              <strong>Max Supply:</strong> {data.max_supply?.toLocaleString() || 'N/A'}
            </p>
            <p>
              <strong>Date Added:</strong>{' '}
              <span className="badge bg-primary">
                {new Date(data.date_added).toLocaleDateString()}
              </span>
            </p>
            <hr />
            <h5 className="text-secondary">Market Data</h5>
            <p>
              <strong>Market Cap:</strong> {data.quote.USD.market_cap.toLocaleString()}
            </p>
            <p>
              <strong>Fully Diluted Market Cap:</strong>{' '}
              {data.quote.USD.fully_diluted_market_cap.toLocaleString()}
            </p>
            <p>
              <strong>Market Cap Dominance:</strong>{' '}
              {data.quote.USD.market_cap_dominance.toFixed(2)}%
            </p>
            <p>
              <strong>Price:</strong> ${data.quote.USD.price.toFixed(2)}
            </p>
            <p>
              <strong>Volume (24h):</strong> {data.quote.USD.volume_24h.toLocaleString()}
            </p>
            <p>
              <strong>Volume Change (24h):</strong>{' '}
              {data.quote.USD.volume_change_24h.toFixed(2)}%
            </p>
            <p>
              <strong>Percent Change (1h):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_1h > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_1h.toFixed(2)}%
                {data.quote.USD.percent_change_1h > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
            <p>
              <strong>Percent Change (24h):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_24h > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_24h.toFixed(2)}%
                {data.quote.USD.percent_change_24h > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
            <p>
              <strong>Percent Change (7d):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_7d > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_7d.toFixed(2)}%
                {data.quote.USD.percent_change_7d > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
            <p>
              <strong>Percent Change (30d):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_30d > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_30d.toFixed(2)}%
                {data.quote.USD.percent_change_30d > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
            <p>
              <strong>Percent Change (60d):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_60d > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_60d.toFixed(2)}%
                {data.quote.USD.percent_change_60d > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
            <p>
              <strong>Percent Change (90d):</strong>{' '}
              <span
                className={
                  data.quote.USD.percent_change_90d > 0 ? 'text-success' : 'text-danger'
                }
              >
                {data.quote.USD.percent_change_90d.toFixed(2)}%
                {data.quote.USD.percent_change_90d > 0 ? ' ↑' : ' ↓'}
              </span>
            </p>
          </div>
          <div className="card-footer text-center text-muted">
            <small>Last Updated: {new Date(data.last_updated).toLocaleString()}</small>
          </div>
        </div>
      </div>
    )
  );
};

export default CryptoExtra;
