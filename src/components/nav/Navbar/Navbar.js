import React from 'react';
import Navigation from 'react-toolbox/lib/navigation';
import LinkButton from 'react-toolbox/lib/link';
import Link from 'components/ui/Link';

import styles from './Navbar.scss';
import logo from './logo.svg';

const Navbar = ({match}) => (
  <div className={styles.root}>
    <img src={logo} className={styles.logo} alt="logo" />
    <h2>Welcome to React</h2>
    <Navigation type='horizontal' className={styles.navigation}>
      <Link to="/about" icon='inbox' label="Inbox" />
      <Link to="/topics" icon='person' active label="Profile" />
    </Navigation>
  </div>
);

Navbar.propTypes = {

};

export default Navbar;
