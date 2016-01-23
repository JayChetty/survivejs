import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = NoteStore.getState();
  };


  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }


  render() {

    const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );

  };


  deleteNote = (id) => {
    NoteActions.delete(id);
  };

  addNote = () => {
    NoteActions.create({task: 'New task'});
  };

  editNote = (id, task) => {
    NoteActions.update({id, task});
  };
}
