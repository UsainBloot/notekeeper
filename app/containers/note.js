import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Note from '../components/note';
import * as NoteActions from '../actions/note';

function mapStateToProps(state) {
  return {
    note: state.note,
    title: state.note.title,
    view: state.note.view,
    html: state.note.html,
    isEditView: state.note.view === 'edit'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
