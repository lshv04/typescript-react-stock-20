import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stocks from './pages/Stocks';
import Crypto from './pages/Crypto';
import DailyOpenClose from './pages/stocks/DailyOpenClose';
import TickerNews from './pages/stocks/TickerNews';
import Dividends from './pages/stocks/Dividends';
import StockFinancial from './pages/stocks/StockFinancial';
import { InputProvider } from './context/InputContext';

const App: React.FC = () => {
  return (
    <InputProvider>
    <Router>
      <Navbar />
      <Routes>
        {/* Rota padrão */}
        <Route path="/" element={<Navigate to="/stocks" />} />

        {/* Rotas principais */}
       
        <Route path="/stocks" element={<Stocks />}>
          {/* Redirecionamento padrão para Daily Open/Close */}
          <Route index element={<Navigate to="daily-open-close" />} />
          <Route path="daily-open-close" element={<DailyOpenClose />} />
          <Route path="ticker-news" element={<TickerNews />} />
          <Route path="dividends" element={<Dividends />} />
          <Route path="stock-financial" element={<StockFinancial />} />
        </Route>
       
        <Route path="/crypto" element={<Crypto />} />
      </Routes>
    </Router>
    </InputProvider>
  );
};

export default App;
