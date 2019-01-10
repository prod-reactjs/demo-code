import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_ACCOUNT_STATIC = '/account/static';
const URL_ADMIN_INFO = '/admin/info';
const URL_SEARCH = '/search';
const URL_ACTIVITY_CLEAR = '/activity/clear';
const URL_MANAGEMENT_FETCH = '/management/fetch';
const URL_MANAGEMENT_INFO = '/management/info';
const URL_MANAGEMENT_CREATE = '/management/create';
const URL_MANAGEMENT_UPDATE = '/management/update';
const URL_MANAGEMENT_DELETE = '/management/delete';
const URL_FETCH_USERS = '/user/fetch';
const URL_FETCH_EMAIL_TEMPLATES = '/email/template';


export const getCommonData = () => getRequest(
  request => request
    .post(`${endpoint(URL_ACCOUNT_STATIC)}`)
).then(checkStatus);

export const getUserData = () => getRequest(
  request => request
    .post(`${endpoint(URL_ADMIN_INFO)}`)
).then(checkStatus);

export const search = data => getRequest(
  request => request
    .post(`${endpoint(URL_SEARCH)}`)
    .send(data)
).then(checkStatus);

export const clearNorifications = () => getRequest(
  request => request
    .post(`${endpoint(URL_ACTIVITY_CLEAR)}`)
).then(checkStatus);

export const managementsFetch = data => getRequest(
  request => request
    .post(`${endpoint(URL_MANAGEMENT_FETCH)}`)
    .send(data)
).then(checkStatus);

export const managementInfo = id => getRequest(
  request => request
    .get(`${endpoint(URL_MANAGEMENT_INFO)}`)
    .query({ id })
).then(checkStatus);

export const managementCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_MANAGEMENT_CREATE)}`)
    .send(data)
).then(checkStatus);

export const managementUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_MANAGEMENT_UPDATE)}`)
    .send(data)
).then(checkStatus);

export const managementDelete = id => getRequest(
  request => request
    .get(`${endpoint(URL_MANAGEMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);

export const fetchUsers = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_USERS)}`)
).then(checkStatus);

export const fetchEmailAutoComplete = () => getRequest(
  request => request
    .get(`${endpoint(URL_FETCH_EMAIL_TEMPLATES)}`)
).then(checkStatus);
