import React, { Component, PropTypes } from 'react';
import styles from './editor.scss';

export default class Editor extends Component {
  static propTypes = {
    isEditView: PropTypes.bool.isRequired
  }

  onKeyDown(event) {
    const TAB_CODE = 9;
    if (event.keyCode === TAB_CODE) {
      this.tabbing(event);
      event.preventDefault();
    }
  }

  tabbing(event) {
    const carrat = {
      start: this.editor.selectionStart,
      end: this.editor.selectionEnd,
      highlighting: this.editor.selectionStart < this.editor.selectionEnd
    };
    let indent = true;
    const target = event.target;
    const value = {
      text: target.value,
      head: target.value.substring(0, carrat.start),
      tail: target.value.substring(carrat.end + 1),
      startOfLineIndex: target.value.substring(0, carrat.start).lastIndexOf('\n') + 1,
      selectedLines: target.value.substring(carrat.start, carrat.end + 1).split('\n')
    };

    if (event.shiftKey) {
      indent = false;
    }

    if (carrat.highlighting) {
      const result = this.renderHighlightedLinesWithTabs(indent, value);
      target.value = result.output;

      this.editor.selectionEnd = carrat.end + result.carratIncrement;
    } else {
      const result = this.renderSingleLineWithTabs(indent, carrat, value);
      target.value = result.output;

      this.editor.selectionStart = carrat.start + result.carratIncrement;
      this.editor.selectionEnd = carrat.end + result.carratIncrement;
    }
  }

  renderHighlightedLinesWithTabs(ident, value) {
    const output = [];
    let carratIncrement = 0;

    for (const line of value.selectedLines) {
      const leadingSpaces = (/^ {1,2}/).test(line);
      carratIncrement = (/^ [^ ]/).test(line) ? 1 : 2;

      if (line !== '') {
        if (ident) {
          output.push(`  ${line}`);
        } else if (leadingSpaces) {
          output.push(`${line.substring(carratIncrement)}`);
          carratIncrement = -carratIncrement;
        } else {
          output.push(`${line}`);
          carratIncrement = 0;
        }
      }
    }

    return {
      output: value.head + output.join('\n') + value.tail,
      carratIncrement
    };
  }

  renderSingleLineWithTabs(ident, carrat, value) {
    const leadingSpaces = (/^ {1,2}/).test(value.text.substring(value.startOfLineIndex));
    let carratIncrement = (/^ [^ ]/).test(value.text.substring(value.startOfLineIndex)) ? 1 : 2;
    let output = '';
    if (ident) {
      output = `${value.text.substring(0, carrat.start)}  ${value.text.substring(carrat.end)}`;
    } else if (leadingSpaces) {
      output = value.text.substring(0, value.startOfLineIndex) +
        value.text.substring(value.startOfLineIndex + carratIncrement);
      carratIncrement = -carratIncrement;
    }
    return {
      output,
      carratIncrement
    };
  }

  render() {
    const { isEditView } = this.props;
    return (
      <textarea
        className={`${styles.edit} ${isEditView ? '' : 'hide'}`}
        name="noteEdit"
        ref={(input) => { this.editor = input; }}
        onKeyDown={(input) => this.onKeyDown(input)}
      />
    );
  }
}
