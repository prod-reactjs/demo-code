import {
  normalize,
  Schema,
  arrayOf
} from 'normalizr';
import { fetch, createPost, deletePost, updatePost } from './requests';

const SET_LOCATIONS = 'juvo/app/system/options/locations/SET_LOCATIONS';
const SET_LOCATION = 'juvo/app/system/options/locations/SET_LOCATION';
const SET_LOCATION_CREATE = 'juvo/app/system/options/locations/SET_LOCATION_CREATE';
const SET_LOCATION_EDIT = 'juvo/app/system/options/locations/SET_LOCATION_EDIT';
const SET_MODAL_CLOSE = 'juvo/app/system/options/locations/SET_MODAL_CLOSE';
const SET_LOCATION_CHANGE = 'juvo/app/system/options/locations/SET_LOCATION_CHANGE';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
// const FAILURE = '_FAILURE';

const locationsModel = new Schema('locations');
// const locationModel = new Schema('location');
// locationsModel.define({
//   locations: arrayOf(locationModel),
// });

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_LOCATIONS}${SUCCESS}`: {
      const res = {
        locations: action.res.data,
      };
      const result = normalize(res, { locations: arrayOf(locationsModel) });
      return { ...state, entities: result.entities, result: result.result };
    }
    case `${SET_LOCATION}${SUCCESS}`: {
      const location = action.res.data;
      const list = [...state.list].filter(item => item.id !== location.id) || [];
      list.push(location);
      return { ...state, location, list };
    }
    case SET_LOCATION_CREATE: {
      return { ...state, location: {}, modal: true };
    }
    case SET_LOCATION_EDIT: {
      return { ...state, location: action.payload, modal: true };
    }
    case SET_MODAL_CLOSE: {
      return { ...state, modal: false };
    }
    case SET_LOCATION_CHANGE: {
      return { ...state, location: action.payload };
    }
    default: return state;
  }
};

export const fetchLocation = () => ({ type: SET_LOCATIONS, promise: fetch() });
export const createLocation = () => ({ type: SET_LOCATION_CREATE });
export const editLocation = (id) => {
  return (dispatch, getState) => {
    const location = {...getState().app.system.options.locations.entities.locations[id]} || {};
    location[event.target.name] = event.target.value;
    dispatch({ type: SET_LOCATION_EDIT, payload: location });
  };
};
export const deleteLocation = id => ({ type: SET_LOCATION, promise: deletePost(id) });
export const closeModal = () => ({ type: SET_MODAL_CLOSE });
export const changeLocation = (event) => {
  return (dispatch, getState) => {
    const location = {...getState().app.system.options.locations.location} || {};
    location[event.target.name] = event.target.value;
    dispatch({ type: SET_LOCATION_CHANGE, payload: location });
  };
};
export const submitLocation = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const location = {...getState().app.system.options.locations.location} || {};
    if (location.id) {
      dispatch({ type: SET_LOCATION, promise: updatePost(location) });
    } else {
      dispatch({ type: SET_LOCATION, promise: createPost(location) });
    }
  };
};
