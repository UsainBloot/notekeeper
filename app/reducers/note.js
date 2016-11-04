import _ from 'lodash';
import { NOTE_SAVE, NOTE_UPDATE_TITLE, NOTE_CONVERT_TO_HTML } from '../actions/note';

export default function note(
  state: Object = {
    view: 'note',
    html: '',
    markdown: ''
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
    case NOTE_CONVERT_TO_HTML:
      return _.extend({}, state, {
        view: 'html',
        html: action.payload.html,
        markdown: action.payload.markdown
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
