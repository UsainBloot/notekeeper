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
    app
  };
}


describe('Note containers', () => {
  it('should display', () => {
    const { app } = setup();
    expect(app.containsMatchingElement(<NotePage />)).to.equal(true);
  });
});
