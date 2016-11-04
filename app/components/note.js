import React, { Component, PropTypes } from 'react';
import styles from './note.scss';

export default class Note extends Component {
  static propTypes = {
    convertToMarkdown: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    html: PropTypes.string.isRequired
  };

  componentWillMount() {

  }

  componentDidMount() {
    this.noteName.value = 'Note 1';
    this.noteTextArea.focus();
  }

  render() {
    const { convertToMarkdown, updateTitle, html } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            className={styles.header__label}
            type="text"
            ref={(input => (this.noteName = input))}
            onBlur={() => updateTitle(this.noteName.value)}
          />
          <button
            className={`${styles.header__btn} btn btn--white`}
            onClick={() => convertToMarkdown(this.noteTextArea.value)}
          >
            Convert to Markdown
          </button>
        </div>
        <textarea
          className={styles.note}
          name="noteText"
          ref={(input) => (this.noteTextArea = input)}
        />
        <div className={styles.markdown}>{html}</div>
      </div>
    );
  }
}
