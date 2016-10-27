// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.scss';

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
