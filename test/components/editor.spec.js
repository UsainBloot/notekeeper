
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import Editor from '../../app/components/editor';

function setup() {
  const actions = {
  };
  const props = {
    isEditView: true
  };
  const component = mount(<Editor {...props} />);
  return {
    component,
    actions,
    editor: component.find('textarea')
  };
}

describe('Editor component', () => {
  describe('identation', () => {
    beforeEach(() => {
      spy(Editor.prototype, 'onKeyDown');
    });

    afterEach(() => {
      Editor.prototype.onKeyDown.restore();
    });

    describe('single line', () => {
      describe('indent', () => {
        it('should indent a single line with 2 spaces', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          editor.node.value = 'test';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', { keyCode: 9 });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('  test');
          expect(editor.node.selectionStart).to.equal(carratLocation.start + 2);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end + 2);
        });

        it('should indent a line surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          editor.node.value = 'line 1\ntest\nline2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\n  test\nline2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start + 2);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end + 2);
        });
      });

      describe('unindent', () => {
        it('should unindent a line with 2 spaces at the start of the line', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          editor.node.value = '  test';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line with 1 space at the start of the line', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          editor.node.value = ' test';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line when selected anywhere on a line', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 4,
            end: 4
          };

          editor.node.value = '  test';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test');
          expect(editor.node.selectionStart).to.equal(carratLocation.start - 2);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 2);
        });

        it('should not unindent a line with no ident', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          editor.node.value = 'test';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          editor.node.value = 'line 1\n  test\nline2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\ntest\nline2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a single indent on a line surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          editor.node.value = 'line 1\n test\nline2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\ntest\nline2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent the line when selected anywhere on a line and surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 11,
            end: 11
          };

          editor.node.value = 'line 1\n  test\nline2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\ntest\nline2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start - 2);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 2);
        });
      });
    });

    describe('multi line', () => {
      describe('indent', () => {
        it('should indent on multiple lines with 2 spaces', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 13
          };

          editor.node.value = 'test 1\ntest 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', { keyCode: 9 });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('  test 1\n  test 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end + 4);
        });

        it('should indent on multiple lines surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 18
          };

          editor.node.value = 'line 1\ntest\ntest 2\nline 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\n  test\n  test 2\nline 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end + 4);
        });
      });

      describe('unindent', () => {
        it('should unindent on multiple lines  with 2 spaces at the start of the line', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 17
          };

          editor.node.value = '  test 1\n  test 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test 1\ntest 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 4);
        });

        it('should unindent on multiple lines  with 1 space at the start of the line', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 15
          };

          editor.node.value = ' test 1\n test 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test 1\ntest 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 2);
        });

        it('should not unindent on multiple lines with no ident', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 0,
            end: 13
          };

          editor.node.value = 'test 1\ntest 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('test 1\ntest 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent on multiple lines surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 24
          };

          editor.node.value = 'line 1\n  test 1\n  test 2\nline 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\ntest 1\ntest 2\nline 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 4);
        });

        it('should unindent a single indent on multiple lines surrounded by other unselected lines', () => {
          const { editor } = setup();
          const carratLocation = {
            start: 7,
            end: 22
          };

          editor.node.value = 'line 1\n test 1\n test 2\nline 2';
          editor.node.selectionStart = carratLocation.start;
          editor.node.selectionEnd = carratLocation.end;

          editor.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Editor.prototype.onKeyDown.calledOnce).to.be.true;
          expect(editor.node.value).to.equal('line 1\ntest 1\ntest 2\nline 2');
          expect(editor.node.selectionStart).to.equal(carratLocation.start);
          expect(editor.node.selectionEnd).to.equal(carratLocation.end - 2);
        });
      });
    });
  });
});
