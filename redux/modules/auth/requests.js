import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_SIGN_IN = '/account/login';
const URL_SIGN_UP = '/account/register';
const URL_RESET_REQUEST = '/account/forgot';
const URL_SIGN_OUT = '/account/logout';
const URL_COMPLETE_RESET_PASSWORD = '/account/reset';
const URL_USER_INFO = '/user/info';

export const userInfo = (id, ukey) =>
  getRequest(request => request.post(`${endpoint(URL_USER_INFO)}`)
    .query({ id, ukey })).then(checkStatus);
export const signInRequest = data =>
  getRequest(request => request.post(`${endpoint(URL_SIGN_IN)}`)
    .send(data)).then(checkStatus);
export const signUpRequest = data =>
  getRequest(request => request.post(`${endpoint(URL_SIGN_UP)}`)
    .send(data)).then(checkStatus);
export const forgotPasswordRequest = data =>
  getRequest(request => request.post(`${endpoint(URL_RESET_REQUEST)}`)
    .send(data)).then(checkStatus);
export const resetPasswordRequest = data =>
  getRequest(request => request.post(`${endpoint(URL_COMPLETE_RESET_PASSWORD)}`)
    .send(data)).then(checkStatus);
export const signOut = () =>
  getRequest(request => request.post(`${endpoint(URL_SIGN_OUT)}`))
    .then(checkStatus);
