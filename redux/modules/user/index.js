import {
  normalize,
  Schema,
  arrayOf
} from 'normalizr';
import { toastr } from 'react-redux-toastr';
import superagent from 'superagent-defaults';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState, RichUtils } from 'draft-js';

import { SET_CURRENT_SUBSCRIPTION } from '../billing';
import { SET_USER as SET_AUTH } from '../auth';
import { fetch, fetchUserInfo, deletePost, createPost, updatePost, updateProfile, signLogo, URL_AWS_LOGO, createMedia, URL_AWS_MEDIA } from './requests';
import { SET_TIMEZONES } from '../common';

export const SET_USERS = 'juvo/user/SET_USERS';
const SET_USER = 'juvo/user/SET_USER';
const SET_DELETE_USER = 'juvo/user/SET_DELETE_USER';
const SET_CREATE_USER = 'juvo/user/SET_CREATE_USER';
const SET_UPDATE_USER = 'juvo/user/SET_UPDATE_USER';
const SET_USER_ERROR = 'juvo/user/SET_USER_ERROR';
const SET_SIGNATURE = 'juvo/user/SET_SIGNATURE';
const SET_USER_SIGNATURE = 'juvo/user/SET_USER_SIGNATURE';
const SET_ACCOUNT_MEDIA_ID = 'juvo/user/SET_ACCOUNT_MEDIA_ID';
const SET_ACCOUNT_IMAGE = 'juvo/user/SET_ACCOUNT_IMAGE';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

