import { expect } from 'chai';
import note from '../../app/reducers/note';
import { NOTE_UPDATE_TITLE, NOTE_SWITCH_VIEW, NOTE_CONVERT_TO_HTML } from '../../app/actions/note';


describe('Note reducers', () => {
  it('should handle initial state', () => {
    expect(note({}, {})).to.deep.equal({});
  });

  it('should handle NOTE_UPDATE_TITLE action', () => {
    const updateTitleAction = {
      type: NOTE_UPDATE_TITLE,
      payload: {
        title: 'test title'
      }
    };

    expect(note({}, updateTitleAction)).to.deep.equal({
      title: 'test title'
    });
  });

  it('should handle NOTE_SWITCH_VIEW action', () => {
    const switchViewAction = {
      type: NOTE_SWITCH_VIEW,
      payload: {
        view: 'test view'
      }
    };

    expect(note({}, switchViewAction)).to.deep.equal({
      view: 'test view'
    });
  });

  it('should handle NOTE_CONVERT_TO_HTML action', () => {
    const convertToHtmlAction = {
      type: NOTE_CONVERT_TO_HTML,
      payload: {
        html: '<p><strong>test text</strong></p>',
        raw: '**test text**'
      }
    };

    expect(note({}, convertToHtmlAction)).to.deep.equal({
      html: '<p><strong>test text</strong></p>',
      raw: '**test text**'
    });
  });
});
