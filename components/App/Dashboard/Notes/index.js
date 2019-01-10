import React from 'react';
import NoteElement from './NoteElement';


class NotesContainer extends React.Component {
  componentDidMount() {
    this.props.actions.fetchNotes();
  }
  render() {
    const { notes: { data = [], loading, isError } } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">
          Notes
        </div>
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {isError && (
              <tr>
                <td>
                  <h5 className="text-center">
                    <i className="glyphicon glyphicon-warning-sign" /> Can not fetch Todo
                  </h5>
                </td>
              </tr>
            )}
            {data.length ? (
              data.map((note, index) => (
                <tr key={index}>
                  <td><NoteElement note={note} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h5 className="text-center">Nothing to show...</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

NotesContainer.propTypes = {
  notes: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default NotesContainer;
