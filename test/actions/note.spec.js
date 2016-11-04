/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import marked from 'marked';
import * as actions from '../../app/actions/note';

describe('Note actions', () => {
  it('should save should create NOTE_SAVE action', () => {
    expect(actions.save()).to.deep.equal({ type: actions.NOTE_SAVE });
  });

  it('should save should create NOTE_UPDATE_TITLE action', () => {
    expect(actions.updateTitle('title')).to.deep.equal({
      type: actions.NOTE_UPDATE_TITLE,
      payload: {
        title: 'title'
      }
    });
  });

  it('should save should create NOTE_CONVERT_TO_HTML action', () => {
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
    const rawMarkdown = '**test**';
    const html = marked(rawMarkdown);

    expect(actions.convertToHtml(rawMarkdown)).to.deep.equal({
      type: actions.NOTE_CONVERT_TO_HTML,
      payload: {
        markdown: rawMarkdown,
        html
      }
    });
  });
});
