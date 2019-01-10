import { toastr } from 'react-redux-toastr';
import superagent from 'superagent-defaults';
import { fetch, update, signLogo, URL_AWS_LOGO } from './requests';

import { SET_USER_DATA, setUserData } from '../../../common';

const SET_SETTINGS_DATA = 'juvo/app/settings/SET_SETTINGS_FETCH';
const SET_SETTINGS_UPDATE = 'juvo/app/settings/SET_SETTINGS_UPDATE';
const SET_CLEAR_ERROR = 'juvo/app/settings/SET_CLEAR_ERROR';
const SET_ERROR = 'juvo/app/settings/SET_ERROR';
const SET_LOGO_PROGRESS = 'juvo/app/settings/SET_LOGO_PROGRESS';
const SET_LOADING = 'juvo/app/settings/SET_LOADING';

const SUCCESS = '_SUCCESS';
// const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_SETTINGS_DATA}${SUCCESS}`: {
      return { ...state, values: action.res.data };
    }
    case SET_SETTINGS_UPDATE: {
      return { ...state, values: action.payload };
    }
    case `${SET_SETTINGS_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      const errorsArray = [];
      Object.keys(errors).forEach(key => errorsArray.push(errors[key]));
      return { ...state, error: { callback: () => toastr.error('Error', errorsArray.join(',')), message: errorsArray.join(', ') } };
    }
    case `${SET_SETTINGS_UPDATE}${SUCCESS}`: {
      return { ...state, error: { callback: () => toastr.success('Settings saved', action.res.message) } };
    }
    case SET_CLEAR_ERROR: {
      const error = { ...state.error } || {};
      delete error.callback;
      return { ...state, error };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      return { ...state, values: action.res.data };
    }
    case SET_LOGO_PROGRESS: {
      return { ...state, uploadLogoProgress: action.payload };
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    default: return state;
  }
};


export const fetchSettings = () => ({ type: SET_SETTINGS_DATA, promise: fetch() });
export const updateSettingsLocal = (event) => {
  return (dispatch, getState) => {
    const values = { ...getState().app.system.settings.values };
    if (event.target.type === 'file') {
      values.file = event.target.files[0];
    } else {
      values[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_SETTINGS_UPDATE, payload: values });
  };
};
const uploadAWSLogo = (file, id) => (dispatch) => {
  const aws = {};
  console.log('uploadLogo', file, id);
  signLogo()
    .then(({ data }) => {
      aws.accessKey = (data && data.access_key) || null;
      aws.policy = (data && data.policy) || null;
      aws.signature = (data && data.signature) || null;
      if (aws.accessKey && aws.policy && aws.signature) {
        const uploadAmazon = () => {
          return new Promise((resolve, reject) => {
            const logo = new FormData();
            // const filename = `${id}.${file.name.split('.').pop()}`;
            // const filename = `${id}_${file.name}`;
            // console.log(filename);
            logo.append('key', id);
            logo.append('acl', 'public-read');
            logo.append('Content-Type', 'binary/octet-stream');
            logo.append('AWSAccessKeyId', aws.accessKey);
            logo.append('Policy', aws.policy);
            logo.append('Signature', aws.signature);
            logo.append('file', file);
            logo.append('filesize', file.size);

            const request = superagent();
            try {
              request
                .post(URL_AWS_LOGO)
                .send(logo)
                .end((err, res) => {
                  if (err) {
                    reject(err);
                  }
                  if (res) {
                    resolve(res);
                  }
                });
            } catch (ex) {
              reject(ex);
            }
          });
        };
        uploadAmazon().then((res) => {
          console.log(res);
          dispatch(fetchSettings());
          // dispatch({ type: SET_IMPORT, promise: importContacts({ id }) });
        }).catch(error => dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Import error', error) } }));
      }
    })
    .catch(error => dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Upload error', error) } }));
};
export const uploadLogo = event => (dispatch, getState) => {
  const logo = event.target.files[0];
  if (logo) {
    const values = { ...getState().app.system.settings.values };
    values.date_format = values.date_format || 'd/m/Y';
    values.date_display_format = values.date_display_format || 'd/m/Y';
    values.logo = logo.name;
    update(values)
      .then(({ filename }) => {
        dispatch(uploadAWSLogo(logo, filename));
      })
      .catch((updateError) => {
        const { errors } = updateError;
        const errorsArray = [];
        Object.keys(errors).forEach(key => errorsArray.push(errors[key]));
        dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', errorsArray.join(',')), message: errorsArray.join(', ') } });
      });
  }
};
export const updateSettings = event => (dispatch, getState) => {
  event.preventDefault();
  dispatch({type: SET_LOADING, payload: true });
  const values = { ...getState().app.system.settings.values };
  values.date_format = values.date_format || 'd/m/Y';
  values.date_display_format = values.date_display_format || 'd/m/Y';
  values.logo = values.logo && values.logo.replace(/^.*[\\/]/, '');
  console.log(values);
  update(values)
    .then(() => {
      dispatch(setUserData());
      dispatch({ type: SET_ERROR, payload: { callback: () => toastr.success('Success', 'Settings saved') } });
    })
    .catch((err) => {
      const { errors } = err;
      const errorsArray = [];
      Object.keys(errors).forEach(key => errorsArray.push(errors[key]));
      dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', errorsArray.join(',')), message: errorsArray.join(', ') } });
    });
};
export const clearError = () => ({ type: SET_CLEAR_ERROR });
