import React, { Component, PropTypes } from 'react';
import styles from './editor.scss';

export default class Editor extends Component {
  static propTypes = {
    isEditView: PropTypes.bool.isRequired
  }

  static renderHighlightedLinesWithTabs(ident, value) {
    const output = [];
    let increment = 0;

    for (const line of value.selectedLines) {
      const leadingSpaces = (/^ {1,2}/).test(line);
      const carratIncrement = (/^ [^ ]/).test(line) ? 1 : 2;
      if (line !== '') {
        if (ident) {
          output.push(`  ${line}`);
          increment += 2;
        } else if (leadingSpaces) {
          output.push(`${line.substring(carratIncrement)}`);
          increment += -carratIncrement;
        } else {
          output.push(`${line}`);
        }
      } else {
        output.push(line);
      }
    }

    return {
      output: value.head + output.join('\n') + value.tail,
      carratIncrement: increment
    };
  }

  static renderSingleLineWithTabs(ident, carrat, value) {
    const leadingSpaces = (/^ {1,2}/).test(value.text.substring(value.startOfLineIndex));
    let carratIncrement = (/^ [^ ]/).test(value.text.substring(value.startOfLineIndex)) ? 1 : 2;
    let output = value.text;

    if (ident) {
      output = `${value.text.substring(0, carrat.start)}  ${value.text.substring(carrat.end)}`;
    } else if (leadingSpaces) {
      output = value.text.substring(0, value.startOfLineIndex) +
        value.text.substring(value.startOfLineIndex + carratIncrement);

      if (carrat.start - value.startOfLineIndex < carratIncrement) {
        carratIncrement = carrat.start - value.startOfLineIndex;
      }
      carratIncrement = -carratIncrement;
    } else {
      carratIncrement = 0;
    }
    return {
      output,
      carratIncrement
    };
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
      const result = this.constructor.renderHighlightedLinesWithTabs(indent, value);
      target.value = result.output;

      this.editor.selectionStart = carrat.start;
      this.editor.selectionEnd = carrat.end + result.carratIncrement >= 0 ?
        carrat.end + result.carratIncrement : carrat.end;
    } else {
      const result = this.constructor.renderSingleLineWithTabs(indent, carrat, value);
      target.value = result.output;

      this.editor.selectionStart = carrat.start + result.carratIncrement >= 0 ?
        carrat.start + result.carratIncrement : carrat.start;
      this.editor.selectionEnd = carrat.end + result.carratIncrement >= 0 ?
        carrat.end + result.carratIncrement : carrat.end;
    }
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
