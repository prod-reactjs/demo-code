import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import juvo from 'juvo';
import { momentFormats } from 'common/utils';

import {
  getCommonData,
  getUserData,
  search,
  clearNorifications,
  managementsFetch,
  // managementInfo,
  managementCreate,
  managementUpdate,
  managementDelete,
  fetchUsers,
} from './requests';
import { getActivity } from '../app/dashboard/activity/requests';

export const SET_STATIC_DATA = 'juvo/common/SET_STATIC_DATA';
export const SET_USER_DATA = 'juvo/common/SET_USER_DATA';
export const SET_COUNTRIES = 'juvo/common/SET_COUNTRIES';
export const SET_TIMEZONES = 'juvo/common/SET_TIMEZONES';
export const SET_ACTIVITY = 'juvo/common/SET_ACTIVITY';
export const SET_DASHBOARD = 'juvo/common/SET_DASHBOARD';
const SET_MANAGEMENTS = 'juvocommony/SET_MANAGEMENTS';
const SET_MANAGEMENT = 'juvo/common/SET_MANAGEMENT';
const SET_EDIT_MANAGEMENT = 'juvo/common/SET_EDIT_MANAGEMENT';
const SET_MANAGEMENT_CREATE = 'juvo/common/SET_MANAGEMENT_CREATE';
const SET_MANAGEMENT_UPDATE = 'juvo/common/SET_MANAGEMENT_UPDATE';
const SET_MANAGEMENT_DELETE = 'juvo/common/SET_MANAGEMENT_DELETE';
const SET_ERROR = 'juvo/common/SET_ERROR';
const SET_CLEAR_ERROR = 'juvo/common/SET_CLEAR_ERROR';
const SET_USERS = 'juvo/common/SET_USERS';
const SET_MANAGEMENT_DATA = 'juvo/common/SET_MANAGEMENT_DATA';
const SET_MODAL = 'juvo/common/SET_MODAL';


const SET_SEARCH = 'juvo/common/SET_SEARCH';
const SET_SELECTED_SEARCH = 'juvo/common/SET_SELECTED_SEARCH';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export const juvoTypes = {
  property: id => juvo.properties.infoLink(id),
  contact: id => juvo.contacts.infoLink(id),
  appointment: id => juvo.diary.infoLink(id),
  tenancy: id => juvo.tenancies.infoLink(id),
  offer: id => juvo.offers.infoLink(id),
  1: id => juvo.properties.infoLink(id),
  2: id => juvo.contacts.infoLink(id),
  3: id => juvo.diary.infoLink(id),
  4: id => juvo.tenancies.infoLink(id),
  5: id => juvo.offers.infoLink(id),
};


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { diary_day_start, date_format, date_display_format, currency_symbol, ...rest } = action.res.data;
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      return {
        ...state,
        user: {
          diaryStart: diary_day_start,
          dateFormat,
          dateDisplayFormat,
          currency,
          ...rest,
        }
      };
    }
    case `${SET_SEARCH}${SUCCESS}`: {
      return { ...state, search: action.res.data };
    }
    case `${SET_ACTIVITY}${SUCCESS}`: {
      return { ...state, notifications: action.res.data.array.slice(0, 5) };
    }
    case SET_SELECTED_SEARCH: {
      return { ...state, selected: action.payload[0] };
    }
    case `${SET_MANAGEMENTS}${REQUEST}`: {
      return { ...state, managementsLoading: true };
    }
    case `${SET_MANAGEMENTS}${SUCCESS}`: {
      return { ...state, managements: action.res, managementsLoading: false };
    }
    case SET_MANAGEMENT: {
      return { ...state, management: action.payload, modal: 'management' };
    }
    case SET_EDIT_MANAGEMENT: {
      return { ...state, editManagement: action.payload, modal: 'management' };
    }
    case `${SET_MANAGEMENT_CREATE}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_MANAGEMENT_CREATE}${FAILURE}`: {
      const errors = action.error.errors;
      return { ...state, error: { callback: () => toastr.error('Management', action.error.message), errors }, loading: false };
    }
    case `${SET_MANAGEMENT_CREATE}${SUCCESS}`: {
      const managements = state.managements ? { ...state.managements } : {};
      managements.data = managements.data ? [action.res.data].concat([...managements.data]) : [action.res.data];
      return { ...state, managements, management: {}, error: null, loading: true };
    }
    case `${SET_MANAGEMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const managements = state.managements ? { ...state.managements } : {};
      managements.data = [...managements.data].filter(management => management.id !== id);
      return { ...state, managements, management: {} };
    }
    case `${SET_MANAGEMENT}${SUCCESS}`: {
      return { ...state, management: action.res.data };
    }
    case SET_CLEAR_ERROR: {
      const error = { ...state.error };
      delete error.callback;
      return { ...state, error };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case `${SET_USERS}${SUCCESS}`: {
      return { ...state, users: action.res.data };
    }
    case SET_MANAGEMENT_DATA: {
      return { ...state, managementData: action.payload, management: {} };
    }
    case `${SET_MANAGEMENT_UPDATE}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_MANAGEMENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', Object.keys(errors).map(key => errors[key]).join('\r\n')) },
        loading: false,
      };
    }
    case `${SET_MANAGEMENT_UPDATE}${SUCCESS}`: {
      const management = action.res.data;
      const managements = state.managements ? { ...state.managements } : {};
      managements.data = [...managements.data].map((item) => { return item.id === management.id ? management : item; });
      return { ...state, managements, management: {}, editManagement: {}, modal: '', error: null, loading: false };
    }
    case SET_MODAL: {
      return { ...state, modal: action.payload };
    }
    case `${SET_DASHBOARD}${SUCCESS}`: {
      const charts = { ...action.res.stats };
      const dashboard = {};
      Object.keys(charts).forEach((key) => {
        console.log(charts[key]);
        dashboard[key] = charts[key].map(item => ([moment(item.date).format(), item.total]));
      });
      return { ...state, dashboard, loading: false };
    }

    default: return state;
  }
};

