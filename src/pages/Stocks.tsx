import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Stocks.module.css'; // Importa o CSS Module

const Stocks: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stocks Page</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to="daily-open-close"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Daily Open/Close
            </NavLink>
          </li>
          <li>
            <NavLink
              to="ticker-news"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Ticker News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="dividends"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Dividends
            </NavLink>
          </li>
          <li>
            <NavLink
              to="stock-financial"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Stock Financial
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <Outlet /> {/* Renderiza as rotas aninhadas aqui */}
      </div>
    </div>
  );
};

export default Stocks;
