import { toastr } from 'react-redux-toastr';
import { fetch, fetchCurrent, updateCurrent } from './requests';

const SET_CODES = 'juvo/app/system/options/countries/SET_CODES';
const SET_ACTIVE_CODES = 'juvo/app/system/options/countries/SET_ACTIVE_CODES';
const SET_ACTIVE_UPDATE = 'juvo/app/system/options/countries/SET_ACTIVE_UPDATE';
const SET_ACTIVE_SAVE = 'juvo/app/system/options/countries/SET_ACTIVE_SAVE';
const SET_COUNTRY_ERROR = 'juvo/app/system/options/countries/SET_COUNTRY_ERROR';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_CODES}${SUCCESS}`: {
      const result = {
        result: {
          codes: Object.keys(action.res)
        },
        entities: {
          codes: action.res,
        }
      };
      return { ...state, entities: result.entities, result: result.result };
    }
    case `${SET_ACTIVE_CODES}${SUCCESS}`: {
      const res = action.res;
      const active = {};
      Object.keys(res).forEach((item) => { active[res[item].id] = true; });
      return { ...state, active };
    }
    case SET_ACTIVE_UPDATE: {
      return { ...state, active: action.payload };
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
        error: { callback: () => toastr.success('Mobile Country Codes', 'Saved') },
        countryLoading: {},
        active,
        loading: false,
      };
    }
    case SET_COUNTRY_ERROR: {
      return { ...state, error: action.payload || {} };
    }
    default: return state;
  }
};

export const fetchCodes = () => ({ type: SET_CODES, promise: fetch() });
export const fetchActiveCodes = () => ({ type: SET_ACTIVE_CODES, promise: fetchCurrent() });
export const toggleCheckbox = (event) => {
  return (dispatch, getState) => {
    const active = { ...getState().app.system.options.countries.active };
    active[event.target.name] = !active[event.target.name];
    dispatch({ type: SET_ACTIVE_UPDATE, payload: active });
  };
};
export const saveCurrentCodes = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const active = { ...getState().app.system.options.countries.active };
    const selected = [];
    Object.keys(active).forEach((key) => {
      if (active[key]) {
        selected.push(key);
      }
    });
    dispatch({ type: SET_ACTIVE_SAVE, promise: updateCurrent({ codes: selected.join(',') }) });
  };
};
export const clearError = () => ({ type: SET_COUNTRY_ERROR });

