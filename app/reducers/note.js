import _ from 'lodash';
import { NOTE_SAVE, NOTE_UPDATE_TITLE, NOTE_SWITCH_VIEW, NOTE_CONVERT_TO_HTML } from '../actions/note';

export default function note(
  state: Object = {
    view: 'edit',
    html: '',
    raw: '',
    title: 'Note 1'
  },
  action: Object
) {
  switch (action.type) {
    case NOTE_SAVE:
      return state;
    case NOTE_UPDATE_TITLE:
      return _.extend({}, state, {
        title: action.payload.title
      });
    case NOTE_SWITCH_VIEW:
      return _.extend({}, state, {
        view: action.payload.view
      });
    case NOTE_CONVERT_TO_HTML:
      return _.extend({}, state, {
        html: action.payload.html,
        raw: action.payload.raw
      });
    default:
      return state;
  }
}

// export default combineReducers({
//   view: function (state: String = 'note', action: Object) {
//
//   },
//   title: function (state: String = 'New Document', action: Object) {
//     if (action.type === NOTE_UPDATE_TITLE) {
//       return action.payload.title;
//     }
//   }
//   markdown: function () {
//
//   },
//   raw: function () {
//
//   }
// });
