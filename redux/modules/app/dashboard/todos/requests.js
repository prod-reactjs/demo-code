import { getRequest, endpoint, checkStatus } from 'common/utils';

// const URL_TODO_INFO = '/todo/info';
const URL_TODO_CREATE = '/todo/create';
const URL_TODO_UPDATE = '/todo/update';
const URL_TODO_COMPLETE = '/todo/complete';
const URL_TODO_REMOVE = '/todo/delete';
const URL_TODOS_LIST = '/todo/fetch';
const URL_ACCOUNT_USERS = '/user/fetch';


export const users = data => getRequest(request => request.post(`${endpoint(URL_ACCOUNT_USERS)}`).send(data)).then(checkStatus);
export const todosList = query => getRequest(request => request.get(`${endpoint(URL_TODOS_LIST)}`).query(query)).then(checkStatus);

export const create = data => getRequest(request => request.post(`${endpoint(URL_TODO_CREATE)}`).send(data)).then(checkStatus);
export const update = data => getRequest(request => request.post(`${endpoint(URL_TODO_UPDATE)}`).send(data)).then(checkStatus);
export const complete = id => getRequest(request => request.post(`${endpoint(URL_TODO_COMPLETE)}`).query({ id })).then(checkStatus);
export const remove = id => getRequest(request => request.post(`${endpoint(URL_TODO_REMOVE)}`).query({ id })).then(checkStatus);
