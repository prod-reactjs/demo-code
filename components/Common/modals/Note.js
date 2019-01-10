import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import moment from 'moment';

class Note extends React.Component {
  handleDelete = () => {
    this.props.deleteNote(this.props.note.id);
  }
  render() {
    const { user, note } = this.props;
    return (
      <Row key={note.id} className="table-row modal-row">
        <Col sm={4}>
          {moment(note.created_date).format(user.dateDisplayFormat)}
        </Col>
        <Col sm={7}>
          {note.note}
        </Col>
        <Col sm={1}>
          <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
        </Col>
      </Row>
    );
  }
}

Note.propTypes = {
  user: React.PropTypes.object,
  note: React.PropTypes.object.isRequired,
  deleteNote: React.PropTypes.func.isRequired,
};

export default Note;
