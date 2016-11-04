/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
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
  const component = shallow(<Note {...props} />);
  return {
    component,
    actions
  };
}


describe('Note component', () => {
  it('should should have an note__container classname', () => {
    const { component } = setup();
    expect(component.hasClass('note__container')).to.equal(true);
  });

  it('should should have a header div element', () => {
    const { component } = setup();
    const mock = (
      <div className="note__header">
        <input type="text" className="note__header__label" />
        <button className="note__header__btn btn btn--white">View</button>
      </div>
    );
    expect(component.find('.note__header').equals(mock)).to.deep.equal(true);
  });

  it('should have default note title as "Note 1"', () => {
    const { component } = setup();
    expect(component.find('input').value).to.equal('Note 1');
  });

  it('should should have a text area element', () => {
    const { component } = setup();
    expect(component.contains(<textarea className="note__note" name="noteText" />)).to.equal(true);
  });
});
