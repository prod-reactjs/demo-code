import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import AddTodo from './AddTodo';
import Element from './TodoElement';

class Todos extends Component {
  state = {
    user: null,
  }
  componentDidMount() {
    this.props.actions.fetchUsers();
    this.props.actions.fetchTodos();
  }

  handleSelectUser = (e) => {
    this.setState({ user: e.target.value });
    if (e.target.value) {
      this.props.actions.fetchTodos({ uid: e.target.value });
    } else {
      this.props.actions.fetchTodos();
    }
  }

  render() {
    const { todos: { data = [], isError, loading, modal, users = [], values, submitLoading }, actions } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">
          Todos
          <button onClick={actions.showModal}>
            <i className="glyphicon glyphicon-plus" />
          </button>
          <FormControl
            value={this.state.user || ''}
            name="uid"
            componentClass="select"
            onChange={this.handleSelectUser}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </FormControl>
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
            {data.length ? data.map((todo, index) => (
              <tr key={index}>
                <td>
                  <Element
                    onEdit={actions.showModal}
                    onRemove={actions.removeTodo}
                    onComplete={actions.completeTodo}
                    todo={todo}
                  />
                </td>
              </tr>
            ))
              : !loading && (
                <tr>
                  <td>
                    <h5 className="text-center">Nothing to show...</h5>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {modal && (
          <AddTodo
            todoValues={values || {}}
            users={users}
            handleClose={actions.hideModal}
            onSubmit={actions.handleSubmit}
            onChange={actions.handleChange}
            loading={submitLoading}
          />
        )}
      </div>
    );
  }
}


Todos.propTypes = {
  todos: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Todos;
