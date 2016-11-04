/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Note from '../../app/components/note';


function setup() {
  const actions = {
    save: spy()
  };
  const component = shallow(<Note />);
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
        <span className="note__header__label">Note 1</span>
      </div>
    );
    expect(component.contains(mock)).to.equal(true);
  });

  it('should should have a text area element', () => {
    const { component } = setup();
    expect(component.contains(<textarea />)).to.equal(true);
  });
});