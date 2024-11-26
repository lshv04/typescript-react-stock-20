import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';
import ThemeSwitch from './ThemeSwitch';

const Navbar: React.FC = () => {
 

  return (
    <nav className={styles.navbar}>
      {/* Logo ou nome do aplicativo */}
      <NavLink to="/" className={styles.navbarBrand}>
        MyApp
      </NavLink>

      {/* Links de navegação */}
      <div className={styles.navLinks}>
        <NavLink
          to="/stocks"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Stocks
        </NavLink>
        <NavLink
          to="/crypto"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Crypto
        </NavLink>
      </div>

      {/* ThemeSwitch */}
  <ThemeSwitch/>
    </nav>
  );
};

export default Navbar;
