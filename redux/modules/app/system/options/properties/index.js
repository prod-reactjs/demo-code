// import { normalize, Schema, arrayOf } from 'normalizr';
import { toastr } from 'react-redux-toastr';
import { fetchTypes, fetchCurrent, updateCurrent } from './requests';

const SET_TYPES = 'juvo/app/system/options/properties/SET_TYPES';
const SET_ACTIVE_TYPES = 'juvo/app/system/options/properties/SET_ACTIVE_TYPES';
const SET_ACTIVE_UPDATE = 'juvo/app/system/options/properties/SET_ACTIVE_UPDATE';
const SET_ACTIVE_SAVE = 'juvo/app/system/options/properties/SET_ACTIVE_SAVE';
const SET_PROPERTY_ERROR = 'juvo/app/system/options/properties/SET_PROPERTY_ERROR';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_TYPES}${SUCCESS}`: {
      return { ...state, types: action.res };
    }
    case `${SET_ACTIVE_TYPES}${SUCCESS}`: {
      const res = action.res;
      const active = {};
      Object.keys(res).forEach((item) => { active[res[item].id] = true; });
      return { ...state, active };
    }
    case `${SET_ACTIVE_SAVE}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_ACTIVE_SAVE}${FAILURE}`: {
      return { ...state, loading: false, error: { callback: () => toastr.error('Error', action.err.message), errors: action.err.errors } };
    }
    case `${SET_ACTIVE_SAVE}${SUCCESS}`: {
      const res = action.res.data;
      const active = {};
      res.forEach((item) => { active[item.id] = true; });
      return {
        ...state,
        error: { callback: () => toastr.success('Property types', 'Saved') },
        countryLoading: {},
        active,
        loading: false,
      };
    }
    case SET_ACTIVE_UPDATE: {
      return { ...state, active: action.payload };
    }
    case SET_PROPERTY_ERROR: {
      return { ...state, error: action.payload };
    }
    default: return state;
  }
};

export const fetchAllTypes = () => ({ type: SET_TYPES, promise: fetchTypes() });
export const fetchActiveTypes = () => ({ type: SET_ACTIVE_TYPES, promise: fetchCurrent() });
export const toggleCheckbox = (event) => {
  return (dispatch, getState) => {
    const active = { ...getState().app.system.options.properties.active };
    active[event.target.name] = !active[event.target.name];
    dispatch({ type: SET_ACTIVE_UPDATE, payload: active });
  };
};
export const saveCurrentTypes = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const active = { ...getState().app.system.options.properties.active };
    // const types = { ...getState().app.system.options.properties.types };
    console.log(active);
    const selected = [];
    Object.keys(active).forEach((key) => {
      if (active[key]) {
        selected.push(key);
      }
    });
    const data = { types: selected.join(',') };
    console.log(data);
    dispatch({ type: SET_ACTIVE_SAVE, promise: updateCurrent({ types: selected.join(',') }) });
  };
};
export const clearError = () => ({ type: SET_PROPERTY_ERROR });
