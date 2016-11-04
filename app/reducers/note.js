import { NOTE_SAVE } from '../actions/note';

export default function counter(state: number = 0, action: Object) {
  switch (action.type) {
    case NOTE_SAVE:
      return state;
    default:
      return state;
  }
}
