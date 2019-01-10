import { browserHistory } from 'react-router';
import { SET_COUNTRIES, SET_TIMEZONES, SET_ACTIVITY } from '../common';
import { signInRequest, forgotPasswordRequest, signOut } from './requests';

const SET_UKEY = 'juvo/auth/SET_UKEY';
export const SET_USER = 'juvo/auth/SET_USER';
const ACTION_LOGOUT = 'juvo/auth/ACTION_LOGOUT';
const SET_LOGIN_CREDENTIALS = 'juvo/auth/SET_LOGIN_CREDENTIALS';
const SET_LOADING = 'juvo/auth/SET_LOADING';
const SET_ERROR = 'juvo/auth/SET_ERROR';
const SET_FORGOT = 'juvo/auth/SET_FORGOT';
const SET_CLEAR = 'juvo/auth/SET_CLEAR';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
// const FAILURE = '_FAILURE';


export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, identity: action.payload, loading: false, error: {}, values: {} };
    }
    case SET_UKEY: {
      return { ...state, authenticated: action.payload, values: {} };
    }
    case ACTION_LOGOUT: {
      return { ...state, authenticated: false, identity: {} };
    }
    case SET_COUNTRIES: {
      return { ...state, countries: action.payload };
    }
    case SET_TIMEZONES: {
      return { ...state, timezones: action.payload };
    }
    case SET_LOGIN_CREDENTIALS: {
      return { ...state, values: action.payload };
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case SET_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case SET_FORGOT: {
      return { ...state, forgot: action.payload, loading: false, error: null };
    }
    case SET_CLEAR: {
      return { ...state, forgot: null, loading: false, error: null, values: {} };
    }
    case `${SET_ACTIVITY}${SUCCESS}`: {
      const identity = { ...state.identity };
      identity.notification_count = 0;
      return { ...state, identity };
    }
    default: return state;
  }
};

export const logout = () => {
  if (localStorage.getItem('ukey')) {
    signOut()
      .then(() => {
        localStorage.removeItem('ukey');
        localStorage.removeItem('uid');
        browserHistory.push('/sign-in');
      }).catch(() => {
        localStorage.removeItem('ukey');
        localStorage.removeItem('uid');
        browserHistory.push('/sign-in');
      });
  } else {
    localStorage.removeItem('ukey');
    localStorage.removeItem('uid');
    browserHistory.push('/sign-in');
  }
  return ({ type: ACTION_LOGOUT });
};

export const loginFormChange = (event) => {
  return (dispatch, getState) => {
    const values = { ...getState().auth.values };
    values[event.target.name] = event.target.value;
    dispatch({ type: SET_LOGIN_CREDENTIALS, payload: values });
  };
};

export const loginFormSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
    const values = { ...getState().auth.values };
    signInRequest(values)
      .then((response) => {
        const { ukey, uid } = response;
        if (ukey) {
          if (localStorage.getItem('ukey')) {
            localStorage.removeItem('ukey');
            localStorage.removeItem('uid');
          }
          localStorage.setItem('ukey', ukey);
          localStorage.setItem('uid', uid);
          browserHistory.push('/dashboard');
        }
      })
      .catch(error => dispatch({ type: SET_ERROR, payload: error }));
  };
};

export const setUserInfo = user => ({ type: SET_USER, payload: user });

export const setError = uid => ({ type: SET_ERROR, payload: (uid && { message: `Unable to find user with id ${uid}` }) });
export const clearError = () => ({ type: SET_ERROR, payload: null });

export const forgotFormChange = (event) => {
  return (dispatch, getState) => {
    const values = { ...getState().auth.values };
    values[event.target.name] = event.target.value;
    dispatch({ type: SET_LOGIN_CREDENTIALS, payload: values });
  };
};

export const forgotFormSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const values = { ...getState().auth.values };
    dispatch({ type: SET_ERROR, payload: null });
    dispatch({ type: SET_FORGOT, payload: null });
    dispatch({ type: SET_LOADING, payload: true });
    forgotPasswordRequest(values)
      .then(({ message }) => dispatch({ type: SET_FORGOT, payload: { message } }))
      .catch(error => dispatch({ type: SET_ERROR, payload: error }));
  };
};

export const clearData = () => ({ type: SET_CLEAR });
