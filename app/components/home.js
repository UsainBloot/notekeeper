import React, { Component } from 'react';
import styles from './home.scss';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>NoteKeeper</h2>
        </div>
      </div>
    );
  }
}
