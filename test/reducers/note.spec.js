import { expect } from 'chai';
import note from '../../app/reducers/note';
import { NOTE_SAVE } from '../../app/actions/note';


describe('Note reducers', () => {
  it('should handle initial state', () => {
    expect(note(undefined, {})).to.equal(0);
  });

  it('should handle SAVE_NOTE', () => {
    expect(note(1, { type: NOTE_SAVE })).to.equal(1);
  });
});
