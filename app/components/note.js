import React, { Component, PropTypes } from 'react';
import styles from './note.scss';

export default class Note extends Component {
  static propTypes = {
    convertToHtml: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired
  };

  componentWillMount() {
  }

  componentDidMount() {
    this.noteTextArea.focus();
    this.noteName.value = this.props.title;
  }

  componentWillUpdate() {
  }

  render() {
    const { convertToHtml, updateTitle, html } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            className={styles.header__label}
            type="text"
            ref={(input) => { this.noteName = input; }}
            onBlur={() => updateTitle(this.noteName.value)}
          />
          <button
            className={`${styles.header__btn} btn btn--white`}
            onClick={() => convertToHtml(this.noteTextArea.value)}
          >
            Convert to HTML
          </button>
        </div>
        <textarea
          className={styles.note}
          name="noteText"
          ref={(input) => { this.noteTextArea = input; }}
        />
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}
