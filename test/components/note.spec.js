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
  };
  const props = {
    convertToHtml: actions.convertToHtml,
    updateTitle: actions.updateTitle,
    title: 'Note 1',
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
        <input className="note__header__label" type="text" />
        <button className="note__header__btn btn btn--white">Convert to HTML</button>
      </div>
    );
    expect(component.contains(mock)).to.equal(true);
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
