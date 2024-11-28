import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import styles from './Stocks.module.css';
import SharedInput from '../components/SharedInput';

const Stocks: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema

  return (
    <div className='container-fluid bord g-0'>
    <div
      className={`${styles.container} ${
        isDark ? styles.dark : styles.light
      }`} // Aplica dinamicamente o tema
    >
      <h1 className={styles.title}>Stocks Page</h1>
      <SharedInput/>
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
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default Stocks;
