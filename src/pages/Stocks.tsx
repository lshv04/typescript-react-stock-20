import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import styles from "./Stocks.module.css";
import SharedInput from "../components/SharedInput";

const Stocks: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema

  return (
    <div className="container bord g-0">
      <div
        className={`${styles.container} ${isDark ? styles.dark : styles.light}`} // Aplica dinamicamente o tema
      >
        <SharedInput />
        <nav className={`${styles.nav} bord`}>
          <div className="row g-3 ">
            <div className="col-6  col-md-3 bord">
              <NavLink
                to="daily-open-close"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Open/Close
              </NavLink>
            </div>
            <div className="col-6  col-md-3 bord">
              <NavLink
                to="ticker-news"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                News
              </NavLink>
            </div>
            <div className="col-6  col-md-3 bord">
              <NavLink
                to="dividends"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Dividends
              </NavLink>
            </div>
            <div className="col-6  col-md-3 bord">
              <NavLink
                to="stock-financial"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Financial
              </NavLink>
            </div>
          </div>
        </nav>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
