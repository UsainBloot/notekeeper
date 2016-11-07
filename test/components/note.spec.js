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
    edit: component.find('.notes__edit'),
    view: component.find('.notes__view')
  };
}

describe('Note component', () => {
  it('should dispatch updateTitle action when title input loses focus', () => {
    const { title, actions } = setup();
    // title.at(0).value = 'test note title';
    title.at(0).simulate('blur');
    expect(actions.updateTitle.called).to.be.true;
    // expect(actions.updateTitle.calledWith('test note title')).to.be.true;
  });

  it('should dispatch convertToHtml action on view button click', () => {
    const { component, editViewButton, actions } = setup();
    // edit.at(0).value = '**test**';
    component.update();
    editViewButton.at(0).simulate('click');
    expect(actions.convertToHtml.called).to.be.true;
  });

  it('should dispatch switchView action with "view" payload on view button click', () => {
    const { editViewButton, actions } = setup();
    editViewButton.at(0).simulate('click');
    expect(actions.switchView.called).to.be.true;
    expect(actions.switchView.calledWith('view')).to.be.true;
  });

  it('should dispatch switchView action with "edit" payload on edit button click', () => {
    const { component, editViewButton, actions } = setup();
    component.setProps({ view: 'view' });
    editViewButton.at(0).simulate('click');
    expect(actions.switchView.called).to.be.true;
    expect(actions.switchView.calledWith('edit')).to.be.true;
  });
});
