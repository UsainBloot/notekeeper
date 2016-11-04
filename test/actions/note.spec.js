/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import * as actions from '../../app/actions/note';


describe('Note actions', () => {
  it('should save should create NOTE_SAVE action', () => {
    expect(actions.save()).to.deep.equal({ type: actions.NOTE_SAVE });
  });
});
