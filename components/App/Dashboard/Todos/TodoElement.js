import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

class TodoElement extends React.Component {
  handleRemove = () => {
    this.props.onRemove(this.props.todo.id);
  }
  handleComplete = () => {
    this.props.onComplete(this.props.todo.id);
  }
  handleEdit = () => {
    this.props.onEdit(this.props.todo.id);
  }
  render() {
    const { todo } = this.props;

    return (
      <div className="todo-element">
        <div className="info">
          <div className="user">
            <img src="https://www.gravatar.com/avatar/igor@adlab.pro?d=identicon&s=35" alt="" />
          </div>
          <div className="message">
            <div className="text">{todo.private ? (<i className="fa fa-eye" />) : null}{todo.description}</div>
            <div className="footer">
              <ButtonGroup className="pull-right">
                {!todo.completed && [
                  <Button key={1} onClick={this.handleEdit} bsStyle="default" bsSize="xsmall">Edit</Button>,
                  <Button key={2} onClick={this.handleComplete} bsStyle="primary" bsSize="xsmall">Complete</Button>
                ]}
                <Button key={3} onClick={this.handleRemove} bsStyle="danger" bsSize="xsmall">Remove</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoElement;
