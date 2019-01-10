import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_LOCATIONS = '/location/fetch';
const URL_CREATE_LOCATION = '/location/create';
const URL_UPDATE_LOCATION = '/location/update';
const URL_DELETE_LOCATION = '/location/delete';

export const fetch = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_LOCATIONS)}`)
  ).then(checkStatus);

export const createPost = data => getRequest(
    request => request
      .post(`${endpoint(URL_CREATE_LOCATION)}`)
      .send(data)
  ).then(checkStatus);

export const updatePost = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_LOCATION)}`)
      .send(data)
  ).then(checkStatus);

export const deletePost = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_LOCATION)}`)
      .query({ id })
  ).then(checkStatus);
