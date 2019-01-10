import React from 'react';
import { Row, Col, FormControl, Button, } from 'react-bootstrap';
import Note from './Note';
import NoDataFound from '../NoDataFound';

const modalBorder = {
  border: 0,
};
const tableHeaderStyle = {
  borderBottom: '1px solid',
};
const Notes = ({ user, note, notes, categories, createNote, deleteNote, onChange, loading }) => (
  <Row className="properties-page create">
    <div className="panel-body" style={modalBorder}>
      <Row>
        <form onSubmit={createNote}>
          <Row>
            <Col sm={2}>
                Note
              </Col>
            <Col sm={10}>
              <FormControl
                  value={note.note || ''}
                  componentClass="textarea"
                  name="note"
                  onChange={onChange}
                />
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
                Category
              </Col>
            <Col sm={10}>
              <FormControl
                  value={note.category_id || ''}
                  componentClass="select"
                  name="category_id"
                  onChange={onChange}
                >
                {/*
                  <option value={''}>Select category</option>
                  */}
                {categories && categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Button
                  bsStyle="primary"
                  type="submit"
                  disabled={loading && loading.note}
                  className="pull-right"
                >
                {loading && loading.note && <i className="fa fa-circle-o-notch fa-spin" />} Add
                </Button>
            </Col>
          </Row>
        </form>
      </Row>
      <Row className="table-header" style={tableHeaderStyle}>
        <Col sm={4} className="column">
            Created
          </Col>
        <Col sm={8} className="column">
            Note
          </Col>
      </Row>
      {!notes || notes.length === 0 ? <NoDataFound /> :
          notes.map(item => (
            <Note key={item.id} user={user} note={item} deleteNote={deleteNote} />
          )
        )}
    </div>
  </Row>

);

Notes.propTypes = {
  user: React.PropTypes.object,
  note: React.PropTypes.object.isRequired,
  notes: React.PropTypes.array,
  categories: React.PropTypes.array,
  createNote: React.PropTypes.func.isRequired,
  deleteNote: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Notes;
