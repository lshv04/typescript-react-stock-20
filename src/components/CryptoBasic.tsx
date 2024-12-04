import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap'; // Importando componentes do Bootstrap

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  logo: string;
}

interface CryptoBasicProps {
  symbol: string; // O símbolo da criptomoeda (ex.: BTC, ETH)
}

const CryptoBasic: React.FC<CryptoBasicProps> = ({ symbol }) => {
  const [data, setData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/v1/cryptocurrency/info', {
          headers: {
            'X-CMC_PRO_API_KEY': '17367773-4f63-4eda-a5fa-69f13ca1611d',
            Accept: 'application/json',
          },
          params: {
            symbol: symbol.toUpperCase(),
          },
        });
        setData(response.data.data[symbol.toUpperCase()]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';
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
      <Card className="shadow-sm my-3">
        <Card.Img
          variant="top"
          src={data.logo}
          alt={`${data.name} Logo`}
          style={{ width: '100px', height: '100px', margin: '20px auto' }}
        />
        <Card.Body>
          <Card.Title className="text-center">{data.name}</Card.Title>
          <Card.Text className="text-center text-muted">
            Symbol: {data.symbol}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button variant="primary">More Info</Button>
          </div>
        </Card.Body>
      </Card>
    )
  );
};

export default CryptoBasic;
