import React from 'react';
import { useParams } from 'react-router-dom';

const CryptoExtra: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>(); // Captura o símbolo da URL

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crypto Extra</h1>
      <p className="text-center">
        <strong>Symbol:</strong> {symbol || 'No symbol provided'}
      </p>
    </div>
  );
};

export default CryptoExtra;
