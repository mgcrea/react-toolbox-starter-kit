import React from 'react';
import styles from './Navbar.scss';

import logo from './logo.svg';

const Navbar = () => (
  <div className={styles.root}>
    <img src={logo} className={styles.logo} alt="logo" />
    <h2>Welcome to React</h2>
  </div>
);

Navbar.propTypes = {

};

export default Navbar;