export const setCommonData = () => ({ type: SET_STATIC_DATA, promise: getCommonData() });
export const setUserData = () => ({ type: SET_USER_DATA, promise: getUserData() });
export const setCountries = countries => ({ type: SET_COUNTRIES, payload: countries });
export const setTimezones = timezones => ({ type: SET_TIMEZONES, payload: timezones });
export const getSearchData = data => ({ type: SET_SEARCH, promise: search({ s: data }) });
export const setSelectedSearch = (data) => {
  return (dispatch) => {
    if (data[0]) {
      console.log(data[0]);
      browserHistory.push(juvoTypes[data[0].type](data[0].id));
    }
    dispatch({ type: SET_SELECTED_SEARCH, payload: data });
  };
};
export const handleNotificationsClick = () => (dispatch) => {
  clearNorifications();
  dispatch({ type: SET_ACTIVITY, promise: getActivity() });
};
export const getManagements = data => ({ type: SET_MANAGEMENTS, promise: managementsFetch(data) });
// export const getManagementInfo = id => ({ type: SET_MANAGEMENT, promise: managementInfo(id) });
export const getManagementInfo = id => (dispatch, getState) => {
  const editManagement = [...getState().common.managements.data].find(item => item.id === id);
  dispatch({ type: SET_EDIT_MANAGEMENT, payload: editManagement });
};
export const handleManagementChange = event => (dispatch, getState) => {
  const management = { ...getState().common.management };
  if (event.target.type === 'checkbox') {
    management[event.target.name] = event.target.checked;
  } else {
    management[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_MANAGEMENT, payload: management });
};
export const handleEditManagementChange = event => (dispatch, getState) => {
  const editManagement = { ...getState().common.editManagement };
  if (event.target.type === 'checkbox') {
    editManagement[event.target.name] = event.target.checked;
  } else {
    editManagement[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_EDIT_MANAGEMENT, payload: editManagement });
};
export const handleManagementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState() };
  const management = { ...state.common.management };
  management.category_id = state.common.managementData.category;
  management.element_id = management.element_id || state.common.managementData.element;
  management.chased = management.chased_local;
  console.log(management);
  if (management.chased) {
    management.chased_date = moment().format('YYYY-MM-DD');
    management.chased_by = state.auth.identity.id;
  }
  if (management.id) {
    dispatch({ type: SET_MANAGEMENT_UPDATE, promise: managementUpdate(management) });
  } else {
    // management.due_date = management.due_date || moment().format('YYYY-MM-DD');
    dispatch({ type: SET_MANAGEMENT_CREATE, promise: managementCreate(management) });
  }
};
export const handleEditManagementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState() };
  const editManagement = { ...state.common.editManagement };
  editManagement.category_id = state.common.managementData.category;
  editManagement.element_id = editManagement.element_id || state.common.managementData.element;
  editManagement.chased = editManagement.chased_local;
  console.log(editManagement);
  if (editManagement.chased) {
    editManagement.chased_date = moment().format('YYYY-MM-DD');
    editManagement.chased_by = state.auth.identity.id;
  }
  dispatch({ type: SET_MANAGEMENT_UPDATE, promise: managementUpdate(editManagement) });
};
export const handleManagementDelete = id => ({ type: SET_MANAGEMENT_DELETE, promise: managementDelete(id) });
export const handleManagementDateChange = (event) => {
  return (dispatch, getState) => {
    const management = { ...getState().common.management };
    const date = moment(Date.parse(event));
    management.due_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_MANAGEMENT, payload: management });
  };
};
export const handleEditManagementDateChange = (event) => {
  return (dispatch, getState) => {
    const editManagement = { ...getState().common.editManagement };
    const date = moment(Date.parse(event));
    editManagement.due_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_EDIT_MANAGEMENT, payload: editManagement });
  };
};
export const clearError = () => ({ type: SET_CLEAR_ERROR });
export const getUsers = () => ({ type: SET_USERS, promise: fetchUsers() });
export const setManagementData = data => ({ type: SET_MANAGEMENT_DATA, payload: data });
export const handleEditManagement = id => (dispatch, getState) => {
  const management = { ...getState().common.managements.data.find(item => item.id === id) };
  if (!getState().common.users.length) {
    dispatch(getUsers());
  }
  dispatch({ type: SET_MANAGEMENT, payload: management });
};
export const handleClose = () => ({ type: SET_MODAL, payload: '' });
export const handleDimissChanges = () => ({ type: SET_EDIT_MANAGEMENT, payload: {} });
