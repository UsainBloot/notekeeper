/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import Note from '../../app/components/note';

function setup() {
  const actions = {
    save: spy(),
    convertToHtml: spy(),
    updateTitle: spy(),
    switchView: spy()
  };
  const props = {
    convertToHtml: actions.convertToHtml,
    updateTitle: actions.updateTitle,
    switchView: actions.switchView,
    isEditView: true,
    title: 'Note 1',
    view: 'edit',
    html: '<div></div>'
  };
  const component = mount(<Note {...props} />);
  return {
    component,
    actions,
    title: component.find('.note__header__title'),
    editViewButton: component.find('.note__header__btn'),
    edit: component.find('.note__edit'),
    view: component.find('.note__view')
  };
}

describe('Note component', () => {
  it('should dispatch updateTitle action when title input loses focus', () => {
    const { title, actions } = setup();
    title.node.value = 'test note title';
    title.simulate('blur');
    expect(actions.updateTitle.called).to.be.true;
    expect(actions.updateTitle.calledWith('test note title')).to.be.true;
  });

  it('should dispatch convertToHtml action on view button click', () => {
    const { edit, editViewButton, actions } = setup();
    edit.node.value = '**test**';
    editViewButton.simulate('click');
    expect(actions.convertToHtml.called).to.be.true;
    expect(actions.convertToHtml.calledWith('**test**')).to.be.true;
  });

  it('should dispatch switchView action with \'view\' payload on view button click', () => {
    const { editViewButton, actions } = setup();
    editViewButton.simulate('click');
    expect(actions.switchView.called).to.be.true;
    expect(actions.switchView.calledWith('view')).to.be.true;
  });

  it('should dispatch switchView action with \'edit\' payload on edit button click', () => {
    const { component, editViewButton, actions } = setup();
    component.setProps({ view: 'view' });
    editViewButton.simulate('click');
    expect(actions.switchView.called).to.be.true;
    expect(actions.switchView.calledWith('edit')).to.be.true;
  });

  describe('identation', () => {
    beforeEach(() => {
      spy(Note.prototype, 'checkforTabbing');
    });

    afterEach(() => {
      Note.prototype.checkforTabbing.restore();
    });

    describe('single line', () => {
      describe('indent', () => {
        it('should indent a single line with 2 spaces', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          edit.node.value = 'test';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', { keyCode: 9 });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('  test');
          expect(edit.node.selectionStart).to.equal(carratLocation.start + 2);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end + 2);
        });

        it('should indent a line surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          edit.node.value = 'line 1\ntest\nline2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\n  test\nline2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start + 2);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end + 2);
        });
      });

      describe('unindent', () => {
        it('should unindent a line with 2 spaces at the start of the line', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          edit.node.value = '  test';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line with 1 space at the start of the line', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          edit.node.value = ' test';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line when selected anywhere on a line', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 4,
            end: 4
          };

          edit.node.value = '  test';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test');
          expect(edit.node.selectionStart).to.equal(carratLocation.start - 2);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 2);
        });

        it('should not unindent a line with no ident', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 0
          };

          edit.node.value = 'test';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a line surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          edit.node.value = 'line 1\n  test\nline2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\ntest\nline2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent a single indent on a line surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 7
          };

          edit.node.value = 'line 1\n test\nline2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\ntest\nline2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent the line when selected anywhere on a line and surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 11,
            end: 11
          };

          edit.node.value = 'line 1\n  test\nline2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\ntest\nline2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start - 2);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 2);
        });
      });
    });

    describe('multi line', () => {
      describe('indent', () => {
        it('should indent on multiple lines with 2 spaces', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 13
          };

          edit.node.value = 'test 1\ntest 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', { keyCode: 9 });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('  test 1\n  test 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end + 4);
        });

        it('should indent on multiple lines surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 18
          };

          edit.node.value = 'line 1\ntest\ntest 2\nline 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\n  test\n  test 2\nline 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end + 4);
        });
      });

      describe('unindent', () => {
        it('should unindent on multiple lines  with 2 spaces at the start of the line', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 17
          };

          edit.node.value = '  test 1\n  test 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test 1\ntest 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 4);
        });

        it('should unindent on multiple lines  with 1 space at the start of the line', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 15
          };

          edit.node.value = ' test 1\n test 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test 1\ntest 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 2);
        });

        it('should not unindent on multiple lines with no ident', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 0,
            end: 13
          };

          edit.node.value = 'test 1\ntest 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('test 1\ntest 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end);
        });

        it('should unindent on multiple lines surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 24
          };

          edit.node.value = 'line 1\n  test 1\n  test 2\nline 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\ntest 1\ntest 2\nline 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 4);
        });

        it('should unindent a single indent on multiple lines surrounded by other unselected lines', () => {
          const { edit } = setup();
          const carratLocation = {
            start: 7,
            end: 22
          };

          edit.node.value = 'line 1\n test 1\n test 2\nline 2';
          edit.node.selectionStart = carratLocation.start;
          edit.node.selectionEnd = carratLocation.end;

          edit.simulate('keyDown', {
            keyCode: 9,
            shiftKey: true
          });
          expect(Note.prototype.checkforTabbing.calledOnce).to.be.true;
          expect(edit.node.value).to.equal('line 1\ntest 1\ntest 2\nline 2');
          expect(edit.node.selectionStart).to.equal(carratLocation.start);
          expect(edit.node.selectionEnd).to.equal(carratLocation.end - 2);
        });
      });
    });
  });
});
