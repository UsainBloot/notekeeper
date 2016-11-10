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
    function resetCarrat(data) {
      if (data.isHighlight) {
        this.noteEdit.selectionStart = data.start;
        this.noteEdit.selectionEnd = data.end + data.increment;
      } else {
        this.noteEdit.selectionStart = this.noteEdit.selectionEnd = data.start + data.increment;
      }
    }

    const TAB_CODE = 9;

    if (event.keyCode === TAB_CODE) {
      let isIndent = true;
      let spaceIncrement = 2;

      if (event.shiftKey) {
        isIndent = false;
        spaceIncrement = -2;
      }

      // get caret position/selection
      const start = this.noteEdit.selectionStart;
      const end = this.noteEdit.selectionEnd;
      const isHighlight = start !== end;

      const target = event.target;
      const value = target.value;

      if (isHighlight) {
        let output = '';
        let spaceCount = 0;
        const targetValue = {
          before: target.value.substring(0, start),
          end: target.value.substring(end + 1),
          highlightedLines: target.value.substring(start, end + 1).split('\n')
        };

        for (const line of targetValue.highlightedLines) {
          if (line !== '') {
            if (isIndent) {
              output += `  ${line}\n`;
              spaceCount += spaceIncrement;
            } else if (line.substring(0, 2) === '  ') {
              output += `${line.substring(2)}\n`;
              spaceCount -= 2;
            } else if (line.substring(0, 1) === ' ') {
              output += `${line.substring(1)}\n`;
              spaceCount -= 1;
            } else {
              output += `${line}\n`;
            }
          }
        }

        target.value = targetValue.before + output + targetValue.end;
        resetCarrat.call(this, {
          isHighlight,
          start,
          end,
          increment: spaceCount
        });
      } else {
        if (isIndent) {
          target.value = `${value.substring(0, start)}  ${value.substring(end)}`;
        } else if (target.value.substring(start - 2, start) === '  ') {
          target.value = value.substring(0, start - 2) + value.substring(end);
        } else if (target.value.substring(start - 1, start) === ' ') {
          target.value = value.substring(0, start - 1) + value.substring(end);
          spaceIncrement = -1;
        }

        resetCarrat.call(this, {
          isHighlight,
          start,
          end,
          increment: spaceIncrement
        });
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
