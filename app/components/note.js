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
    this.noteEdit.focus();
    this.noteTitle.value = this.props.title;
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

  checkforTabbing(event) {
    if (event.keyCode === 9) {
      let isIndent = true;
      let spaceIncrement = 2;

      if(event.shiftKey) {
        isIndent = false;
        spaceIncrement = -2;
      }

      // get caret position/selection
      const start = this.noteEdit.selectionStart;
      const end = this.noteEdit.selectionEnd;

      const target = event.target;
      const value = target.value;

      // set textarea value to: text before caret + tab + text after caret
      if (start === end) {
        target.value = `${value.substring(0, start)}  ${value.substring(end)}`;

        // put caret at right position again (add two for the tab)
        this.noteEdit.selectionStart = this.noteEdit.selectionEnd = start + 2;
      } else {
        let output = '';
        let spaceCount = 0;

        const selection = {
          before: target.value.substring(0, start),
          end: target.value.substring(end + 1)
        };

        console.log('before', selection.before);
        console.log('end', selection.end);

        const lines = target.value.substring(start, end + 1).split('\n');

        for (const line of lines) {
          if (line !== '') {
            if (isIndent) {
              output += `  ${line}\n`;
            } else {
              output += `${line.substring(2)}\n`;
            }
            spaceCount += spaceIncrement;
          }
        }
        target.value = selection.before + output + selection.end;

        // put caret at right position again (add two for the tab)
        this.noteEdit.selectionStart = start;
        this.noteEdit.selectionEnd = end + spaceCount;
      }

      event.preventDefault();
    }
  }


  render() {
    const { updateTitle, view, html, isEditView } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <input
            className={styles.header__title}
            type="text"
            ref={(input) => { this.noteTitle = input; }}
            onBlur={() => updateTitle(this.noteTitle.value)}
          />
          <button
            className={`${styles.header__btn} btn btn--white`}
            onClick={() => this.switchView(view, this.noteEdit)}
          >
            { isEditView ? 'View' : 'Edit' }
          </button>
        </div>
        <textarea
          className={`${styles.edit} ${isEditView ? '' : 'hide'}`}
          name="noteEdit"
          ref={(input) => { this.noteEdit = input; }}
          onKeyDown={(input) => this.checkforTabbing(input)}
        />
        <div
          className={`${styles.view} view ${isEditView ? 'hide' : ''}`}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line
        />
      </div>
    );
  }
}
