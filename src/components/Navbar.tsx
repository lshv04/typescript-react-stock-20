import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeSwitch from './ThemeSwitch';

const Navbar: React.FC = () => {
  return (
    <div className="container-fluid bord g-0">
      <nav className={styles.navbar}>
        {/* Logo ou nome do aplicativo */}
        <NavLink to="/" className={styles.navbarBrand}>
          LH
        </NavLink>

        {/* Links de navegação */}
        <div className={styles.navLinks}>
          <NavLink
            to="/stocks"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Stocks <i className="bi bi-graph-up-arrow"></i>
          </NavLink>
          <NavLink
            to="/crypto"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Crypto <i className="bi bi-currency-bitcoin"></i>
          </NavLink>
        </div>

        {/* ThemeSwitch */}
        <ThemeSwitch />
      </nav>
    </div>
  );
};

export default Navbar;
