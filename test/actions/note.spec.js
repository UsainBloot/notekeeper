/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import marked from 'marked';
import * as actions from '../../app/actions/note';

describe('Note actions', () => {
  it('should save should create NOTE_SAVE action', () => {
    expect(actions.save()).to.deep.equal({ type: actions.NOTE_SAVE });
  });

  it('should create NOTE_UPDATE_TITLE action', () => {
    expect(actions.updateTitle('title')).to.deep.equal({
      type: actions.NOTE_UPDATE_TITLE,
      payload: {
        title: 'title'
      }
    });
  });

  it('should create NOTE_SWITCH_VIEW action with edit payload for edit view', () => {
    expect(actions.switchView('edit')).to.deep.equal({
      type: actions.NOTE_SWITCH_VIEW,
      payload: {
        view: 'edit'
      }
    });
  });

  it('should create NOTE_SWITCH_VIEW action with view payload for view', () => {
    expect(actions.switchView('view')).to.deep.equal({
      type: actions.NOTE_SWITCH_VIEW,
      payload: {
        view: 'view'
      }
    });
  });

  it('should create NOTE_CONVERT_TO_HTML action', () => {
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

    expect(actions.convertToHtml(raw)).to.deep.equal({
      type: actions.NOTE_CONVERT_TO_HTML,
      payload: {
        raw,
        html
      }
    });
  });
});
