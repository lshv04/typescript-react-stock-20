import React from "react";
import CryptoBasic from "../components/CryptoBasic";

const Crypto: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-center">Crypto Page</h1>
      <div className="row">
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="BTC" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="ETH" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="USDT" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="BNB" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="USDC" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="XRP" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="ADA" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="DOGE" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="SOL" />
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <CryptoBasic symbol="TON" />
        </div>
      </div>
    </div>
  );
};

export default Crypto;
