import React from 'react';
import styles from './Header.module.css'
import './Header.scss';

function Header () {
  return (
    <header>
      <div className={styles.test}>
        1
      </div>
      <div className="test2">
        2
      </div>
    </header>
  );
}

export default Header;