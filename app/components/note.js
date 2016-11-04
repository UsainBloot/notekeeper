import React, { Component, PropTypes } from 'react';
import styles from './note.scss';

export default class Note extends Component {
  static propTypes = {
    convertToHtml: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    switchView: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
    isEditView: PropTypes.bool.isRequired
  };


  componentWillMount() {
  }

  componentDidMount() {
    this.noteTextArea.focus();
    this.noteName.value = this.props.title;
  }

  componentWillUpdate() {
  }

  switchView(view, raw) {
    if (view === 'edit') {
      this.props.convertToHtml(raw.value);
      this.props.switchView('view');
    } else {
      this.props.switchView('edit');
    }
  }

  render() {
    const { updateTitle, view, html, isEditView } = this.props;
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
            onClick={() => this.switchView(view, this.noteTextArea)}
          >
            { isEditView ? 'View' : 'Edit' }
          </button>
        </div>
        <textarea
          className={`${styles.edit} ${isEditView ? '' : 'hide'}`}
          name="noteText"
          ref={(input) => { this.noteTextArea = input; }}
        />
        <div
          className={`${styles.view} view ${isEditView ? 'hide' : ''}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}
