import React from 'react';
import {
  Modal,
  FormControl,
  Button,
  FormGroup,
  ControlLabel,
  Row,
  Col,
} from 'react-bootstrap';

const AddTodo = ({ todoValues, users, handleClose, onSubmit, onChange, loading }) => (
  <Modal show onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{todoValues.id ? 'Edit Todo' : 'Create Todo'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={onSubmit}>
        {todoValues.id && (<input type="hidden" value={todoValues.id} />)}
        <FormGroup>
          <ControlLabel>User</ControlLabel>
          <FormControl
            value={todoValues.user_id || ''}
            disabled={!users}
            required
            name="user_id"
            componentClass="select"
            onChange={onChange}
          >
            {users && users.map(user => (
              <option key={user.id} value={user.id}>{ user.name }</option>
              )
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            required
            name="description"
            componentClass="textarea"
            value={todoValues.description || ''}
            onChange={onChange}
          />
        </FormGroup>
        <Row>
          <FormGroup className="form-checkbox">
            <Col componentClass={ControlLabel} xs={2}>
              Private
            </Col>
            <Col xs={10}>
              <input
                id="private"
                type="checkbox"
                checked={todoValues.private || false}
                name="private"
                onChange={onChange}
              />
              <label htmlFor="private" />
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <Col sm={2} smOffset={10}>
            <Button type="submit" disabled={loading} className="pull-right" bsStyle="primary">{loading && <i className="fa fa-circle-o-notch fa-spin" />} Submit</Button>
          </Col>
        </Row>
      </form>
    </Modal.Body>
  </Modal>
);

AddTodo.propTypes = {
  todoValues: React.PropTypes.object.isRequired,
  users: React.PropTypes.array,
  loading: React.PropTypes.bool,
  handleClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default AddTodo;
