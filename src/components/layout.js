import React from 'react';
import PropTypes from 'prop-types';

import '../styles/global.css';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
