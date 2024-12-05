import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { Spinner } from "react-bootstrap";
import { useInputContext } from "../../context/InputContext"; // Imports InputContext
import "./StocksShared.css"; // Imports shared CSS
import NavigateButton from "../../components/NavigateButton";

interface TickerBranding {
  logo_url?: string; // URL of the logo
  icon_url?: string; // URL of the icon
}

interface TickerData {
  name?: string; // Company name
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
    n: number; // Number of transactions
    t: number; // Timestamp
    v: number; // Volume
    vw: number; // Weighted average price
  }>;
}

const DailyOpenClose: React.FC = () => {
  const { isDark } = useTheme(); // Gets theme state
  const { inputValue } = useInputContext(); // Gets input context value
  const [tickerData, setTickerData] = useState<TickerData | null>(null); // State for storing ticker data
  const [stockData, setStockData] = useState<StockData | null>(null); // State for storing stock data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch Ticker Details API
        const tickerResponse = await axios.get(
          `https://api.polygon.io/v3/reference/tickers/${inputValue}?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`
        );
        // console.log("Ticker Data Response:", tickerResponse.data); 
        setTickerData(tickerResponse.data.results); // Sets received data

        // Fetch Stock Data API
        const stockResponse = await axios.get<StockData>(
          `https://api.polygon.io/v2/aggs/ticker/${inputValue}/prev`,
          {
            params: {
              adjusted: true,
              apiKey: process.env.REACT_APP_POLYGON_API_KEY,
            },
          }
        );
        // console.log("Stock Data Response:", stockResponse.data); 
        setStockData(stockResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  // Function to format timestamp
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={`container g-0 bord  ${isDark ? "dark" : "light"}`}>
      <h1 className="title text-center">Daily Open/Close</h1>
      <div className="content d-flex flex-column gap-3">
        <p className="text-center">Details about the ticker and stock data.</p>
        <NavigateButton route="/stocks/extrainfo" label="Extra info" />

        {/* Display ticker data */}
        {tickerData && (
          <div className="mb-4 text-center">
            <h2>{tickerData.name || "Name not available"}</h2>
            <div className="branding">
              {tickerData.branding?.logo_url ? (
                <img
                  src={`${tickerData.branding.logo_url}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`}
                  alt="Company Logo"
                  width="100"
                  className="me-3"
                />
              ) : (
                <p>Logo not available</p>
              )}

              {tickerData.branding?.icon_url ? (
                <img
                  src={`${tickerData.branding.icon_url}?apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`}
                  alt="Company Icon"
                  width="50"
                />
              ) : (
                <p>Icon not available</p>
              )}
            </div>
          </div>
        )}

        {/* Display input context value */}
        <p className="text-center">
          <strong>Ticker:</strong> {inputValue}
        </p>

        {/* Loading state */}
        {loading && (
          <div className="d-flex justify-content-center m-5 pt-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {error && <p className="text-danger text-center">Error: {error}</p>}

        {/* Display Stock Data */}
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
                  <h5 className="card-title">Open</h5>
                  <p className="card-text">{stockData.results[0]?.o}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Close</h5>
                  <p className="card-text">{stockData.results[0]?.c}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">High</h5>
                  <p className="card-text">{stockData.results[0]?.h}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Low</h5>
                  <p className="card-text">{stockData.results[0]?.l}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Traded Volume</h5>
                  <p className="card-text">{stockData.results[0]?.v}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Weighted Average Price</h5>
                  <p className="card-text">{stockData.results[0]?.vw}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Number of Transactions</h5>
                  <p className="card-text">{stockData.results[0]?.n}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Date</h5>
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