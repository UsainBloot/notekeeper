// @flow
import React, { Component } from 'react';
import styles from './note.scss';

export default class Note extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.header__label}>Note 1</span>
        </div>
        <textarea />
      </div>
    );
  }
}
