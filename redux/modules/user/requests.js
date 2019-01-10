import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_USERS = '/user/fetch';
const URL_FETCH_USER_INFO = '/user/info';
const URL_DELETE_USER = '/user/delete';
const URL_CREATE_USER = '/user/create';
const URL_UPDATE_USER = '/user/update';
const URL_UPDATE_PROFILE = '/user/profile';
const URL_CREATE_MEDIA = '/admin_media/create';
const URL_SIGN = '/admin_media/sign';
export const URL_AWS_LOGO = 'https://account-media-juvo.s3-eu-west-1.amazonaws.com';
export const URL_AWS_MEDIA = 'https://s3-eu-west-1.amazonaws.com/account-media-juvo/';

export const fetch = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_USERS)}`)
  ).then(checkStatus);

export const fetchUserInfo = id => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_USER_INFO)}`)
      .query({ id })
  ).then(checkStatus);

export const deletePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_USER)}`)
      .query(data)
  ).then(checkStatus);

export const updatePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_USER)}`)
      .send(data)
  ).then(checkStatus);

export const updateProfile = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_PROFILE)}`)
      .send(data)
  ).then(checkStatus);

export const createMedia = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_MEDIA)}`)
    .send(data)
).then(checkStatus);

export const createPost = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_USER)}`)
      .send(data)
  ).then(checkStatus);

export const signLogo = () => getRequest(
  request => request
    .post(`${endpoint(URL_SIGN)}`)
    .query())
  .then(checkStatus);

