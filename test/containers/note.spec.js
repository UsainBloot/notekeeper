import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import marked from 'marked';
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
    edit: app.find('.editor__edit'),
    view: app.find('.note__view'),
    editViewButton: app.find('.note__header__btn'),
    title: app.find('.note__header__title')
  };
}


describe('Note containers', () => {
  it('should display', () => {
    const { app } = setup();
    expect(app.containsMatchingElement(<NotePage />)).to.equal(true);
  });

  it('should display edit panel when view in store is set to "edit"', () => {
    const { edit, view } = setup({
      note: {
        title: 'test title',
        view: 'edit',
        html: '',
        raw: ''
      }
    });
    expect(edit.hasClass('hide')).to.be.false;
    expect(view.hasClass('hide')).to.be.true;
  });

  it('should display view panel when view in store is set to "view"', () => {
    const { edit, view } = setup({
      note: {
        title: 'test title',
        view: 'view',
        html: '',
        raw: ''
      }
    });
    expect(edit.hasClass('hide')).to.be.true;
    expect(view.hasClass('hide')).to.be.false;
  });

  it('should display correct html in panel when switching from \'edit\' view', () => {
    const { edit, editViewButton, view } = setup({
      note: {
        title: 'test title',
        view: 'edit',
        html: '',
        raw: ''
      }
    });

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });

    const raw = '**test**';
    const html = marked(raw);
    edit.node.value = raw;
    editViewButton.simulate('click');

    expect(view.html()).to.contain(html);
  });

  it('should display correct note title from store', () => {
    const { title } = setup({
      note: {
        title: 'test title',
        view: 'edit',
        html: '',
        raw: ''
      }
    });

    expect(title.node.value).to.equal('test title');
  });
});
