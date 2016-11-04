import { expect } from 'chai';
import note from '../../app/reducers/note';
import { NOTE_UPDATE_TITLE, NOTE_CONVERT_TO_HTML } from '../../app/actions/note';


describe('Note reducers', () => {
  it('should handle initial state', () => {
    expect(note({}, {})).to.equal({});
  });

  it('should handle NOTE_UPDATE_TITLE action', () => {
    const updateTitleAction = {
      type: NOTE_UPDATE_TITLE,
      payload: {
        title: 'test title'
      }
    };

    expect(note({}, updateTitleAction)).to.equal({
      title: 'test title'
    });
  });

  it('should handle NOTE_CONVERT_TO_HTML action', () => {
    const convertToHtmlAction = {
      type: NOTE_CONVERT_TO_HTML,
      payload: {
        html: '<p><strong>test text</strong></p>',
        markdown: '**test text**'
      }
    };

    expect(note({}, convertToHtmlAction)).to.equal({
      view: 'html',
      html: '<p><strong>test text</strong></p>',
      markdown: '**test text**'
    });
  });
});
