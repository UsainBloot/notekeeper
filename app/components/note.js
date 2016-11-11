import React, { Component, PropTypes } from 'react';
import Editor from './editor';
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
    this.Editor.editor.focus();
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

  // checkforTabbing(event) {
  //   function resetCarrat(data) {
  //     if (data.isHighlight) {
  //       this.Editor.value.selectionStart = data.start;
  //       this.Editor.value.selectionEnd = data.end + data.increment;
  //     } else {
  //       this.Editor.value.selectionStart = data.start + data.increment;
  //       this.Editor.value.selectionEnd = data.start + data.increment;
  //     }
  //   }
  //
  //   const TAB_CODE = 9;
  //
  //   if (event.keyCode === TAB_CODE) {
  //     let isIndent = true;
  //     let spaceIncrement = 2;
  //
  //     if (event.shiftKey) {
  //       isIndent = false;
  //       spaceIncrement = -2;
  //     }
  //
  //     // get caret position/selection
  //     const start = this.Editor.value.selectionStart;
  //     const end = this.Editor.value.selectionEnd;
  //     const isHighlight = start !== end;
  //
  //     const target = event.target;
  //     const value = target.value;
  //
  //     if (isHighlight) {
  //       let output = '';
  //       let counter = 0;
  //       let spaceCount = 0;
  //       const targetValue = {
  //         before: target.value.substring(0, start),
  //         end: target.value.substring(end + 1),
  //         highlightedLines: target.value.substring(start, end + 1).split('\n')
  //       };
  //
  //       for (const line of targetValue.highlightedLines) {
  //         counter += 1;
  //         if (line !== '') {
  //           if (isIndent) {
  //             /* Indent line by 2 spaces */
  //             output += `  ${line}`;
  //             spaceCount += 2;
  //           } else if (line.substring(0, 2) === '  ') {
  //             /* Unindent - Line starts with 2 spaces */
  //             output += `${line.substring(2)}`;
  //             spaceCount -= 2;
  //           } else if (line.substring(0, 1) === ' ') {
  //             /* Unindent - Line starts with a single space */
  //             output += `${line.substring(1)}`;
  //             spaceCount -= 1;
  //           } else {
  //             output += `${line}`;
  //           }
  //
  //           if (counter !== targetValue.highlightedLines.length) {
  //             output += '\n';
  //           }
  //         }
  //       }
  //
  //       /* Output and reset */
  //       target.value = targetValue.before + output + targetValue.end;
  //       resetCarrat.call(this, {
  //         isHighlight,
  //         start,
  //         end,
  //         increment: spaceCount
  //       });
  //     } else {
  //       const startOfLineIndex = target.value.substring(0, start).lastIndexOf('\n') + 1;
  //       if (isIndent) {
  //         /* Indent line by 2 spaces */
  //         target.value = `${value.substring(0, start)}  ${value.substring(end)}`;
  //         spaceIncrement = 2;
  //       } else if (target.value.substring(startOfLineIndex, startOfLineIndex + 2) === '  ') {
  //         /* Unindent - Line starts with 2 spaces */
  //         target.value = value.substring(0, startOfLineIndex) +
  //           value.substring(startOfLineIndex + 2);
  //         spaceIncrement = start !== startOfLineIndex ? -2 : 0;
  //       } else if (target.value.substring(startOfLineIndex, startOfLineIndex + 1) === ' ') {
  //         /* Unindent - Line starts with a single space */
  //         target.value = value.substring(0, startOfLineIndex) +
  //           value.substring(startOfLineIndex + 1);
  //         spaceIncrement = start !== startOfLineIndex ? -1 : 0;
  //       } else {
  //         spaceIncrement = 0;
  //       }
  //
  //       /* Reset */
  //       resetCarrat.call(this, {
  //         isHighlight,
  //         start,
  //         end,
  //         increment: spaceIncrement
  //       });
  //     }
  //
  //     event.preventDefault();
  //   }
  // }


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
            onClick={() => this.switchView(view, this.Editor.editor)}
          >
            { isEditView ? 'View' : 'Edit' }
          </button>
        </div>
        <Editor
          isEditView={isEditView}
          ref={(input) => { this.Editor = input; }}
        />
        <div
          className={`${styles.view} view ${isEditView ? 'hide' : ''}`}
          dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line
        />
      </div>
    );
  }
}
