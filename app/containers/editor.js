import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../components/editor';
import * as NoteActions from '../actions/note';

function mapStateToProps(state) {
  return {
    isEditView: state.note.view === 'edit'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NoteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
