import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import NotePage from '../../app/containers/note';
import configureStore from '../../app/store/configureStore';


function setup(initialState) {
  const store = configureStore(initialState);
  const app = mount(
    <Provider store={store}>
      <NotePage />
    </Provider>
  );
  return {
    app,
    edit: app.find('.notes__edit'),
    view: app.find('.notes__view')
  };
}


describe('Note containers', () => {
  it('should display', () => {
    const { app } = setup();
    expect(app.containsMatchingElement(<NotePage />)).to.equal(true);
  });

  // it('should display edit panel when view in store is set to "edit"', () => {
  //   const { edit, view } = setup({
  //     view: 'edit'
  //   });
  //   expect(edit.hasClass('hide')).to.be.false;
  //   expect(view.hasClass('hide')).to.be.true;
  // });
  //
  // it('should display view panel when view in store is set to "view"', () => {
  //   const { edit, view } = setup({
  //     view: 'view'
  //   });
  //   expect(edit.hasClass('hide')).to.be.true;
  //   expect(view.hasClass('hide')).to.be.false;
  // });
});
