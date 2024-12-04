import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useInputContext } from "../../context/InputContext";
import { Spinner } from "react-bootstrap";
import "./StocksShared.css";

interface FinancialData {
  label: string;
  value: number;
  unit: string;
}

interface FinancialResult {
  end_date: string;
  start_date: string;
  fiscal_period: string;
  fiscal_year: number;
  financials: {
    income_statement?: {
      gross_profit?: FinancialData;
      cost_of_revenue?: FinancialData;
      costs_and_expenses?: FinancialData;
      revenues?: FinancialData;
    };
    cash_flow_statement?: {
      net_cash_flow?: FinancialData;
    };
    balance_sheet?: {
      assets?: FinancialData;
      current_liabilities?: FinancialData;
    };
  };
}

const FinancialExtra: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o tema atual
  const { inputValue } = useInputContext(); // Obtém o valor do contexto
  const [financialResults, setFinancialResults] = useState<FinancialResult[]>(
    []
  );
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
        console.log("Financials Data Response:", response.data.results);
        setFinancialResults(response.data.results || []);
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
      <h1 className="title">Financial Extra</h1>
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

      {!loading && financialResults.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {financialResults.map((result) => {
            const {
              gross_profit,
              cost_of_revenue,
              costs_and_expenses,
              revenues,
            } = result.financials.income_statement || {};
            const { net_cash_flow } =
              result.financials.cash_flow_statement || {};
            const { assets, current_liabilities } =
              result.financials.balance_sheet || {};
            const { end_date, fiscal_period, start_date, fiscal_year } = result;

            return (
              <div className="col" key={`${fiscal_period}-${fiscal_year}`}>
                <div className="card h-100 shadow-sm">
                  <div className="card-header text-center">
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(start_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {new Date(end_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Fiscal Period:</strong> {fiscal_period}
                    </p>
                    <p>
                      <strong>Fiscal Year:</strong> {fiscal_year}
                    </p>
                  </div>
                  <div className="card-body">
                    {gross_profit && (
                      <>
                        <h6 className="text-center mt-3">Gross Profit</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {gross_profit.value.toLocaleString()}{" "}
                          {gross_profit.unit}
                        </p>
                      </>
                    )}

                    {cost_of_revenue && (
                      <>
                        <h6 className="text-center mt-3">Cost Of Revenue</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {cost_of_revenue.value.toLocaleString()}{" "}
                          {cost_of_revenue.unit}
                        </p>
                      </>
                    )}

                    {costs_and_expenses && (
                      <>
                        <h6 className="text-center mt-3">Costs And Expenses</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {costs_and_expenses.value.toLocaleString()}{" "}
                          {costs_and_expenses.unit}
                        </p>
                      </>
                    )}

                    {revenues && (
                      <>
                        <h6 className="text-center mt-3">Revenues</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {revenues.value.toLocaleString()} {revenues.unit}
                        </p>
                      </>
                    )}

                    {net_cash_flow && (
                      <>
                        <h6 className="text-center mt-3">Net Cash Flow</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {net_cash_flow.value.toLocaleString()}{" "}
                          {net_cash_flow.unit}
                        </p>
                      </>
                    )}

                    {assets && (
                      <>
                        <h6 className="text-center mt-3">Assets</h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {assets.value.toLocaleString()} {assets.unit}
                        </p>
                      </>
                    )}

                    {current_liabilities && (
                      <>
                        <h6 className="text-center mt-3">
                          Current Liabilities
                        </h6>
                        <p className="card-text text-center">
                          <strong>Value:</strong>{" "}
                          {current_liabilities.value.toLocaleString()}{" "}
                          {current_liabilities.unit}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && financialResults.length === 0 && !error && (
        <p className="text-center">
          No financial data available for this ticker.
        </p>
      )}
    </div>
  );
};

export default FinancialExtra;