const usersModel = new Schema('users');


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_CURRENT_SUBSCRIPTION}${SUCCESS}`: {
      return { ...state, subscription: action.res.data };
    }
    case SET_USER: {
      return { ...state, user: action.payload, signature: EditorState.createEmpty(), userSignature: EditorState.createEmpty() };
    }
    case SET_SIGNATURE: {
      return { ...state, signature: action.payload };
    }
    case SET_USER_SIGNATURE: {
      return { ...state, userSignature: action.payload };
    }
    case `${SET_USERS}${SUCCESS}`: {
      const res = {
        users: action.res.data,
      };
      const result = normalize(res, { users: arrayOf(usersModel) });
      return { ...state, users: result.entities.users, usersMap: result.result.users };
    }
    case `${SET_USER}${SUCCESS}`: {
      const user = action.res.data;
      const signature = user.email_signature ? EditorState.createWithContent(stateFromHTML(user.email_signature)) : EditorState.createEmpty();
      const userSignature = user.user_signature ? EditorState.createWithContent(stateFromHTML(user.user_signature)) : EditorState.createEmpty();
      // const signature = EditorState.createEmpty();
      return { ...state, user, signature, userSignature };
    }
    case SET_TIMEZONES: {
      return { ...state, timezones: action.payload };
    }
    case SET_ACCOUNT_MEDIA_ID: {
      return {...state, accountMediaId: action.payload};
    }
    case SET_ACCOUNT_IMAGE: {
      return {...state, profileImage: action.payload};
    }
    case SET_UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case `${SET_UPDATE_USER}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_UPDATE_USER}${SUCCESS}`: {
      const users = { ...state.users };
      const user = { ...state.user };
      users[user.id] = user;
      return { ...state, loading: false, users, error: { callback: () => toastr.success('Success', 'Saved') } };
    }
    case `${SET_UPDATE_USER}${FAILURE}`: {
      const error = action.error;
      return { ...state, loading: false, error: { callback: () => toastr.error('Error', error.message), errors: error.errors } };
    }
    case `${SET_CREATE_USER}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_CREATE_USER}${FAILURE}`: {
      const error = action.error;
      return { ...state, loading: false, error: { callback: () => toastr.error('Error', error.message), errors: error.errors } };
    }
    case `${SET_CREATE_USER}${SUCCESS}`: {
      const users = { ...state.users };
      const user = { ...state.user };
      users[user.id] = user;
      return { ...state, loading: false, users, error: { callback: () => toastr.success('Success', 'Saved') } };
    }
    case `${SET_DELETE_USER}${FAILURE}`: {
      return { ...state, loading: false, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_DELETE_USER}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const users = { ...state.users };
      const usersMap = [...state.usersMap].filter(item => item !== id);
      delete users[id];
      return { ...state, users, usersMap, error: { callback: () => toastr.info('User', 'User deleted!') } };
    }
    case SET_USER_ERROR: {
      const error = { ...state.error };
      delete error.callback;
      return { ...state, error };
    }
    default: return state;
  }
};

export const fetchUsers = () => ({ type: SET_USERS, promise: fetch() });
export const getUserInfo = id => ({ type: SET_USER, promise: fetchUserInfo(id) });
export const deleteUser = id => ({ type: SET_DELETE_USER, promise: deletePost({ id }) });
export const userChange = (event) => {
  return (dispatch, getState) => {
    const user = { ...getState().user.user };
    if (event.target.type === 'checkbox') {
      user[event.target.name] = user[event.target.name] && user[event.target.name] === 1 ? 0 : 1;
    } else {
      user[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_UPDATE_USER, payload: user });
  };
};
export const userSave = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: `${SET_UPDATE_USER}${REQUEST}` });
    const state = { ...getState() };
    console.log(state);
    const user = { ...state.user.user };
    const signature = state.user.signature;
    const userSignature = state.user.userSignature;
    const identity = { ...state.auth.identity };
    const raw = signature.getCurrentContent();
    const rawSignature = userSignature.getCurrentContent();
    user.email_signature = stateToHTML(raw);
    user.user_signature = stateToHTML(rawSignature);
    user.account_media_id = state.user.accountMediaId;
    if (user.id) {
      if (user.id === identity.id) {
        updatePost(user)
          .then(({ data }) => {
            if (data) {
              dispatch({ type: SET_AUTH, payload: data });
              dispatch({ type: `${SET_UPDATE_USER}${SUCCESS}` });
            }
          })
          .catch(error => dispatch({ type: `${SET_UPDATE_USER}${FAILURE}`, error }));
      } else {
        dispatch({ type: SET_UPDATE_USER, promise: updatePost(user) });
      }
    } else {
      dispatch({ type: SET_CREATE_USER, promise: createPost(user) });
    }
  };
};
export const profileSave = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: `${SET_UPDATE_USER}${REQUEST}` });
    const state = { ...getState() };
    const user = { ...state.user.user };
    const signature = state.user.signature;
    const raw = signature.getCurrentContent();
    user.email_signature = stateToHTML(raw);
    user.account_media_id = state.user.accountMediaId;
    if (user.id) {
      updateProfile(user)
        .then(({ data }) => {
          if (data) {
            dispatch({ type: SET_AUTH, payload: data });
            dispatch({ type: `${SET_UPDATE_USER}${SUCCESS}` });
          }
        })
        .catch(error => dispatch({ type: `${SET_UPDATE_USER}${FAILURE}`, error }));
    } else {
      dispatch({ type: SET_CREATE_USER, promise: createPost(user) });
    }
  };
};
export const signatureChange = editorState => ({ type: SET_SIGNATURE, payload: editorState });
export const userSignatureChange = editorState => ({ type: SET_USER_SIGNATURE, payload: editorState });
export const clearError = () => ({ type: SET_USER_ERROR });
export const clearUser = () => ({ type: SET_USER, payload: {} });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const signature = getState().user.signature;
    dispatch(signatureChange(RichUtils.toggleBlockType(signature, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const signature = getState().user.signature;
    dispatch(signatureChange(RichUtils.toggleInlineStyle(signature, inlineStyle)));
  };
};
export const userToggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const userSignature = getState().user.userSignature;
    dispatch(userSignatureChange(RichUtils.toggleBlockType(userSignature, blockType)));
  };
};
export const userToggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const userSignature = getState().user.userSignature;
    dispatch(userSignatureChange(RichUtils.toggleInlineStyle(userSignature, inlineStyle)));
  };
};

const uploadAWSLogo = (file, id, userID) => (dispatch) => {
  const aws = {};
  signLogo()
    .then(({ data }) => {
      aws.accessKey = (data && data.access_key) || null;
      aws.policy = (data && data.policy) || null;
      aws.signature = (data && data.signature) || null;
      if (aws.accessKey && aws.policy && aws.signature) {
        const uploadAmazon = () => {
          return new Promise((resolve, reject) => {
            const logo = new FormData();
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
        uploadAmazon().then(() => {
          if (userID) {
            dispatch(getUserInfo(userID));
          }
          dispatch({ type: `${SET_UPDATE_USER}${SUCCESS}` });
          dispatch({type: SET_ACCOUNT_IMAGE, payload: URL_AWS_MEDIA + id});
        }).catch(error => dispatch({ type: SET_USER_ERROR, payload: { callback: () => toastr.error('Import error', error) } }));
      }
    })
    .catch(error => dispatch({ type: SET_USER_ERROR, payload: { callback: () => toastr.error('Upload error', error) } }));
};

export const uploadProfile = event => (dispatch, getState) => {
  const logo = event.target.files[0];
  const name = logo.name;
  const size = logo.size;
  if (logo) {
    const values = {};
    values.filesize = size;
    values.filename = name;
    createMedia(values)
      .then(({ filename, id }) => {
        const userData = { ...getState().user.user};
        // called during user update
        if (userData.id) {
          userData.account_media_id = id;
          updateProfile(userData)
          .then(({ data }) => {
            if (data) {
              dispatch(uploadAWSLogo(logo, filename, userData.id));
            }
          })
          .catch(error => dispatch({ type: `${SET_UPDATE_USER}${FAILURE}`, error }));
        } else {
          dispatch({type: SET_ACCOUNT_MEDIA_ID, payload: id});
          dispatch(uploadAWSLogo(logo, filename, userData.id));
        }
      })
      .catch((updateError) => {
        const { errors } = updateError;
        const errorsArray = [];
        Object.keys(errors).forEach(key => errorsArray.push(errors[key]));
        dispatch({ type: SET_USER_ERROR, payload: { callback: () => toastr.error('Error', errorsArray.join(',')), message: errorsArray.join(', ') } });
      });
  }
};
export const clearAccountImage = () => ({ type: SET_ACCOUNT_IMAGE, payload: null });

