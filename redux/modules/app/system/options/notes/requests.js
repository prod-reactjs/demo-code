import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_SOURCE = '/admin_note/fetch';
const URL_CREATE_SOURCE = '/admin_note/create';
const URL_UPDATE_SOURCE = '/admin_note/update';
const URL_DELETE_SOURCE = '/admin_note/delete';

export const fetch = () => getRequest(
    request => request
      .get(`${endpoint(URL_FETCH_SOURCE)}`)
  ).then(checkStatus);

export const createPost = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_SOURCE)}`)
      .send(data)
  ).then(checkStatus);

export const updatePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_SOURCE)}`)
      .send(data)
  ).then(checkStatus);

export const deletePost = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_SOURCE)}`)
      .query({ id })
  ).then(checkStatus);
