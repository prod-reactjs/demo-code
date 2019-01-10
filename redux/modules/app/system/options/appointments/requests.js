import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_APPOINTMENT = '/admin_appointment/fetch';
const URL_CREATE_APPOINTMENT = '/admin_appointment/create';
const URL_UPDATE_APPOINTMENT = '/admin_appointment/update';
const URL_DELETE_APPOINTMENT = '/admin_appointment/delete';

export const fetch = () => getRequest(
    request => request
      .get(`${endpoint(URL_FETCH_APPOINTMENT)}`)
  ).then(checkStatus);

export const createPost = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_APPOINTMENT)}`)
      .send(data)
  ).then(checkStatus);

export const updatePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_APPOINTMENT)}`)
      .send(data)
  ).then(checkStatus);

export const deletePost = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_APPOINTMENT)}`)
      .query({ id })
  ).then(checkStatus);
