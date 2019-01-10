import { create, remove, todosList, complete, update, users } from './requests';

const SET_TODOS = 'juvo/app/dashboard/todos/SET_TODOS';
const SET_USERS = 'juvo/app/dashboard/todos/SET_USERS';
const ADD_TODO = 'juvo/app/dashboard/todos/ADD_TODO';
const UPDATE_TODO = 'juvo/app/dashboard/todos/UPDATE_TODO';
const REMOVE_TODO = 'juvo/app/dashboard/todos/REMOVE_TODO';
const COMPLETE_TODO = 'juvo/app/dashboard/todos/COMPLETE_TODO';
const SET_TODO_MODAL = 'juvo/app/dashboard/SET_TODO_MODAL';
const SET_HIDE_MODAL = 'juvo/app/dashboard/SET_HIDE_MODAL';


const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TODO_MODAL: {
      const id = parseInt(action.payload, 10);
      const values = isNaN(id) ? {} : [...state.data].filter(todo => todo.id === id)[0];
      values.user_id = values.user_id || [...state.users][0].id;
      return { ...state, modal: true, values };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: false };
    }
    case `${SET_USERS}${SUCCESS}`: {
      return { ...state, users: action.res.data };
    }
    case `${SET_TODOS}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_TODOS}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_TODOS}${SUCCESS}`: {
      return { ...state, data: action.res.data, loading: false };
    }
    case `${ADD_TODO}${REQUEST}`: {
      return { ...state, submitLoading: true };
    }
    case `${ADD_TODO}${FAILURE}`: {
      return { ...state, submitLoading: false };
    }
    case `${ADD_TODO}${SUCCESS}`: {
      const todo = [action.res.data];
      const data = todo.concat([...state.data]);
      return { ...state, data, modal: false, submitLoading: false };
    }
    case UPDATE_TODO: {
      return { ...state, values: action.payload };
    }
    case `${UPDATE_TODO}${REQUEST}`: {
      return { ...state, submitLoading: true };
    }
    case `${UPDATE_TODO}${FAILURE}`: {
      return { ...state, submitLoading: false };
    }
    case `${UPDATE_TODO}${SUCCESS}`: {
      const todo = action.res.data;
      const data = [...state.data].map(item => (item.id === todo.id ? todo : item));
      return { ...state, data, modal: false, values: {}, submitLoading: false };
    }
    case `${REMOVE_TODO}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const data = [...state.data].filter(todo => todo.id !== id);
      return { ...state, data };
    }
    case `${COMPLETE_TODO}${SUCCESS}`: {
      const todo = action.res.data;
      const data = [...state.data].map(item => (item.id === todo.id ? todo : item));
      return { ...state, data };
    }
    default: return state;
  }
};


export const showModal = id => ({ type: SET_TODO_MODAL, payload: id });
export const hideModal = () => ({ type: SET_HIDE_MODAL });
export const fetchUsers = () => ({ type: SET_USERS, promise: users() });
export const fetchTodos = query => ({ type: SET_TODOS, promise: todosList(query) });
export const removeTodo = id => ({ type: REMOVE_TODO, promise: remove(id) });
export const updateTodoLocal = (event) => {
  return (dispatch, getState) => {
    const values = { ...getState().app.dashboard.todos.values };
    if (event.target.type === 'checkbox') {
      values[event.target.name] = values[event.target.name] === 1 ? 0 : 1;
    } else {
      values[event.target.name] = event.target.value;
    }
    dispatch({ type: UPDATE_TODO, payload: values });
  };
};
export const updateTodo = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const values = { ...getState().app.dashboard.todos.values };
    if (values.id) {
      dispatch({ type: UPDATE_TODO, promise: update(values) });
    } else {
      dispatch({ type: ADD_TODO, promise: create(values) });
    }
  };
};
export const completeTodo = id => ({ type: COMPLETE_TODO, promise: complete(id) });
// export const createTodo = todo => ({ type: ADD_TODO, promise: create(todo) });

