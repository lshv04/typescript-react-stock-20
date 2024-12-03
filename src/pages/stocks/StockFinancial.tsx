import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useInputContext } from "../../context/InputContext";
import { Spinner } from "react-bootstrap";
import "./StocksShared.css";
import NavigateButton from "../../components/NavigateButton";

interface FinancialData {
  acceptance_datetime: string;
  company_name: string;
  end_date: string;
  filing_date: string;
  fiscal_period: string;
  fiscal_year: string;
  start_date: string;
  tickers: string[];
  timeframe: string;
}

const StockFinancial: React.FC = () => {
  const { isDark } = useTheme();
  const { inputValue } = useInputContext();
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancials = async () => {
      if (!inputValue) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.polygon.io/vX/reference/financials?ticker=${inputValue}&limit=20&apiKey=LsO1WF3z2cxUqHd7nIwC4fL3s_w9oBPh`
        );
        // console.log("Financial Data Response:", response.data.results);
        setFinancialData(response.data.results || []);
      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancials();
  }, [inputValue]);

  return (
    <div className={`container ${isDark ? "dark" : "light"}`}>
      <h1 className="title">Stock Financial</h1>

      <div className="text-center mb-4">
        <p>
          <strong>Ticker:</strong> {inputValue || "No ticker provided"}
        </p>
      </div>

      {loading && (
        <div className="d-flex justify-content-center m-5 pt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {!loading && financialData.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {financialData.map((item, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100 shadow-sm d-flex flex-column justify-content-between"
                style={{ display: "flex" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.company_name}</h5>
                  <p className="card-text">
                    <strong>Acceptance Date:</strong>{" "}
                    {new Date(item.acceptance_datetime).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Start Date:</strong>{" "}
                    {new Date(item.start_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>End Date:</strong>{" "}
                    {new Date(item.end_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Filing Date:</strong>{" "}
                    {new Date(item.filing_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Fiscal Period:</strong> {item.fiscal_period}
                  </p>
                  <p className="card-text">
                    <strong>Fiscal Year:</strong> {item.fiscal_year}
                  </p>
                  <p className="card-text">
                    <strong>Timeframe:</strong> {item.timeframe}
                  </p>
                  <p className="card-text">
                    <strong>Tickers:</strong> {item.tickers.join(", ")}
                  </p>
                </div>
                {/* Botão no final do card */}
                <div className="card-footer d-flex justify-content-center ">
                  <NavigateButton
                    route="financial-extra"
                    label="Financial Extra"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && financialData.length === 0 && !error && (
        <p className="text-center">
          No financial data available for this ticker.
        </p>
      )}
    </div>
  );
};

export default StockFinancial;
